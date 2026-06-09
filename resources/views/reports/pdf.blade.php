<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Statistik CampLink</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2F3E8F; padding-bottom: 10px; }
        .header h1 { color: #2F3E8F; margin: 0; }
        .header p { margin: 5px 0 0; color: #666; }
        
        .section-title { font-size: 14px; font-weight: bold; margin-top: 20px; margin-bottom: 10px; color: #2F3E8F; text-transform: uppercase; }
        
        .stats-grid { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .stats-grid td { padding: 8px; border: 1px solid #ddd; width: 50%; }
        .stats-grid .label { font-weight: bold; background-color: #f9fafb; width: 40%; }
        
        table.data-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        table.data-table th, table.data-table td { border: 1px solid #ddd; padding: 6px; text-align: left; }
        table.data-table th { background-color: #f3f4f6; font-weight: bold; font-size: 11px; }
        table.data-table td { font-size: 10px; }
        
        .footer { position: absolute; bottom: 0; width: 100%; text-align: center; font-size: 10px; color: #999; border-top: 1px solid #ddd; padding-top: 10px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Laporan Statistik CampLink</h1>
        <p>Di-generate pada: {{ $date }}</p>
    </div>

    <div class="section-title">Ringkasan Platform</div>
    <table class="stats-grid">
        <tr>
            <td class="label">Total Pengguna Terdaftar</td>
            <td>{{ $stats['total_users'] }} Mahasiswa & Admin</td>
        </tr>
        <tr>
            <td class="label">Total Kegiatan Terposting</td>
            <td>{{ $stats['total_activities'] }} Kegiatan</td>
        </tr>
        <tr>
            <td class="label">Kegiatan Sedang Aktif</td>
            <td>{{ $stats['active_activities'] }} Kegiatan</td>
        </tr>
        <tr>
            <td class="label">Total Pendaftar Kegiatan</td>
            <td>{{ $stats['total_registrations'] }} Partisipan</td>
        </tr>
        <tr>
            <td class="label">Total Tim Terbentuk</td>
            <td>{{ $stats['total_teams'] }} Tim</td>
        </tr>
        <tr>
            <td class="label">Total Lamaran Tim</td>
            <td>{{ $stats['total_applications'] }} Lamaran</td>
        </tr>
    </table>

    <div class="section-title">Daftar Kegiatan</div>
    <table class="data-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Judul Kegiatan</th>
                <th>Kategori</th>
                <th>Pembuat</th>
                <th>Tgl Pelaksanaan</th>
                <th>Status</th>
                <th>Peserta</th>
            </tr>
        </thead>
        <tbody>
            @foreach($activities as $activity)
            <tr>
                <td>{{ $activity->id }}</td>
                <td>{{ $activity->title }}</td>
                <td>{{ $activity->category->name ?? 'Umum' }}</td>
                <td>{{ $activity->creator->name ?? 'Anonim' }}</td>
                <td>{{ $activity->event_date ? $activity->event_date->format('d/m/Y') : '-' }}</td>
                <td>{{ ucfirst($activity->status) }}</td>
                <td>{{ $activity->registrations_count }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        Dicetak secara otomatis oleh Sistem Admin CampLink
    </div>
</body>
</html>