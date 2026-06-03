<?php

namespace App\Notifications;

use App\Models\TeamApplication;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class TeamApplicationUpdated extends Notification
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
        $statusStr = $this->application->status === 'accepted' ? 'diterima' : 'ditolak';
        
        return [
            'type' => 'team_application_updated',
            'application_id' => $this->application->id,
            'status' => $this->application->status,
            'role' => $this->application->role,
            'activity_title' => $this->application->recruitment->activity->title,
            'activity_id' => $this->application->recruitment->activity_id,
            'message' => "Lamaran Anda untuk posisi {$this->application->role} di kegiatan {$this->application->recruitment->activity->title} telah {$statusStr}.",
        ];
    }
}
