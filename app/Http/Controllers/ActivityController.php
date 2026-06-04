<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreActivityRequest;
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
        $kegiatan->load(['category', 'creator', 'recruitment']);
        $user = $request->user();

        $userApplication = null;
        if ($kegiatan->recruitment && $user) {
            $userApplication = $kegiatan->recruitment->applications()
                ->where('applicant_id', $user->id)
                ->first();
        }

        $userRegistration = null;
        $isBookmarked = false;
        $userReview = null;

        if ($user) {
            $userRegistration = \App\Models\ActivityRegistration::where('activity_id', $kegiatan->id)
                ->where('user_id', $user->id)
                ->first();

            $isBookmarked = \App\Models\Bookmark::where('activity_id', $kegiatan->id)
                ->where('user_id', $user->id)
                ->exists();

            $userReview = \App\Models\ActivityReview::where('activity_id', $kegiatan->id)
                ->where('user_id', $user->id)
                ->first();
        }

        return Inertia::render('kegiatan/show', [
            'activity'         => $kegiatan,
            'userApplication'  => $userApplication,
            'userRegistration' => $userRegistration,
            'isBookmarked'     => $isBookmarked,
            'userReview'       => $userReview,
        ]);
    }
}
