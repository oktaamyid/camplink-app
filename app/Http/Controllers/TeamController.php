<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\TeamApplication;
use App\Models\TeamRecruitment;
use App\Notifications\TeamApplicationSubmitted;
use App\Notifications\TeamApplicationUpdated;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    public function index(Request $request): Response
    {
        $managedTeams = Activity::where('creator_id', $request->user()->id)
            ->whereHas('recruitment')
            ->with([
                'recruitment' => function ($query) {
                    $query->withCount([
                        'applications as pending_count' => fn ($q) => $q->where('status', 'pending'),
                        'applications as accepted_count' => fn ($q) => $q->where('status', 'accepted'),
                    ]);
                },
            ])
            ->latest()
            ->get();

        $myApplications = TeamApplication::where('applicant_id', $request->user()->id)
            ->with(['recruitment.activity.creator'])
            ->latest()
            ->get();

        return Inertia::render('tim/list', [
            'managedTeams' => $managedTeams,
            'myApplications' => $myApplications,
        ]);
    }

    public function show(Activity $kegiatan): Response
    {
        $activity = Activity::with(['creator', 'recruitment.applications.applicant', 'teamLeader'])
            ->findOrFail($kegiatan->id);

        return Inertia::render('tim/index', [
            'activity' => $activity,
            'recruitment' => $activity->recruitment,
        ]);
    }

    public function store(Request $request, Activity $kegiatan): RedirectResponse
    {
        // Only creator can open recruitment
        if ($kegiatan->creator_id !== $request->user()->id) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'description' => 'nullable|string',
            'skills_required' => 'required|array',
            'skills_required.*.title' => 'required|string',
            'skills_required.*.quota' => 'required|integer|min:1',
            'total_slots' => 'required|integer|min:1',
        ]);

        $kegiatan->recruitment()->create([
            'description' => $validated['description'],
            'skills_required' => $validated['skills_required'],
            'total_slots' => $validated['total_slots'],
            'status' => 'open',
        ]);

        return redirect()->back()->with('success', 'Rekrutmen tim berhasil dibuka.');
    }

    public function apply(Request $request, TeamRecruitment $recruitment): RedirectResponse
    {
        if ($recruitment->status !== 'open') {
            return redirect()->back()->with('error', 'Rekrutmen sudah ditutup.');
        }

        if ($recruitment->activity->creator_id === $request->user()->id) {
            return redirect()->back()->with('error', 'Pembuat kegiatan tidak dapat melamar ke tim sendiri.');
        }

        $validated = $request->validate([
            'message' => 'required|string|max:500',
            'role' => 'required|string', // Which position they are applying for
        ]);

        // Save the application with role and message
        $application = TeamApplication::create([
            'recruitment_id' => $recruitment->id,
            'applicant_id' => $request->user()->id,
            'message' => $validated['message'],
            'role' => $validated['role'],
            'status' => 'pending',
        ]);

        // Notify creator
        $recruitment->activity->creator->notify(new TeamApplicationSubmitted($application));

        return redirect()->back()->with('success', 'Berhasil mengirim permintaan bergabung.');
    }

    public function updateApplication(Request $request, TeamApplication $application): RedirectResponse
    {
        $recruitment = $application->recruitment;

        // Only creator of the activity can update application status
        if ($recruitment->activity->creator_id !== $request->user()->id) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'status' => 'required|in:accepted,rejected',
        ]);

        if ($validated['status'] === 'accepted' && $application->status !== 'accepted') {
            // Check if there are slots available
            if ($recruitment->filled_slots >= $recruitment->total_slots) {
                return redirect()->back()->with('error', 'Kuota tim sudah penuh.');
            }
            $recruitment->increment('filled_slots');
        } elseif ($validated['status'] === 'rejected' && $application->status === 'accepted') {
            // If it was accepted and now rejected, decrement slots
            $recruitment->decrement('filled_slots');
        }

        $application->update([
            'status' => $validated['status'],
            'reviewed_at' => now(),
        ]);

        // Notify applicant
        $application->applicant->notify(new TeamApplicationUpdated($application));

        // Reload activity to ensure props are updated
        $application->recruitment->activity->load(['creator', 'teamLeader']);

        return redirect()->back()->with('success', 'Status lamaran berhasil diperbarui.');
    }
}
