<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreActivityRequest;
use App\Models\Activity;
use App\Models\ActivityRegistration;
use App\Models\Category;
use App\Models\User;
use App\Notifications\NewActivityPublished;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ActivityController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Activity::with(['category', 'recruitment', 'creator']);

        // Tab Filter: All, Saved, or Mine
        $tab = $request->input('tab', 'all');
        if ($tab === 'saved' && request()->user()) {
            $query->whereHas('bookmarks', function ($q) {
                $q->where('user_id', request()->user()->id);
            });
        } elseif ($tab === 'mine' && request()->user()) {
            $query->where('creator_id', request()->user()->id);
        } else {
            $query->where('status', 'active');
        }

        $search = $request->input('search');
        if (! empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
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

        $viewMode = $request->input('view', 'card');

        // If calendar, we want all items to show on the grid
        if ($viewMode === 'calendar') {
            $activities = $query->get();
        } else {
            $activities = $query->paginate(12)->withQueryString();
        }

        $allCategories = Category::all();

        $userBookmarks = [];
        if (request()->user()) {
            $userBookmarks = request()->user()->bookmarks()->pluck('activity_id')->toArray();
        }

        // Add is_bookmarked helper
        $collection = $viewMode === 'calendar' ? $activities : $activities->getCollection();
        $collection->transform(function ($activity) use ($userBookmarks) {
            $activity->is_bookmarked = in_array($activity->id, $userBookmarks);

            return $activity;
        });

        return Inertia::render('kegiatan/index', [
            'activities' => $activities,
            'categories' => $allCategories,
            'filters' => (object) $request->only(['search', 'categories', 'time', 'sort', 'view', 'tab']),
        ]);
    }

    public function create()
    {
        if (! request()->user()->isAdmin() && ! request()->user()->isInisiator()) {
            return redirect()->route('kegiatan.index')->with('error', 'Anda harus menjadi inisiator untuk membuat kegiatan.');
        }

        $categories = Category::all();

        return Inertia::render('kegiatan/buat', [
            'categories' => $categories,
        ]);
    }

    public function edit(Activity $activity): Response
    {
        // Allow creator or admin
        if (request()->user()->id !== $activity->creator_id && ! request()->user()->isAdmin()) {
            abort(403);
        }

        if (! request()->user()->isAdmin() && ! request()->user()->isInisiator()) {
            abort(403);
        }

        $categories = Category::all();

        return Inertia::render('kegiatan/edit', [
            'activity' => $activity,
            'categories' => $categories,
        ]);
    }

    public function update(Activity $activity, StoreActivityRequest $request): RedirectResponse
    {
        // Allow creator or admin
        if (request()->user()->id !== $activity->creator_id && ! request()->user()->isAdmin()) {
            abort(403);
        }

        $validated = $request->validated();

        $data = [
            'title' => $validated['title'],
            'description' => $validated['description'],
            'requirements' => $validated['requirements'] ?? null,
            'category_id' => $validated['category_id'],
            'location' => $validated['location'],
            'is_online' => $request->boolean('is_online'),
            'meeting_link' => $validated['meeting_link'] ?? null,
            'event_date' => $validated['event_date'],
            'deadline_date' => $validated['deadline_date'],
            'quota' => $validated['quota'] ?? null,
            'contact' => $validated['contact'] ?? null,
            'is_team_based' => $request->boolean('is_team_based'),
            'has_participants' => $request->boolean('has_participants', true),
            'team_leader_id' => $validated['team_leader_id'] ?? null,
        ];

        if ($request->hasFile('poster')) {
            // Delete old poster if exists
            if ($activity->poster_url) {
                $oldPath = str_replace('/storage/', '', $activity->poster_url);
                Storage::delete($oldPath);
            }

            $path = $request->file('poster')->storePublicly('posters');
            $data['poster_url'] = Storage::url($path);
        }

        $activity->update($data);

        return redirect()->route('kegiatan.show', $activity->id)->with('success', 'Kegiatan berhasil diperbarui.');
    }

    public function store(StoreActivityRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $posterUrl = null;
        if ($request->hasFile('poster')) {
            $path = $request->file('poster')->storePublicly('posters');
            $posterUrl = Storage::url($path);
        }

        $activity = Activity::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'requirements' => $validated['requirements'] ?? null,
            'category_id' => $validated['category_id'],
            'creator_id' => $request->user()->id,
            'location' => $validated['location'],
            'is_online' => $request->boolean('is_online'),
            'meeting_link' => $validated['meeting_link'] ?? null,
            'event_date' => $validated['event_date'],
            'deadline_date' => $validated['deadline_date'],
            'quota' => $validated['quota'] ?? null,
            'contact' => $validated['contact'] ?? null,
            'poster_url' => $posterUrl,
            'status' => 'active',
            'is_team_based' => $request->boolean('is_team_based'),
            'has_participants' => $request->boolean('has_participants', true),
            'team_leader_id' => $validated['team_leader_id'] ?? null,
        ]);

        // Notify all users about the new activity
        $users = User::all();
        Notification::send($users, new NewActivityPublished($activity));

        return redirect()->route('kegiatan.index')->with('success', 'Kegiatan berhasil dibuat.');
    }

    public function show(Request $request, Activity $kegiatan): Response
    {
        $kegiatan->load(['category', 'creator', 'recruitment', 'reviews.user:id,name']);

        $userApplication = null;
        $userRegistration = null;
        $isBookmarked = false;
        $userReview = null;
        $userCertificate = null;

        if ($request->user()) {
            if ($kegiatan->recruitment) {
                $userApplication = $kegiatan->recruitment->applications()
                    ->where('applicant_id', $request->user()->id)
                    ->first();
            }

            $userRegistration = ActivityRegistration::where('activity_id', $kegiatan->id)
                ->where('user_id', $request->user()->id)
                ->first();

            $isBookmarked = $request->user()->bookmarks()
                ->where('activity_id', $kegiatan->id)
                ->exists();

            $userReview = $kegiatan->reviews()
                ->where('user_id', $request->user()->id)
                ->first();

            $userCertificate = $kegiatan->certificates()
                ->where('user_id', $request->user()->id)
                ->first();
        }

        $averageRating = $kegiatan->reviews()->avg('rating') ?: 0;
        $totalReviews = $kegiatan->reviews()->count();

        $participants = $kegiatan->registrations()
            ->with('user:id,name,email')
            ->get()
            ->map(function ($reg) {
                return [
                    'id' => $reg->user->id,
                    'name' => $reg->user->name,
                    'email' => $reg->user->email,
                ];
            });

        return Inertia::render('kegiatan/show', [
            'activity' => $kegiatan,
            'userApplication' => $userApplication,
            'userRegistration' => $userRegistration,
            'isBookmarked' => $isBookmarked,
            'userReview' => $userReview,
            'userCertificate' => $userCertificate,
            'participants' => $participants,
            'stats' => [
                'averageRating' => round($averageRating, 1),
                'totalReviews' => $totalReviews,
            ],
        ]);
    }
}
