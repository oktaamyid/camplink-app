<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;

class TeamLeaderController extends Controller
{
    public function update(Request $request, Activity $activity)
    {
        // Allow creator or admin
        if (auth()->id() !== $activity->creator_id && ! auth()->user()->isAdmin()) {
            abort(403);
        }

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $activity->team_leader_id = $validated['user_id'];
        $activity->save();

        return redirect()->back()->with('success', 'Ketua tim berhasil diperbarui.');
    }
}
