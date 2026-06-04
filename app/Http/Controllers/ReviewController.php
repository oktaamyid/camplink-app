<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityReview;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, Activity $activity): RedirectResponse
    {
        $user = $request->user();

        // Only registered users can leave a review
        $isRegistered = $activity->registrations()
            ->where('user_id', $user->id)
            ->where('status', 'registered')
            ->exists();

        if (! $isRegistered) {
            return back()->with('error', 'Kamu hanya bisa memberikan ulasan untuk kegiatan yang kamu ikuti.');
        }

        $validated = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'review' => ['nullable', 'string', 'max:1000'],
        ]);

        ActivityReview::updateOrCreate(
            ['activity_id' => $activity->id, 'user_id' => $user->id],
            $validated,
        );

        return back()->with('success', 'Ulasan berhasil dikirim, terima kasih!');
    }
}
