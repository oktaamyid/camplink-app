<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Bookmark;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
    /**
     * Toggle bookmark for an activity.
     */
    public function toggle(Request $request, Activity $activity): RedirectResponse
    {
        $bookmark = Bookmark::where('user_id', $request->user()->id)
            ->where('activity_id', $activity->id)
            ->first();

        if ($bookmark) {
            $bookmark->delete();
            $message = 'Kegiatan dihapus dari daftar simpanan.';
        } else {
            Bookmark::create([
                'user_id' => $request->user()->id,
                'activity_id' => $activity->id,
            ]);
            $message = 'Kegiatan berhasil disimpan.';
        }

        return back()->with('success', $message);
    }

    /**
     * Toggle priority for a bookmarked activity.
     */
    public function togglePriority(Request $request, Bookmark $bookmark): RedirectResponse
    {
        if ($bookmark->user_id !== $request->user()->id) {
            abort(403);
        }

        $bookmark->update([
            'is_priority' => ! $bookmark->is_priority,
        ]);

        return back()->with('success', 'Prioritas bookmark diperbarui.');
    }
}
