<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BerandaController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $recommendedEvents = Activity::with('category')->inRandomOrder()->take(4)->get();
        $recentEvents = Activity::with('category')->latest()->take(4)->get();

        return Inertia::render('beranda', [
            'recommendedEvents' => $recommendedEvents,
            'recentEvents' => $recentEvents,
        ]);
    }
}
