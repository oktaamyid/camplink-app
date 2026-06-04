<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (Auth::check() && Auth::user()->role === 'admin') {
        return redirect()->route('dashboard');
    }
    return redirect()->route('beranda');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    Route::get('/kegiatan/buat', [\App\Http\Controllers\ActivityController::class, 'create'])->name('kegiatan.buat');
    Route::post('/kegiatan', [\App\Http\Controllers\ActivityController::class, 'store'])->name('kegiatan.store');
    Route::get('/kegiatan/{kegiatan}/tim', [\App\Http\Controllers\TeamController::class, 'show'])->name('tim.show');
    Route::post('/kegiatan/{kegiatan}/tim', [\App\Http\Controllers\TeamController::class, 'store'])->name('tim.store');
    Route::post('/tim/{recruitment}/apply', [\App\Http\Controllers\TeamController::class, 'apply'])->name('tim.apply');
    Route::patch('/aplikasi/{application}/status', [\App\Http\Controllers\TeamController::class, 'updateApplication'])->name('tim.application.update');
    Route::post('/notifikasi/{id}/read', [\App\Http\Controllers\NotificationController::class, 'markAsRead'])->name('notifikasi.read');
    Route::post('/notifikasi/read-all', [\App\Http\Controllers\NotificationController::class, 'markAllAsRead'])->name('notifikasi.readAll');
    Route::get('/notifikasi', [\App\Http\Controllers\NotificationController::class, 'index'])->name('notifikasi.index');
});

// CampLink frontend routes (Membutuhkan Login)
Route::middleware(['auth'])->group(function () {
    Route::get('/beranda', \App\Http\Controllers\BerandaController::class)->name('beranda');
    Route::get('/kegiatan', [\App\Http\Controllers\ActivityController::class, 'index'])->name('kegiatan.index');
    Route::get('/kegiatan/{kegiatan}', [\App\Http\Controllers\ActivityController::class, 'show'])->name('kegiatan.show');
    Route::post('/kegiatan/{kegiatan}/daftar', [\App\Http\Controllers\ActivityRegistrationController::class, 'store'])->name('kegiatan.daftar');
    Route::delete('/kegiatan/{kegiatan}/daftar', [\App\Http\Controllers\ActivityRegistrationController::class, 'destroy'])->name('kegiatan.batal');

    // Bookmark routes
    Route::get('/simpanan', [\App\Http\Controllers\BookmarkController::class, 'index'])->name('simpanan.index');
    Route::post('/simpanan/{activity}', [\App\Http\Controllers\BookmarkController::class, 'store'])->name('simpanan.store');
    Route::delete('/simpanan/{activity}', [\App\Http\Controllers\BookmarkController::class, 'destroy'])->name('simpanan.destroy');

    // Review route
    Route::post('/kegiatan/{activity}/review', [\App\Http\Controllers\ReviewController::class, 'store'])->name('kegiatan.review');

    Route::get('/tim', [\App\Http\Controllers\TeamController::class, 'index'])->name('tim.index');
    Route::get('/pesan', [\App\Http\Controllers\MessageController::class, 'index'])->name('pesan.index');
    Route::post('/pesan', [\App\Http\Controllers\MessageController::class, 'store'])->name('pesan.store');
    Route::post('/pesan/mulai', [\App\Http\Controllers\MessageController::class, 'start'])->name('pesan.start');
    Route::get('/profil', function (Illuminate\Http\Request $request) {
        $user = $request->user()->loadCount(['activityRegistrations', 'teamApplications']);
        $recentActivities = $request->user()->activityRegistrations()
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
                    'time' => \Carbon\Carbon::parse($reg->registered_at)->diffForHumans()
                ];
            });

        return Inertia::render('profil/index', [
            'profileData' => [
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'bio' => $user->bio ?? 'Belum ada bio.',
                'university' => $user->university ?? 'STT Terpadu Nurul Fikri',
                'major' => $user->major ?? 'Teknik Informatika',
                'semester' => $user->semester ?? '-',
                'location' => $user->location ?? 'Jakarta, Indonesia',
                'skills' => $user->skills ? array_map('trim', explode(',', $user->skills)) : [],
                'interests' => $user->interests ? array_map('trim', explode(',', $user->interests)) : [],
                'stats' => [
                    'events' => $user->activity_registrations_count,
                    'teams' => $user->team_applications_count,
                    'achievements' => 0,
                ],
                'events' => $recentActivities,
            ]
        ]);
    })->name('profil.index');
    Route::get('/pengaturan', fn() => Inertia::render('profil/index'))->name('pengaturan.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
