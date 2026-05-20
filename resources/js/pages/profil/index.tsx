import CampLinkLayout from '@/layouts/camplink-layout';
import { Head } from '@inertiajs/react';
import { Edit3, MapPin, Mail, Globe, Github, Linkedin, Instagram, Plus, Bookmark } from 'lucide-react';

const profile = {
    name: 'Raffa Yuda',
    role: 'Mahasiswa',
    university: 'Universitas Indonesia',
    major: 'Teknik Informatika',
    semester: 'Semester 6',
    location: 'Jakarta, Indonesia',
    email: 'raffa.yuda@student.ui.ac.id',
    bio: 'Mahasiswa Teknik Informatika yang passionate di bidang web development dan UI/UX design. Aktif mengikuti berbagai kegiatan kampus dan kompetisi teknologi.',
    skills: ['React', 'Laravel', 'TypeScript', 'UI/UX Design', 'Node.js', 'Python', 'Figma'],
    interests: ['Web Development', 'AI/ML', 'Startup', 'Design Thinking', 'Data Science'],
    stats: {
        events: 12,
        teams: 4,
        achievements: 3,
    },
    events: [
        { id: 1, title: 'Workshop UI/UX Design', category: 'Workshop', status: 'Aktif' },
        { id: 2, title: 'National Business Plan Competition 2024', category: 'Lomba', status: 'Aktif' },
        { id: 3, title: 'Kuliah Tamu: Cyber Security', category: 'Seminar', status: 'Selesai' },
    ],
};

const categoryColors: Record<string, { bg: string; text: string }> = {
    Lomba: { bg: 'bg-blue-50', text: 'text-blue-700' },
    Seminar: { bg: 'bg-purple-50', text: 'text-purple-700' },
    Workshop: { bg: 'bg-orange-50', text: 'text-orange-700' },
    Penelitian: { bg: 'bg-green-50', text: 'text-green-700' },
    Proyek: { bg: 'bg-rose-50', text: 'text-rose-700' },
};

export default function Profil() {
    return (
        <CampLinkLayout>
            <Head title="Profil" />

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left column */}
                <div className="space-y-5">
                    {/* Profile card */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="flex size-16 items-center justify-center rounded-full bg-[#2F3E8F]">
                                    <span className="text-xl font-bold text-white">RY</span>
                                </div>
                                <div>
                                    <h1 className="text-base font-bold text-gray-900">{profile.name}</h1>
                                    <p className="text-sm text-gray-500">{profile.role}</p>
                                    <p className="text-xs text-gray-400">{profile.major} · {profile.semester}</p>
                                </div>
                            </div>
                            <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                <Edit3 className="size-3.5" />
                                Edit
                            </button>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed mb-4">{profile.bio}</p>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <MapPin className="size-4 text-gray-400 flex-shrink-0" />
                                {profile.location}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Mail className="size-4 text-gray-400 flex-shrink-0" />
                                <span className="truncate">{profile.email}</span>
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="mt-4 flex items-center gap-2">
                            {[Globe, Github, Linkedin, Instagram].map((Icon, i) => (
                                <button
                                    key={i}
                                    className="flex size-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-[#2F3E8F] hover:text-[#2F3E8F] transition-colors"
                                >
                                    <Icon className="size-4" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { label: 'Kegiatan', value: profile.stats.events },
                            { label: 'Tim', value: profile.stats.teams },
                            { label: 'Prestasi', value: profile.stats.achievements },
                        ].map((stat) => (
                            <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-3 text-center">
                                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-xs text-gray-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Skills */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-gray-900">Skills</h2>
                            <button className="flex items-center gap-1 text-xs font-medium text-[#2F3E8F] hover:underline">
                                <Plus className="size-3" /> Tambah
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {profile.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Interests */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-gray-900">Minat</h2>
                            <button className="flex items-center gap-1 text-xs font-medium text-[#2F3E8F] hover:underline">
                                <Plus className="size-3" /> Tambah
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {profile.interests.map((interest) => (
                                <span
                                    key={interest}
                                    className="rounded-full bg-[#EEF1FA] px-3 py-1 text-xs font-medium text-[#2F3E8F]"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Joined events */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-gray-900">Kegiatan Diikuti</h2>
                            <span className="text-xs text-gray-500">{profile.events.length} kegiatan</span>
                        </div>
                        <div className="space-y-3">
                            {profile.events.map((event, i) => {
                                const colors = categoryColors[event.category] ?? { bg: 'bg-gray-100', text: 'text-gray-600' };
                                return (
                                    <div
                                        key={event.id}
                                        className={`flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 ${
                                            i !== profile.events.length - 1 ? '' : ''
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-8 items-center justify-center rounded-lg bg-white border border-gray-200">
                                                <Bookmark className="size-4 text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{event.title}</p>
                                                <span className={`inline-flex rounded-md px-1.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
                                                    {event.category}
                                                </span>
                                            </div>
                                        </div>
                                        <span
                                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                                                event.status === 'Aktif'
                                                    ? 'bg-green-50 text-green-700'
                                                    : 'bg-gray-100 text-gray-500'
                                            }`}
                                        >
                                            {event.status}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Activity / placeholder */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h2 className="mb-4 text-sm font-semibold text-gray-900">Aktivitas Terbaru</h2>
                        <div className="space-y-4">
                            {[
                                { text: 'Bergabung ke tim Business Plan Competition sebagai Backend Developer', time: '2 hari lalu' },
                                { text: 'Mendaftar Workshop UI/UX Design', time: '5 hari lalu' },
                                { text: 'Membuat kegiatan Web Development Bootcamp', time: '1 minggu lalu' },
                                { text: 'Menyelesaikan Seminar AI & Masa Depan Teknologi', time: '2 minggu lalu' },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="mt-1.5 size-1.5 flex-shrink-0 rounded-full bg-[#2F3E8F]" />
                                    <div>
                                        <p className="text-sm text-gray-700">{activity.text}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </CampLinkLayout>
    );
}
