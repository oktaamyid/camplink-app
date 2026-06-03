<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CampLinkSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categories')->insert([
            ['name' => 'Seminar',       'description' => 'Kegiatan paparan ilmiah dan diskusi dari narasumber ahli',         'icon' => 'icon-seminar'],
            ['name' => 'Workshop',      'description' => 'Pelatihan praktis untuk meningkatkan kemampuan teknis/non-teknis', 'icon' => 'icon-workshop'],
            ['name' => 'Lomba',         'description' => 'Kompetisi antar mahasiswa dalam berbagai bidang',                  'icon' => 'icon-trophy'],
            ['name' => 'Penelitian',    'description' => 'Kegiatan riset dan penelitian ilmiah bersama tim',                 'icon' => 'icon-research'],
            ['name' => 'Proyek Kuliah', 'description' => 'Proyek pengembangan perangkat lunak atau produk untuk mata kuliah', 'icon' => 'icon-project'],
        ]);

        $password = Hash::make('password123');
        $now = now();

        DB::table('users')->insert([
            ['name' => 'Admin CampLink',             'email' => 'admin@camplink.id',                     'password' => $password, 'role' => 'admin',     'bio' => 'Administrator platform CampLink STT-NF',                                                         'skills' => null,                                              'email_verified_at' => $now, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Raffa Yuda Pratama',          'email' => 'raffa@student.stt-nf.ac.id',            'password' => $password, 'role' => 'mahasiswa', 'bio' => 'Project Manager yang berpengalaman dalam manajemen tim dan pengembangan produk digital.',          'skills' => 'Project Management, Public Speaking, Agile, Scrum', 'email_verified_at' => $now, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Muhammad Khoirul Anam',       'email' => 'anam@student.stt-nf.ac.id',             'password' => $password, 'role' => 'mahasiswa', 'bio' => 'Pengelola Jira dan tools manajemen proyek untuk tracking progress tim.',                          'skills' => 'Jira, Trello, Project Tracking, Agile',           'email_verified_at' => $now, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Nabib Khalish Alfayadh',      'email' => 'nabib@student.stt-nf.ac.id',            'password' => $password, 'role' => 'mahasiswa', 'bio' => 'Media kreatif kelompok, bertanggung jawab atas konten visual dan dokumentasi.',                   'skills' => 'Instagram, Content Creation, Graphic Design, Photography', 'email_verified_at' => $now, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Ilham Abdulloh',               'email' => 'ilham@student.stt-nf.ac.id',            'password' => $password, 'role' => 'mahasiswa', 'bio' => 'UI Designer yang berfokus pada perancangan tampilan awal dan halaman authentication.',            'skills' => 'Figma, UI Design, Authentication UI, Wireframing', 'email_verified_at' => $now, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Abiyan Abdulrohman',           'email' => 'abiyan@student.stt-nf.ac.id',           'password' => $password, 'role' => 'mahasiswa', 'bio' => 'UI/UX Designer yang berfokus pada dashboard dan pengalaman pengguna.',                           'skills' => 'Figma, UX Research, Dashboard Design, Wireframing', 'email_verified_at' => $now, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Firtiansyah Okta Resama',      'email' => 'firtiansyah@student.stt-nf.ac.id',      'password' => $password, 'role' => 'mahasiswa', 'bio' => 'Frontend developer yang membangun halaman dashboard dan pengelola repositori GitHub.',             'skills' => 'React.js, GitHub, Frontend Development, Dashboard', 'email_verified_at' => $now, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Sholahudin Robbani',           'email' => 'sholahudin@student.stt-nf.ac.id',       'password' => $password, 'role' => 'mahasiswa', 'bio' => 'Full-stack developer yang mengembangkan fitur authentication dan landing page.',                  'skills' => 'Node.js, Express.js, Authentication, JWT, Landing Page', 'email_verified_at' => $now, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Saphiere Januar Rafiansyah',   'email' => 'saphiere@student.stt-nf.ac.id',         'password' => $password, 'role' => 'mahasiswa', 'bio' => 'Database Architect yang merancang struktur database dan ERD sistem CampLink.',                    'skills' => 'MySQL, Database Design, ERD, API Design, REST API', 'email_verified_at' => $now, 'created_at' => $now, 'updated_at' => $now],
        ]);

        DB::table('activities')->insert([
            ['title' => 'Seminar Nasional Teknologi Informasi 2026',   'description' => 'Seminar nasional yang membahas tren terkini dalam dunia teknologi informasi, termasuk AI, Cloud Computing, dan Cybersecurity.',                                         'category_id' => 1, 'creator_id' => 2, 'location' => 'Aula STT-NF Lantai 3',  'event_date' => '2026-05-10', 'deadline_date' => '2026-05-05', 'status' => 'active', 'is_team_based' => false, 'created_at' => $now, 'updated_at' => $now],
            ['title' => 'Workshop React.js untuk Pemula',              'description' => 'Workshop intensif belajar React.js dari dasar hingga bisa membuat aplikasi web sederhana. Peserta akan mendapatkan materi dan sertifikat kehadiran.',                     'category_id' => 2, 'creator_id' => 7, 'location' => 'Lab Komputer STT-NF',   'event_date' => '2026-05-15', 'deadline_date' => '2026-05-12', 'status' => 'active', 'is_team_based' => false, 'created_at' => $now, 'updated_at' => $now],
            ['title' => 'Hackathon STT-NF 2026 - Inovasi Teknologi',   'description' => 'Kompetisi hackathon tingkat kampus. Tim beranggotakan 3-5 mahasiswa akan membangun solusi teknologi dalam waktu 24 jam. Hadiah berupa uang tunai dan sertifikat.',       'category_id' => 3, 'creator_id' => 2, 'location' => 'Gedung STT-NF',         'event_date' => '2026-06-01', 'deadline_date' => '2026-05-25', 'status' => 'active', 'is_team_based' => true,  'created_at' => $now, 'updated_at' => $now],
            ['title' => 'Penelitian Sistem Rekomendasi Berbasis AI',   'description' => 'Mencari anggota tim untuk penelitian bersama tentang sistem rekomendasi menggunakan machine learning. Hasil penelitian akan dipublikasikan di jurnal ilmiah kampus.',     'category_id' => 4, 'creator_id' => 8, 'location' => 'Online (Google Meet)',   'event_date' => '2026-07-01', 'deadline_date' => '2026-05-20', 'status' => 'active', 'is_team_based' => true,  'created_at' => $now, 'updated_at' => $now],
            ['title' => 'Proyek Pengembangan Aplikasi CampLink',        'description' => 'Proyek kolaborasi pengembangan platform CampLink sebagai tugas mata kuliah Manajemen Proyek. Tim membutuhkan developer frontend, backend, dan desainer UI/UX.',         'category_id' => 5, 'creator_id' => 2, 'location' => 'Online & Offline',      'event_date' => '2026-06-30', 'deadline_date' => '2026-04-30', 'status' => 'active', 'is_team_based' => true,  'created_at' => $now, 'updated_at' => $now],
        ]);

        DB::table('activity_registrations')->insert([
            ['activity_id' => 1, 'user_id' => 3, 'registered_at' => $now],
            ['activity_id' => 1, 'user_id' => 4, 'registered_at' => $now],
            ['activity_id' => 1, 'user_id' => 9, 'registered_at' => $now],
            ['activity_id' => 2, 'user_id' => 5, 'registered_at' => $now],
            ['activity_id' => 2, 'user_id' => 6, 'registered_at' => $now],
            ['activity_id' => 2, 'user_id' => 3, 'registered_at' => $now],
        ]);

        DB::table('team_recruitments')->insert([
            ['activity_id' => 3, 'description' => 'Mencari anggota tim hackathon yang passionate di bidang teknologi. Tim terdiri dari developer, desainer, dan business analyst.',              'skills_required' => 'Web Development (React/Node.js), UI/UX Design, Analisis Bisnis',    'total_slots' => 4, 'filled_slots' => 1, 'status' => 'open', 'created_at' => $now, 'updated_at' => $now],
            ['activity_id' => 4, 'description' => 'Tim penelitian membutuhkan mahasiswa yang tertarik di bidang data science dan machine learning.',                                           'skills_required' => 'Python, Machine Learning, Data Analysis, Penulisan Ilmiah',          'total_slots' => 3, 'filled_slots' => 0, 'status' => 'open', 'created_at' => $now, 'updated_at' => $now],
            ['activity_id' => 5, 'description' => 'Tim CampLink membuka rekrutmen untuk posisi: Frontend Developer (React), Backend Developer (Node.js/Express), dan UI/UX Designer.',       'skills_required' => 'React.js, Node.js, Express.js, MySQL, Figma, Git/GitHub',             'total_slots' => 5, 'filled_slots' => 2, 'status' => 'open', 'created_at' => $now, 'updated_at' => $now],
        ]);

        DB::table('team_applications')->insert([
            ['recruitment_id' => 1, 'applicant_id' => 5, 'message' => 'Saya tertarik bergabung sebagai UI/UX Designer untuk tim hackathon ini. Saya memiliki pengalaman desain dengan Figma.',                                          'status' => 'pending',  'reviewed_at' => null, 'applied_at' => $now],
            ['recruitment_id' => 1, 'applicant_id' => 6, 'message' => 'Saya ingin bergabung sebagai desainer di tim hackathon. Saya berpengalaman membuat dashboard dan wireframe yang user-friendly.',                                   'status' => 'accepted', 'reviewed_at' => $now, 'applied_at' => $now],
            ['recruitment_id' => 2, 'applicant_id' => 9, 'message' => 'Saya sangat tertarik dengan penelitian sistem rekomendasi berbasis AI. Latar belakang saya database design, dan saya sedang belajar Python secara mandiri.',       'status' => 'pending',  'reviewed_at' => null, 'applied_at' => $now],
            ['recruitment_id' => 3, 'applicant_id' => 7, 'message' => 'Saya ingin bergabung sebagai Frontend Developer. Saya sudah berpengalaman dengan React.js dan siap membangun halaman dashboard CampLink.',                         'status' => 'accepted', 'reviewed_at' => $now, 'applied_at' => $now],
            ['recruitment_id' => 3, 'applicant_id' => 8, 'message' => 'Saya mengajukan diri sebagai Backend Developer. Saya sudah mengerjakan sistem authentication menggunakan Node.js dan JWT yang bisa langsung diintegrasikan.',      'status' => 'accepted', 'reviewed_at' => $now, 'applied_at' => $now],
        ]);

        DB::table('notifications')->insert([
            ['user_id' => 5, 'title' => 'Lamaran Tim Anda Sedang Diproses',    'message' => 'Lamaran Anda untuk bergabung ke tim Hackathon STT-NF 2026 sedang ditinjau oleh pembuat kegiatan.',              'type' => 'application_update', 'reference_id' => 1, 'reference_type' => 'team_application', 'is_read' => false, 'created_at' => $now],
            ['user_id' => 6, 'title' => 'Selamat! Lamaran Tim Anda Diterima',  'message' => 'Lamaran Anda untuk bergabung ke tim Hackathon STT-NF 2026 telah diterima.',                                     'type' => 'application_update', 'reference_id' => 2, 'reference_type' => 'team_application', 'is_read' => false, 'created_at' => $now],
            ['user_id' => 7, 'title' => 'Selamat! Lamaran Tim Anda Diterima',  'message' => 'Lamaran Anda sebagai Frontend Developer di Proyek CampLink telah diterima.',                                    'type' => 'application_update', 'reference_id' => 4, 'reference_type' => 'team_application', 'is_read' => false, 'created_at' => $now],
            ['user_id' => 8, 'title' => 'Selamat! Lamaran Tim Anda Diterima',  'message' => 'Lamaran Anda sebagai Backend Developer di Proyek CampLink telah diterima.',                                     'type' => 'application_update', 'reference_id' => 5, 'reference_type' => 'team_application', 'is_read' => false, 'created_at' => $now],
            ['user_id' => 3, 'title' => 'Kegiatan Baru: Hackathon STT-NF 2026', 'message' => 'Ada kegiatan baru yang mungkin menarik untukmu: Hackathon STT-NF 2026. Deadline pendaftaran: 25 Mei 2026.',    'type' => 'new_activity',       'reference_id' => 3, 'reference_type' => 'activity',          'is_read' => false, 'created_at' => $now],
        ]);
    }
}
