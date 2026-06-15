<?php

namespace App\Notifications;

use App\Models\CompetitionTeamMember;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class CompetitionTeamApplicationSubmitted extends Notification
{
    use Queueable;

    public function __construct(public CompetitionTeamMember $member) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'type' => 'competition_team_application_submitted',
            'member_id' => $this->member->id,
            'applicant_name' => $this->member->user->name,
            'team_name' => $this->member->team->name,
            'activity_id' => $this->member->team->activity_id,
            'activity_title' => $this->member->team->activity->title,
            'message' => "{$this->member->user->name} ingin bergabung ke tim {$this->member->team->name}",
        ];
    }
}
