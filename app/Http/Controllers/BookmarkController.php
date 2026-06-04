<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Bookmark;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookmarkController extends Controller
{
    public function index(Request $request): Response
    {
        $bookmarks = Bookmark::with(['activity.category'])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate(12);

        return Inertia::render('simpanan/index', [
            'bookmarks' => $bookmarks,
        ]);
    }

    public function store(Request $request, Activity $activity): RedirectResponse
    {
        $exists = Bookmark::where('user_id', $request->user()->id)
            ->where('activity_id', $activity->id)
            ->exists();

        if ($exists) {
            return back()->with('info', 'Kegiatan sudah ada di simpanan kamu.');
        }

        Bookmark::create([
            'user_id'     => $request->user()->id,
            'activity_id' => $activity->id,
        ]);

        return back()->with('success', 'Kegiatan berhasil disimpan!');
    }

    public function destroy(Request $request, Activity $activity): RedirectResponse
    {
        Bookmark::where('user_id', $request->user()->id)
            ->where('activity_id', $activity->id)
            ->delete();

        return back()->with('success', 'Kegiatan dihapus dari simpanan.');
    }
}
