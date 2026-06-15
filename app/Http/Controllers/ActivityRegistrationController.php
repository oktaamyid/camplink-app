<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityRegistration;
use App\Models\Conversation;
use App\Notifications\ActivityRegistrationSubmitted;
use App\Notifications\ActivityRegistrationUpdated;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ActivityRegistrationController extends Controller
{
    /**
     * Show all registrations for a given activity (creator only).
     */
    public function index(Request $request, Activity $kegiatan): Response
    {
        if ($request->user()->id !== $kegiatan->creator_id && ! $request->user()->isAdmin()) {
            abort(403);
        }

        $registrations = $kegiatan->registrations()
            ->with('user:id,name,email,profile_pic,major,semester')
            ->latest('registered_at')
            ->get()
            ->map(function ($reg) {
                return [
                    'id' => $reg->id,
                    'status' => $reg->status,
                    'registered_at' => $reg->registered_at,
                    'reviewed_at' => $reg->reviewed_at,
                    'user' => $reg->user,
                ];
            });

        return Inertia::render('kegiatan/pendaftar', [
            'activity' => $kegiatan->load('category'),
            'registrations' => $registrations,
        ]);
    }

    /**
     * Submit a registration request (status: pending).
     */
    public function store(Request $request, Activity $kegiatan): RedirectResponse
    {
        $user = $request->user();

        if ($kegiatan->creator_id === $user->id) {
            return back()->with('error', 'Anda tidak dapat mendaftar sebagai peserta di kegiatan Anda sendiri.');
        }

        $alreadyRegistered = ActivityRegistration::where('activity_id', $kegiatan->id)
            ->where('user_id', $user->id)
            ->exists();

        if ($alreadyRegistered) {
            return back()->with('error', 'Anda sudah pernah mendaftar sebagai peserta di kegiatan ini.');
        }

        $registration = ActivityRegistration::create([
            'activity_id' => $kegiatan->id,
            'user_id' => $user->id,
            'status' => 'pending',
        ]);

        $registration->load(['user', 'activity']);

        $kegiatan->creator->notify(new ActivityRegistrationSubmitted($registration));

        return back()->with('success', 'Pendaftaran berhasil dikirim. Menunggu persetujuan dari pembuat kegiatan.');
    }

    /**
     * Approve a participant registration.
     */
    public function approve(Request $request, Activity $kegiatan, ActivityRegistration $registration): RedirectResponse
    {
        if ($request->user()->id !== $kegiatan->creator_id && ! $request->user()->isAdmin()) {
            abort(403);
        }

        if ($registration->activity_id !== $kegiatan->id) {
            abort(404);
        }

        $registration->update([
            'status' => 'approved',
            'reviewed_at' => now(),
        ]);

        // Ensure the activity group conversation exists
        Conversation::firstOrCreate(['activity_id' => $kegiatan->id]);

        $registration->load(['user', 'activity']);
        $registration->user->notify(new ActivityRegistrationUpdated($registration));

        return back()->with('success', "{$registration->user->name} berhasil disetujui sebagai peserta.");
    }

    /**
     * Reject a participant registration.
     */
    public function reject(Request $request, Activity $kegiatan, ActivityRegistration $registration): RedirectResponse
    {
        if ($request->user()->id !== $kegiatan->creator_id && ! $request->user()->isAdmin()) {
            abort(403);
        }

        if ($registration->activity_id !== $kegiatan->id) {
            abort(404);
        }

        $registration->update([
            'status' => 'rejected',
            'reviewed_at' => now(),
        ]);

        $registration->load(['user', 'activity']);
        $registration->user->notify(new ActivityRegistrationUpdated($registration));

        return back()->with('success', "{$registration->user->name} berhasil ditolak.");
    }
}
