<?php

namespace App\Notifications;

use App\Models\Activity;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class AdminCertificateAlert extends Notification
{
    use Queueable;

    public function __construct(public Activity $activity, public int $count) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'admin_certificate_alert',
            'activity_id' => $this->activity->id,
            'message' => "{$this->count} sertifikat baru telah diunggah untuk kegiatan: {$this->activity->title}",
            'action_url' => route('dashboard'), // Admin dashboard
        ];
    }
}
