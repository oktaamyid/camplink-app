<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreActivityRequest;
use App\Http\Requests\UpdateActivityRequest;
use App\Models\Activity;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ActivityController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Activity::with(['category', 'recruitment']);

        $search = $request->input('search');
        if (! empty($search)) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        }

        $categories = $request->input('categories', []);
        if (! empty($categories)) {
            $categoriesArray = is_array($categories) ? $categories : [$categories];
            $query->whereIn('category_id', $categoriesArray);
        }

        $time = $request->input('time', 'Semua');
        if ($time === 'Minggu Ini') {
            $query->whereBetween('event_date', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
        } elseif ($time === 'Bulan Ini') {
            $query->whereBetween('event_date', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()]);
        }

        $sort = $request->input('sort', 'Terbaru');
        if ($sort === 'Terbaru') {
            $query->latest('created_at');
        } elseif ($sort === 'Terlama') {
            $query->oldest('created_at');
        }

        $activities = $query->paginate(10)->withQueryString();
        $allCategories = Category::all();

        return Inertia::render('kegiatan/index', [
            'activities' => $activities,
            'categories' => $allCategories,
            'filters' => (object) $request->only(['search', 'categories', 'time', 'sort']),
        ]);
    }

    public function create(): Response
    {
        $categories = Category::all();

        return Inertia::render('kegiatan/buat', [
            'categories' => $categories,
        ]);
    }

    public function store(StoreActivityRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $posterUrl = null;
        if ($request->hasFile('poster')) {
            $path = $request->file('poster')->store('posters', 'public');
            $posterUrl = Storage::url($path);
        }

        Activity::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'category_id' => $validated['category_id'],
            'creator_id' => $request->user()->id,
            'location' => $validated['location'],
            'event_date' => $validated['event_date'],
            'deadline_date' => $validated['deadline_date'],
            'poster_url' => $posterUrl,
            'status' => 'active',
        ]);

        return redirect()->route('kegiatan.index')->with('success', 'Kegiatan berhasil dibuat.');
    }

    public function show(Request $request, Activity $kegiatan): Response
    {
        $kegiatan->load(['category', 'creator', 'recruitment', 'announcements.creator']);

        $userApplication = null;
        if ($kegiatan->recruitment && $request->user()) {
            $userApplication = $kegiatan->recruitment->applications()
                ->where('applicant_id', $request->user()->id)
                ->first();
        }

        $userRegistration = null;
        if ($request->user()) {
            $userRegistration = \App\Models\ActivityRegistration::where('activity_id', $kegiatan->id)
                ->where('user_id', $request->user()->id)
                ->first();
        }

        $participantCount = $kegiatan->registrations()->count();

        return Inertia::render('kegiatan/show', [
            'activity' => $kegiatan,
            'userApplication' => $userApplication,
            'userRegistration' => $userRegistration,
            'participantCount' => $participantCount,
        ]);
    }

    public function edit(Request $request, Activity $kegiatan): Response
    {
        if ($kegiatan->creator_id !== $request->user()->id) {
            abort(403, 'Unauthorized action.');
        }

        $categories = Category::all();

        return Inertia::render('kegiatan/edit', [
            'activity' => $kegiatan,
            'categories' => $categories,
        ]);
    }

    public function update(UpdateActivityRequest $request, Activity $kegiatan): RedirectResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('poster')) {
            $path = $request->file('poster')->store('posters', 'public');
            $validated['poster_url'] = Storage::url($path);
        }

        unset($validated['poster']);

        $kegiatan->update($validated);

        return redirect()->route('kegiatan.show', $kegiatan)->with('success', 'Kegiatan berhasil diperbarui.');
    }

    public function destroy(Request $request, Activity $kegiatan): RedirectResponse
    {
        if ($kegiatan->creator_id !== $request->user()->id) {
            abort(403, 'Unauthorized action.');
        }

        $kegiatan->update(['status' => 'cancelled']);

        return redirect()->route('kegiatan.index')->with('success', 'Kegiatan berhasil dibatalkan.');
    }

    public function toggleRegistration(Request $request, Activity $kegiatan): RedirectResponse
    {
        if ($kegiatan->creator_id !== $request->user()->id) {
            abort(403, 'Unauthorized action.');
        }

        $newStatus = $kegiatan->status === 'active' ? 'draft' : 'active';
        $kegiatan->update(['status' => $newStatus]);

        $message = $newStatus === 'active'
            ? 'Pendaftaran kegiatan berhasil dibuka.'
            : 'Pendaftaran kegiatan berhasil ditutup.';

        return redirect()->back()->with('success', $message);
    }

    public function participants(Request $request, Activity $kegiatan): Response
    {
        if ($kegiatan->creator_id !== $request->user()->id) {
            abort(403, 'Unauthorized action.');
        }

        $kegiatan->load('category');

        $participants = $kegiatan->registrations()
            ->with('user:id,name,email,university,major')
            ->latest('registered_at')
            ->get();

        return Inertia::render('kegiatan/peserta', [
            'activity' => $kegiatan,
            'participants' => $participants,
        ]);
    }
}
