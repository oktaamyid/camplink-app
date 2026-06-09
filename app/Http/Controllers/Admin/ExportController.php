<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\ActivityRegistration;
use App\Models\TeamApplication;
use App\Models\TeamRecruitment;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExportController extends Controller
{
    /**
     * Gather data for the report.
     */
    private function getReportData(): array
    {
        $stats = [
            'total_users' => User::count(),
            'total_activities' => Activity::count(),
            'active_activities' => Activity::where('status', 'active')->count(),
            'completed_activities' => Activity::where('status', 'completed')->count(),
            'total_teams' => TeamRecruitment::count(),
            'total_applications' => TeamApplication::count(),
            'total_registrations' => ActivityRegistration::count(),
        ];

        $activities = Activity::with(['category', 'creator'])
            ->withCount(['registrations', 'reports', 'reviews'])
            ->latest()
            ->get();

        return [
            'stats' => $stats,
            'activities' => $activities,
            'date' => now()->format('d F Y'),
        ];
    }

    /**
     * Export report to PDF.
     */
    public function exportPdf(Request $request)
    {
        if (! $request->user()->isAdmin()) {
            abort(403);
        }

        $data = $this->getReportData();

        $pdf = Pdf::loadView('reports.pdf', $data);

        return $pdf->download('Laporan_CampLink_'.now()->format('Y-m-d').'.pdf');
    }

    /**
     * Export report to CSV (Excel compatible).
     */
    public function exportCsv(Request $request): StreamedResponse
    {
        if (! $request->user()->isAdmin()) {
            abort(403);
        }

        $data = $this->getReportData();

        $fileName = 'Laporan_Kegiatan_CampLink_'.now()->format('Y-m-d').'.csv';

        $headers = [
            'Content-type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename='.$fileName,
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = function () use ($data) {
            $file = fopen('php://output', 'w');

            // Add UTF-8 BOM for Excel compatibility
            fwrite($file, "\xEF\xBB\xBF");

            // Summary Section
            fputcsv($file, ['RINGKASAN STATISTIK CAMPLINK']);
            fputcsv($file, ['Tanggal Export', $data['date']]);
            fputcsv($file, []);
            fputcsv($file, ['Total Pengguna', $data['stats']['total_users']]);
            fputcsv($file, ['Total Kegiatan', $data['stats']['total_activities']]);
            fputcsv($file, ['Kegiatan Aktif', $data['stats']['active_activities']]);
            fputcsv($file, ['Kegiatan Selesai', $data['stats']['completed_activities']]);
            fputcsv($file, ['Total Tim Terbentuk', $data['stats']['total_teams']]);
            fputcsv($file, ['Total Pendaftar Kegiatan', $data['stats']['total_registrations']]);
            fputcsv($file, []);
            fputcsv($file, []);

            // Activities Table Header
            fputcsv($file, ['DAFTAR KEGIATAN']);
            fputcsv($file, [
                'ID',
                'Judul Kegiatan',
                'Kategori',
                'Pembuat',
                'Tanggal Pelaksanaan',
                'Status',
                'Jumlah Pendaftar',
                'Jumlah Tim',
                'Jumlah Laporan',
                'Jumlah Ulasan',
            ]);

            // Activities Data
            foreach ($data['activities'] as $activity) {
                fputcsv($file, [
                    $activity->id,
                    $activity->title,
                    $activity->category->name ?? 'Umum',
                    $activity->creator->name ?? 'Anonim',
                    $activity->event_date ? $activity->event_date->format('Y-m-d') : '-',
                    $activity->status,
                    $activity->registrations_count,
                    $activity->is_team_based ? 1 : 0,
                    $activity->reports_count,
                    $activity->reviews_count,
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
