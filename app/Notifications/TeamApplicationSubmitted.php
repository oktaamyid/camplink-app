<?php

namespace App\Notifications;

use App\Models\TeamApplication;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class TeamApplicationSubmitted extends Notification
{
    use Queueable;

    public function __construct(public TeamApplication $application)
    {
        //
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'type' => 'team_application_submitted',
            'application_id' => $this->application->id,
            'applicant_name' => $this->application->applicant->name,
            'role' => $this->application->role,
            'activity_title' => $this->application->recruitment->activity->title,
            'activity_id' => $this->application->recruitment->activity_id,
            'message' => "{$this->application->applicant->name} melamar posisi {$this->application->role} di kegiatan {$this->application->recruitment->activity->title}",
        ];
    }
}
