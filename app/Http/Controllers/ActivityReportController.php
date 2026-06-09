<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityReport;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ActivityReportController extends Controller
{
    /**
     * Store a newly created report in storage.
     */
    public function store(Request $request, Activity $activity): RedirectResponse
    {
        if ($activity->creator_id === auth()->id()) {
            return back()->with('error', 'Anda tidak dapat melaporkan kegiatan Anda sendiri.');
        }

        $validated = $request->validate([
            'reason' => 'required|in:fake,duplicate,wrong_info,other',
            'details' => 'nullable|string|max:500',
        ]);

        ActivityReport::create([
            'activity_id' => $activity->id,
            'reporter_id' => auth()->id(),
            'reason' => $validated['reason'],
            'details' => $validated['details'],
            'status' => 'pending',
        ]);

        return back()->with('success', 'Laporan Anda telah berhasil dikirim dan akan segera ditinjau oleh admin.');
    }
}
