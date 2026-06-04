<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityRegistration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ActivityRegistrationController extends Controller
{
    public function store(Request $request, Activity $kegiatan): RedirectResponse
    {
        $user = $request->user();

        // Prevent creator from registering to their own activity
        if ($kegiatan->creator_id === $user->id) {
            return back()->with('error', 'Anda tidak dapat mendaftar sebagai peserta di kegiatan Anda sendiri.');
        }

        if ($kegiatan->status !== 'active') {
            return back()->with('error', 'Kegiatan ini tidak lagi menerima pendaftaran.');
        }

        // Check existing registration
        $existing = ActivityRegistration::where('activity_id', $kegiatan->id)
            ->where('user_id', $user->id)
            ->first();

        if ($existing) {
            if ($existing->status === 'registered') {
                return back()->with('error', 'Anda sudah terdaftar sebagai peserta di kegiatan ini.');
            }
            // Re-register if previously cancelled
            $existing->update(['status' => 'registered', 'registered_at' => now()]);
            return back()->with('success', 'Berhasil mendaftar kembali sebagai peserta kegiatan.');
        }

        ActivityRegistration::create([
            'activity_id'   => $kegiatan->id,
            'user_id'       => $user->id,
            'status'        => 'registered',
            'registered_at' => now(),
        ]);

        return back()->with('success', 'Berhasil mendaftar sebagai peserta kegiatan.');
    }

    public function destroy(Request $request, Activity $kegiatan): RedirectResponse
    {
        $registration = ActivityRegistration::where('activity_id', $kegiatan->id)
            ->where('user_id', $request->user()->id)
            ->where('status', 'registered')
            ->first();

        if (! $registration) {
            return back()->with('error', 'Anda tidak terdaftar di kegiatan ini.');
        }

        $registration->update(['status' => 'cancelled']);

        return back()->with('success', 'Pendaftaran berhasil dibatalkan.');
    }
}

