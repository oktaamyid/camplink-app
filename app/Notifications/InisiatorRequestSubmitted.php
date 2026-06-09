<?php

namespace App\Notifications;

use App\Models\InisiatorRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class InisiatorRequestSubmitted extends Notification
{
    use Queueable;

    public function __construct(public InisiatorRequest $inisiatorRequest)
    {
        //
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'inisiator_request_submitted',
            'request_id' => $this->inisiatorRequest->id,
            'user_name' => $this->inisiatorRequest->user->name,
            'message' => "Permohonan baru sebagai inisiator dari {$this->inisiatorRequest->user->name}",
            'action_url' => route('admin.inisiator-requests.index'),
        ];
    }
}
