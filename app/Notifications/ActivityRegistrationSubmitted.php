<?php

namespace App\Notifications;

use App\Models\ActivityRegistration;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class ActivityRegistrationSubmitted extends Notification
{
    use Queueable;

    public function __construct(public ActivityRegistration $registration) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'type' => 'activity_registration_submitted',
            'registration_id' => $this->registration->id,
            'applicant_name' => $this->registration->user->name,
            'activity_title' => $this->registration->activity->title,
            'activity_id' => $this->registration->activity_id,
            'message' => "{$this->registration->user->name} mendaftar sebagai peserta di kegiatan {$this->registration->activity->title}",
        ];
    }
}
