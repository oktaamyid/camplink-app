<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Bookmark;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BerandaController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $recommendedEvents = Activity::with('category')->inRandomOrder()->take(4)->get();
        $recentEvents = Activity::with('category')->latest()->take(4)->get();

        // Get IDs of activities bookmarked by the current user
        $bookmarkedIds = [];
        if ($request->user()) {
            $allEventIds = $recommendedEvents->pluck('id')
                ->merge($recentEvents->pluck('id'))
                ->unique()
                ->values();

            $bookmarkedIds = Bookmark::where('user_id', $request->user()->id)
                ->whereIn('activity_id', $allEventIds)
                ->pluck('activity_id')
                ->toArray();
        }

        return Inertia::render('beranda', [
            'recommendedEvents' => $recommendedEvents,
            'recentEvents'      => $recentEvents,
            'bookmarkedIds'     => $bookmarkedIds,
        ]);
    }
}
