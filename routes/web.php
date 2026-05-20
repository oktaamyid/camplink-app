<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// CampLink frontend routes (no auth required for now)
Route::get('/beranda', fn () => Inertia::render('beranda'))->name('beranda');
Route::get('/kegiatan', fn () => Inertia::render('kegiatan/index'))->name('kegiatan.index');
Route::get('/kegiatan/buat', fn () => Inertia::render('kegiatan/buat'))->name('kegiatan.buat');
Route::get('/kegiatan/{id}', fn () => Inertia::render('kegiatan/show'))->name('kegiatan.show');
Route::get('/tim', fn () => Inertia::render('tim/index'))->name('tim.index');
Route::get('/notifikasi', fn () => Inertia::render('notifikasi/index'))->name('notifikasi.index');
Route::get('/pesan', fn () => Inertia::render('pesan/index'))->name('pesan.index');
Route::get('/profil', fn () => Inertia::render('profil/index'))->name('profil.index');
Route::get('/pengaturan', fn () => Inertia::render('profil/index'))->name('pengaturan.index');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
