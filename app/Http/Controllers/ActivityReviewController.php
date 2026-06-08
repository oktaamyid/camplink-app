<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityRegistration;
use App\Models\ActivityReview;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ActivityReviewController extends Controller
{
    /**
     * Store a newly created review in storage.
     */
    public function store(Request $request, Activity $activity): RedirectResponse
    {
        $user = $request->user();

        // 1. Check if user is registered for this activity
        $isRegistered = ActivityRegistration::where('activity_id', $activity->id)
            ->where('user_id', $user->id)
            ->exists();

        if (! $isRegistered) {
            return back()->with('error', 'Anda harus terdaftar dalam kegiatan ini untuk memberikan ulasan.');
        }

        // 2. Check if user already reviewed
        $hasReviewed = ActivityReview::where('activity_id', $activity->id)
            ->where('user_id', $user->id)
            ->exists();

        if ($hasReviewed) {
            return back()->with('error', 'Anda sudah memberikan ulasan untuk kegiatan ini.');
        }

        // 3. Validate
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:500',
            'is_anonymous' => 'boolean',
        ]);

        // 4. Create
        ActivityReview::create([
            'activity_id' => $activity->id,
            'user_id' => $user->id,
            'rating' => $validated['rating'],
            'review' => $validated['review'],
            'is_anonymous' => $validated['is_anonymous'] ?? false,
        ]);

        return back()->with('success', 'Terima kasih atas ulasan Anda!');
    }
}
