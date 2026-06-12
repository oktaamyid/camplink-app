<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\ActivityRegistrationController;
use App\Http\Controllers\ActivityReportController;
use App\Http\Controllers\ActivityReviewController;
use App\Http\Controllers\Admin\ExportController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\BerandaController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InisiatorRequestController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TeamLeaderController;
use App\Models\Activity;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (Auth::check()) {
        return Auth::user()->role === 'admin' ? redirect()->route('dashboard') : redirect()->route('beranda');
    }

    $upcomingEvents = Activity::where('status', 'active')
        ->with('category')
        ->orderBy('event_date', 'asc')
        ->limit(4)
        ->get();

    return Inertia::render('welcome/home', [
        'upcomingEvents' => $upcomingEvents,
    ]);
})->name('home');

Route::get('/service', function () {
    if (Auth::check()) {
        return Auth::user()->role === 'admin' ? redirect()->route('dashboard') : redirect()->route('beranda');
    }

    return Inertia::render('welcome/features');
})->name('service');

Route::get('/about', function () {
    if (Auth::check()) {
        return Auth::user()->role === 'admin' ? redirect()->route('dashboard') : redirect()->route('beranda');
    }

    return Inertia::render('welcome/about');
})->name('about');

Route::get('/faq', function () {
    if (Auth::check()) {
        return Auth::user()->role === 'admin' ? redirect()->route('dashboard') : redirect()->route('beranda');
    }

    return Inertia::render('welcome/guide');
})->name('faq');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/kegiatan/buat', [ActivityController::class, 'create'])->name('kegiatan.buat');
    Route::post('/kegiatan', [ActivityController::class, 'store'])->name('kegiatan.store');
    Route::get('/kegiatan/{activity}/edit', [ActivityController::class, 'edit'])->name('kegiatan.edit');
    Route::put('/kegiatan/{activity}', [ActivityController::class, 'update'])->name('kegiatan.update');

    // Bookmarks
    Route::post('/kegiatan/{activity}/bookmark', [BookmarkController::class, 'toggle'])->name('kegiatan.bookmark.toggle');
    Route::patch('/bookmark/{bookmark}/priority', [BookmarkController::class, 'togglePriority'])->name('kegiatan.bookmark.priority');

    Route::get('/kegiatan/{kegiatan}/tim', [TeamController::class, 'show'])->name('tim.show');
    Route::post('/kegiatan/{activity}/tim', [TeamController::class, 'store'])->name('tim.store');
    Route::patch('/kegiatan/{activity}/update-team-leader', [TeamLeaderController::class, 'update'])->name('kegiatan.update-team-leader');
    Route::post('/tim/{recruitment}/apply', [TeamController::class, 'apply'])->name('tim.apply');
    Route::patch('/aplikasi/{application}/status', [TeamController::class, 'updateApplication'])->name('tim.application.update');
    Route::post('/notifikasi/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifikasi.read');
    Route::post('/notifikasi/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifikasi.readAll');

    // Inisiator Request
    Route::post('/inisiator/request', [InisiatorRequestController::class, 'store'])->name('inisiator.request.store');

    // Admin Routes
    Route::get('/admin/export/pdf', [ExportController::class, 'exportPdf'])->name('admin.export.pdf');
    Route::get('/admin/export/csv', [ExportController::class, 'exportCsv'])->name('admin.export.csv');

    Route::patch('/admin/users/{user}/toggle-status', [DashboardController::class, 'toggleUserStatus'])->name('admin.users.toggleStatus');
    Route::patch('/admin/users/{user}/role', [DashboardController::class, 'updateUserRole'])->name('admin.users.updateRole');

    Route::patch('/admin/activities/{activity}/toggle-status', [DashboardController::class, 'toggleActivityStatus'])->name('admin.activities.toggleStatus');
    Route::patch('/admin/activities/{activity}/toggle-verification', [DashboardController::class, 'toggleActivityVerification'])->name('admin.activities.toggleVerification');
    Route::delete('/admin/activities/{activity}', [DashboardController::class, 'deleteActivity'])->name('admin.activities.delete');

    Route::post('/admin/categories', [DashboardController::class, 'storeCategory'])->name('admin.categories.store');
    Route::patch('/admin/categories/{category}', [DashboardController::class, 'updateCategory'])->name('admin.categories.update');
    Route::delete('/admin/categories/{category}', [DashboardController::class, 'deleteCategory'])->name('admin.categories.delete');

    Route::post('/admin/announcements', [AnnouncementController::class, 'store'])->name('admin.announcements.store');
    Route::post('/admin/announcements/upload-image', [AnnouncementController::class, 'uploadImage'])->name('admin.announcements.upload-image');
    Route::delete('/admin/announcements/{announcement}', [AnnouncementController::class, 'destroy'])->name('admin.announcements.delete');

    Route::patch('/admin/reports/{report}/resolve', [DashboardController::class, 'resolveReport'])->name('admin.reports.resolve');

    Route::delete('/admin/reviews/{review}', [DashboardController::class, 'deleteReview'])->name('admin.reviews.delete');

    // Admin Inisiator Requests
    Route::get('/admin/inisiator-requests', [InisiatorRequestController::class, 'adminIndex'])->name('admin.inisiator-requests.index');
    Route::patch('/admin/inisiator-requests/{inisiatorRequest}', [InisiatorRequestController::class, 'update'])->name('admin.inisiator-requests.update');
});

// CampLink frontend routes (Membutuhkan Login)
Route::middleware(['auth'])->group(function () {
    Route::get('/beranda', BerandaController::class)->name('beranda');
    Route::get('/kegiatan', [ActivityController::class, 'index'])->name('kegiatan.index');
    Route::get('/kegiatan/{kegiatan}', [ActivityController::class, 'show'])->name('kegiatan.show');

    Route::get('/pengumuman', [AnnouncementController::class, 'index'])->name('pengumuman.index');
    Route::get('/pengumuman/{announcement}', [AnnouncementController::class, 'show'])->name('pengumuman.show');

    Route::post('/kegiatan/{kegiatan}/daftar', [ActivityRegistrationController::class, 'store'])->name('kegiatan.daftar');
    Route::post('/kegiatan/{activity}/report', [ActivityReportController::class, 'store'])->name('kegiatan.report');
    Route::post('/kegiatan/{kegiatan}/review', [ActivityReviewController::class, 'store'])->name('kegiatan.review');

    Route::get('/kegiatan/{activity}/sertifikat', [CertificateController::class, 'manage'])->name('kegiatan.sertifikat.manage');
    Route::post('/kegiatan/{activity}/sertifikat', [CertificateController::class, 'storeBulk'])->name('kegiatan.sertifikat.store');

    Route::get('/tim', [TeamController::class, 'index'])->name('tim.index');
    Route::get('/pesan', [MessageController::class, 'index'])->name('pesan.index');
    Route::post('/pesan', [MessageController::class, 'store'])->name('pesan.store');
    Route::post('/pesan/mulai', [MessageController::class, 'start'])->name('pesan.start');
    Route::get('/pesan/users/search', [MessageController::class, 'searchUsers'])->name('pesan.search');
    Route::get('/profil/{user?}', function (Request $request, ?User $user = null) {
        $resolvedUser = $user ?? $request->user();
        $resolvedUser->loadCount(['activityRegistrations', 'teamApplications']);
        $recentActivities = $resolvedUser->activityRegistrations()
            ->with('activity.category')
            ->latest('registered_at')
            ->take(5)
            ->get()
            ->map(function ($reg) {
                return [
                    'id' => $reg->activity->id,
                    'title' => $reg->activity->title,
                    'category' => $reg->activity->category ? $reg->activity->category->name : 'Umum',
                    'status' => $reg->activity->status === 'active' ? 'Aktif' : 'Selesai',
                    'time' => Carbon::parse($reg->registered_at)->diffForHumans(),
                ];
            });

        return Inertia::render('profil/index', [
            'profileData' => [
                'id' => $resolvedUser->id,
                'name' => $resolvedUser->name,
                'email' => $resolvedUser->email,
                'role' => $resolvedUser->role,
                'bio' => $resolvedUser->bio ?? 'Belum ada bio.',
                'university' => $resolvedUser->university ?? 'STT Terpadu Nurul Fikri',
                'major' => $resolvedUser->major ?? 'Teknik Informatika',
                'semester' => $resolvedUser->semester ?? '-',
                'location' => $resolvedUser->location ?? 'Jakarta, Indonesia',
                'skills' => $resolvedUser->skills ? array_map('trim', explode(',', $resolvedUser->skills)) : [],
                'interests' => $resolvedUser->interests ? array_map('trim', explode(',', $resolvedUser->interests)) : [],
                'experience' => $resolvedUser->experience ?? [],
                'education' => $resolvedUser->education ?? [],
                'external_certificates' => $resolvedUser->external_certificates ?? [],
                'stats' => [
                    'events' => $resolvedUser->activity_registrations_count,
                    'teams' => $resolvedUser->team_applications_count,
                    'achievements' => 0,
                ],
                'events' => $recentActivities,
            ],
        ]);
    })->name('profil.index');
    Route::get('/pengaturan', fn () => Inertia::render('profil/index'))->name('pengaturan.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
