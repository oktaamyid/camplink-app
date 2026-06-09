<?php

namespace App\Notifications;

use App\Models\InisiatorRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class InisiatorRequestUpdated extends Notification
{
    use Queueable;

    public function __construct(public InisiatorRequest $inisiatorRequest) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        $statusLabel = $this->inisiatorRequest->status === 'approved' ? 'disetujui' : 'ditolak';

        return [
            'type' => 'inisiator_request_updated',
            'status' => $this->inisiatorRequest->status,
            'message' => "Permohonan inisiator Anda telah {$statusLabel}.",
            'admin_notes' => $this->inisiatorRequest->admin_notes,
            'action_url' => route('kegiatan.index'),
        ];
    }
}
