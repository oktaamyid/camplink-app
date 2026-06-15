<?php

namespace App\Notifications;

use App\Models\ActivityRegistration;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class ActivityRegistrationUpdated extends Notification
{
    use Queueable;

    public function __construct(public ActivityRegistration $registration) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        $statusLabel = $this->registration->status === 'approved' ? 'disetujui' : 'ditolak';

        return [
            'type' => 'activity_registration_updated',
            'registration_id' => $this->registration->id,
            'status' => $this->registration->status,
            'activity_title' => $this->registration->activity->title,
            'activity_id' => $this->registration->activity_id,
            'message' => "Pendaftaran Anda di kegiatan {$this->registration->activity->title} telah {$statusLabel}",
        ];
    }
}
