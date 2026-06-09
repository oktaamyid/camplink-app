<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityRegistration;
use App\Models\ActivityReport;
use App\Models\ActivityReview;
use App\Models\Announcement;
use App\Models\Category;
use App\Models\InisiatorRequest;
use App\Models\TeamApplication;
use App\Models\TeamRecruitment;
use App\Models\User;
use App\Notifications\ActivityReportUpdated;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        if ($user->isAdmin()) {
            // Admin View Data
            return Inertia::render('dashboard', [
                'isAdmin' => true,
                'stats' => [
                    'totalUsers' => User::count(),
                    'activeActivities' => Activity::where('status', 'active')->count(),
                    'totalApplications' => TeamApplication::count(),
                    'totalTeams' => TeamRecruitment::count(),
                    'totalRegistrations' => ActivityRegistration::count(),
                    'totalReports' => ActivityReport::where('status', 'pending')->count(),
                    'pendingInisiators' => InisiatorRequest::where('status', 'pending')->count(),
                    'users' => User::select('id', 'name', 'email', 'role', 'is_active', 'created_at')
                        ->latest()
                        ->get(),
                    'activities' => Activity::with(['category', 'creator'])
                        ->select('id', 'title', 'category_id', 'creator_id', 'event_date', 'status', 'is_verified', 'created_at')
                        ->latest()
                        ->get(),
                    'categories' => Category::all(),
                    'announcements' => Announcement::with('creator:id,name')
                        ->latest()
                        ->get(),
                    'reports' => ActivityReport::with(['activity:id,title', 'reporter:id,name'])
                        ->latest()
                        ->get(),
                    'reviews' => ActivityReview::with(['activity:id,title', 'user:id,name'])
                        ->latest()
                        ->get(),
                ],
            ]);
        } else {
            // User Data
            $data = [
                'totalApplications' => TeamApplication::where('applicant_id', $user->id)->count(),
                'acceptedApplications' => TeamApplication::where('applicant_id', $user->id)->where('status', 'accepted')->count(),
                'totalActivities' => ActivityRegistration::where('user_id', $user->id)->count(),
                'managedTeams' => Activity::where('creator_id', $user->id)->whereHas('recruitment')->count(),

                // Fetch recent applications for the activity feed
                'recentApplications' => TeamApplication::where('applicant_id', $user->id)
                    ->with('recruitment.activity:id,title')
                    ->latest('applied_at')
                    ->take(5)
                    ->get()
                    ->map(function ($app) {
                        return [
                            'id' => $app->id,
                            'type' => 'team_application',
                            'title' => 'Melamar tim: ' . ($app->recruitment->activity->title ?? 'Kegiatan'),
                            'status' => $app->status,
                            'time' => $app->applied_at->diffForHumans(),
                        ];
                    }),

                // Fetch recent registrations
                'recentRegistrations' => ActivityRegistration::where('user_id', $user->id)
                    ->with('activity:id,title')
                    ->latest('registered_at')
                    ->take(5)
                    ->get()
                    ->map(function ($reg) {
                        return [
                            'id' => $reg->id,
                            'type' => 'event_registration',
                            'title' => 'Mendaftar kegiatan: ' . ($reg->activity->title ?? 'Kegiatan'),
                            'status' => 'registered',
                            'time' => $reg->registered_at->diffForHumans(),
                        ];
                    }),
            ];

            // Combine and sort recent activities
            $recentActivity = collect($data['recentApplications'])
                ->merge($data['recentRegistrations'])
                ->sortByDesc('time') // Rough sort, in real app parse dates
                ->take(5)
                ->values();

            $data['recentActivity'] = $recentActivity;
        }

        return Inertia::render('dashboard', [
            'isAdmin' => $user->isAdmin(),
            'stats' => $data,
        ]);
    }

    /**
     * Toggle the active status of a user.
     */
    public function toggleUserStatus(User $user): RedirectResponse
    {
        if (auth()->id() === $user->id) {
            return back()->with('error', 'Anda tidak dapat menonaktifkan akun sendiri.');
        }

        $user->update([
            'is_active' => ! $user->is_active,
        ]);

        $statusText = $user->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return back()->with('success', "Pengguna {$user->name} berhasil {$statusText}.");
    }

    /**
     * Toggle the status of an activity.
     */
    public function toggleActivityStatus(Activity $activity): RedirectResponse
    {
        $activity->update([
            'status' => $activity->status === 'active' ? 'invalid' : 'active',
        ]);

        $statusText = $activity->status === 'active' ? 'diaktifkan' : 'dinonaktifkan';

        return back()->with('success', "Kegiatan {$activity->title} berhasil {$statusText}.");
    }

    /**
     * Toggle the verification status of an activity.
     */
    public function toggleActivityVerification(Activity $activity): RedirectResponse
    {
        $activity->update([
            'is_verified' => ! $activity->is_verified,
        ]);

        $statusText = $activity->is_verified ? 'diverifikasi' : 'batal diverifikasi';

        return back()->with('success', "Kegiatan {$activity->title} berhasil {$statusText}.");
    }

    /**
     * Delete an activity.
     */
    public function deleteActivity(Activity $activity): RedirectResponse
    {
        $activity->delete();

        return back()->with('success', "Kegiatan {$activity->title} berhasil dihapus.");
    }

    /**
     * Store a new category.
     */
    public function storeCategory(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:100|unique:categories,name',
        ]);

        Category::create($request->only('name'));

        return back()->with('success', 'Kategori berhasil ditambahkan.');
    }

    /**
     * Update a category.
     */
    public function updateCategory(Request $request, Category $category): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:100|unique:categories,name,' . $category->id,
        ]);

        $category->update($request->only('name'));

        return back()->with('success', 'Kategori berhasil diperbarui.');
    }

    /**
     * Delete a category.
     */
    public function deleteCategory(Category $category): RedirectResponse
    {
        try {
            $category->delete();

            return back()->with('success', 'Kategori berhasil dihapus.');
        } catch (\Exception $e) {
            return back()->with('error', 'Kategori tidak dapat dihapus karena masih digunakan.');
        }
    }

    /**
     * Update user role.
     */
    public function updateUserRole(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'role' => 'required|in:mahasiswa,admin',
        ]);

        $user->update($request->only('role'));

        return back()->with('success', "Role pengguna {$user->name} berhasil diperbarui.");
    }

    /**
     * Resolve report.
     */
    public function resolveReport(Request $request, ActivityReport $report): RedirectResponse
    {
        $request->validate([
            'status' => 'required|in:resolved,rejected',
            'admin_note' => 'nullable|string',
        ]);

        $report->update($request->only(['status', 'admin_note']));

        $report->reporter->notify(new ActivityReportUpdated($report));

        return back()->with('success', 'Laporan berhasil diproses.');
    }

    /**
     * Delete review.
     */
    public function deleteReview(ActivityReview $review): RedirectResponse
    {
        $review->delete();

        return back()->with('success', 'Ulasan berhasil dihapus.');
    }
}
