<?php

namespace App\Notifications;

use App\Models\ActivityReport;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class ActivityReportUpdated extends Notification
{
    use Queueable;

    public function __construct(public ActivityReport $report) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        $statusLabel = $this->report->status === 'resolved' ? 'diterima' : 'ditolak';

        return [
            'type' => 'activity_report_updated',
            'status' => $this->report->status,
            'message' => "Laporan Anda untuk kegiatan \"{$this->report->activity->title}\" telah {$statusLabel} oleh admin.",
            'admin_note' => $this->report->admin_note,
            'action_url' => route('kegiatan.show', $this->report->activity_id),
        ];
    }
}
