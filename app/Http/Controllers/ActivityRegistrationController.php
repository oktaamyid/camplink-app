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

        // Check if already registered
        $alreadyRegistered = ActivityRegistration::where('activity_id', $kegiatan->id)
            ->where('user_id', $user->id)
            ->exists();

        if ($alreadyRegistered) {
            return back()->with('error', 'Anda sudah terdaftar sebagai peserta di kegiatan ini.');
        }

        ActivityRegistration::create([
            'activity_id' => $kegiatan->id,
            'user_id' => $user->id,
        ]);

        return back()->with('success', 'Berhasil mendaftar sebagai peserta kegiatan.');
    }
}
