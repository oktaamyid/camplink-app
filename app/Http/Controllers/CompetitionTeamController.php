<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityRegistration;
use App\Models\CompetitionTeam;
use App\Models\CompetitionTeamMember;
use App\Notifications\CompetitionTeamApplicationSubmitted;
use App\Notifications\CompetitionTeamApplicationUpdated;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CompetitionTeamController extends Controller
{
    /**
     * List all teams for a competition activity.
     */
    public function index(Request $request, Activity $kegiatan): Response
    {
        $kegiatan->load(['category', 'creator']);

        $isApprovedParticipant = ActivityRegistration::where('activity_id', $kegiatan->id)
            ->where('user_id', $request->user()->id)
            ->where('status', 'approved')
            ->exists();

        $isCreator = $request->user()->id === $kegiatan->creator_id;

        if (! $isApprovedParticipant && ! $isCreator && ! $request->user()->isAdmin()) {
            abort(403, 'Hanya peserta yang telah disetujui yang dapat melihat halaman ini.');
        }

        $teams = $kegiatan->competitionTeams()
            ->with([
                'leader:id,name,email',
                'acceptedMembers.user:id,name,email',
                'pendingMembers.user:id,name,email',
            ])
            ->withCount('acceptedMembers')
            ->get();

        // Detect current user's team membership
        $myTeam = null;
        $myMembership = null;

        foreach ($teams as $team) {
            $membership = $team->members->firstWhere('user_id', $request->user()->id);
            if ($membership) {
                $myTeam = $team;
                $myMembership = $membership;
                break;
            }
        }

        return Inertia::render('kegiatan/tim-lomba/index', [
            'activity' => $kegiatan,
            'teams' => $teams,
            'myTeam' => $myTeam,
            'myMembership' => $myMembership,
            'isApprovedParticipant' => $isApprovedParticipant,
            'isCreator' => $isCreator,
        ]);
    }

    /**
     * Create a new competition team (approved participant only).
     */
    public function store(Request $request, Activity $kegiatan): RedirectResponse
    {
        $user = $request->user();

        $isApprovedParticipant = ActivityRegistration::where('activity_id', $kegiatan->id)
            ->where('user_id', $user->id)
            ->where('status', 'approved')
            ->exists();

        if (! $isApprovedParticipant) {
            return back()->with('error', 'Hanya peserta yang telah disetujui yang dapat membuat tim.');
        }

        // Check if user already has a team in this activity
        $alreadyInTeam = CompetitionTeamMember::whereHas('team', function ($q) use ($kegiatan) {
            $q->where('activity_id', $kegiatan->id);
        })->where('user_id', $user->id)
            ->where('status', 'accepted')
            ->exists();

        if ($alreadyInTeam) {
            return back()->with('error', 'Anda sudah tergabung dalam sebuah tim untuk lomba ini.');
        }

        // Check max teams limit
        if ($kegiatan->max_teams) {
            $currentTeamCount = $kegiatan->competitionTeams()->count();
            if ($currentTeamCount >= $kegiatan->max_teams) {
                return back()->with('error', 'Jumlah tim sudah mencapai batas maksimal.');
            }
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
        ]);

        $team = CompetitionTeam::create([
            'activity_id' => $kegiatan->id,
            'leader_id' => $user->id,
            'name' => $validated['name'],
        ]);

        // Add creator as accepted member
        CompetitionTeamMember::create([
            'team_id' => $team->id,
            'user_id' => $user->id,
            'status' => 'accepted',
        ]);

        return back()->with('success', "Tim \"{$team->name}\" berhasil dibuat.");
    }

    /**
     * Apply to join an existing team (approved participant only).
     */
    public function apply(Request $request, CompetitionTeam $team): RedirectResponse
    {
        $user = $request->user();
        $activity = $team->activity;

        $isApprovedParticipant = ActivityRegistration::where('activity_id', $activity->id)
            ->where('user_id', $user->id)
            ->where('status', 'approved')
            ->exists();

        if (! $isApprovedParticipant) {
            return back()->with('error', 'Hanya peserta yang telah disetujui yang dapat bergabung ke tim.');
        }

        // Check if already in any team
        $alreadyInTeam = CompetitionTeamMember::whereHas('team', function ($q) use ($activity) {
            $q->where('activity_id', $activity->id);
        })->where('user_id', $user->id)
            ->where('status', 'accepted')
            ->exists();

        if ($alreadyInTeam) {
            return back()->with('error', 'Anda sudah tergabung dalam sebuah tim untuk lomba ini.');
        }

        // Check if already applied to this team
        $alreadyApplied = CompetitionTeamMember::where('team_id', $team->id)
            ->where('user_id', $user->id)
            ->exists();

        if ($alreadyApplied) {
            return back()->with('error', 'Anda sudah mengajukan permohonan ke tim ini.');
        }

        // Check team max members
        if ($activity->max_members_per_team) {
            $currentMemberCount = $team->acceptedMembers()->count();
            if ($currentMemberCount >= $activity->max_members_per_team) {
                return back()->with('error', 'Tim ini sudah penuh.');
            }
        }

        $validated = $request->validate([
            'message' => ['nullable', 'string', 'max:500'],
        ]);

        $member = CompetitionTeamMember::create([
            'team_id' => $team->id,
            'user_id' => $user->id,
            'status' => 'pending',
            'message' => $validated['message'] ?? null,
        ]);

        $member->load(['user', 'team.activity']);
        $team->leader->notify(new CompetitionTeamApplicationSubmitted($member));

        return back()->with('success', 'Permohonan bergabung berhasil dikirim. Menunggu persetujuan ketua tim.');
    }

    /**
     * Update a member's status (team leader only: accept/reject).
     */
    public function updateMember(Request $request, CompetitionTeamMember $member): RedirectResponse
    {
        $user = $request->user();
        $team = $member->team;

        if ($team->leader_id !== $user->id) {
            abort(403, 'Hanya ketua tim yang dapat menerima atau menolak anggota.');
        }

        $validated = $request->validate([
            'status' => ['required', 'in:accepted,rejected'],
        ]);

        // Check max members before accepting
        if ($validated['status'] === 'accepted' && $member->status !== 'accepted') {
            $activity = $team->activity;
            if ($activity->max_members_per_team) {
                $currentMemberCount = $team->acceptedMembers()->count();
                if ($currentMemberCount >= $activity->max_members_per_team) {
                    return back()->with('error', 'Tim sudah penuh, tidak dapat menerima anggota baru.');
                }
            }
        }

        $member->update([
            'status' => $validated['status'],
            'reviewed_at' => now(),
        ]);

        $member->load(['user', 'team.activity']);
        $member->user->notify(new CompetitionTeamApplicationUpdated($member));

        $action = $validated['status'] === 'accepted' ? 'diterima' : 'ditolak';

        return back()->with('success', "{$member->user->name} berhasil {$action} ke dalam tim.");
    }
}
