<?php

namespace App\Notifications;

use App\Models\Activity;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewActivityPublished extends Notification
{
    use Queueable;

    public function __construct(public Activity $activity) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'new_activity_published',
            'activity_id' => $this->activity->id,
            'title' => $this->activity->title,
            'message' => "Kegiatan baru telah diterbitkan: {$this->activity->title}",
            'action_url' => route('kegiatan.show', $this->activity->id),
        ];
    }
}
