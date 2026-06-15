<?php

namespace App\Notifications;

use App\Models\CompetitionTeamMember;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class CompetitionTeamApplicationUpdated extends Notification
{
    use Queueable;

    public function __construct(public CompetitionTeamMember $member) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        $statusLabel = $this->member->status === 'accepted' ? 'diterima' : 'ditolak';

        return [
            'type' => 'competition_team_application_updated',
            'member_id' => $this->member->id,
            'status' => $this->member->status,
            'team_name' => $this->member->team->name,
            'activity_id' => $this->member->team->activity_id,
            'activity_title' => $this->member->team->activity->title,
            'message' => "Permintaan bergabung ke tim {$this->member->team->name} telah {$statusLabel}",
        ];
    }
}
