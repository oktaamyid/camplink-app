<?php

namespace App\Notifications;

use App\Models\Certificate;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class CertificateUploaded extends Notification
{
    use Queueable;

    public function __construct(public Certificate $certificate) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'certificate_uploaded',
            'activity_title' => $this->certificate->activity->title,
            'message' => "Sertifikat untuk kegiatan {$this->certificate->activity->title} telah tersedia.",
            'action_url' => route('profil.index'), // Assuming certificates are viewable in profile
        ];
    }
}
