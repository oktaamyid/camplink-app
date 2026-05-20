import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Users, CheckCircle2, XCircle, UserPlus } from 'lucide-react';

const teamData = {
    eventTitle: 'National Business Plan Competition 2024',
    totalQuota: 5,
    filled: 2,
    members: [
        {
            id: 1,
            name: 'Raffa Yuda (Anda)',
            role: 'Full Stack Developer',
            position: 'Ketua Tim',
            isLeader: true,
            status: 'accepted',
            avatar: 'RY',
        },
        {
            id: 2,
            name: 'Dinda Aulia',
            role: 'UI/UX Designer',
            position: 'Anggota',
            isLeader: false,
            status: 'accepted',
            avatar: 'DA',
        },
    ],
    openPositions: [
        { id: 1, title: 'Backend Developer', quota: 1, filled: 0 },
        { id: 2, title: 'Data Analyst', quota: 1, filled: 0 },
        { id: 3, title: 'Marketing', quota: 1, filled: 0 },
    ],
    requests: [
        {
            id: 1,
            name: 'Rizky Pratama',
            role: 'Backend Developer',
            avatar: 'RP',
        },
        {
            id: 2,
            name: 'Salsa Putri',
            role: 'Data Analyst',
            avatar: 'SP',
        },
    ],
};

const avatarColors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-emerald-500',
    'bg-orange-500',
    'bg-rose-500',
    'bg-cyan-500',
];

export default function Tim() {
    return (
        <CampLinkLayout>
            <Head title="Tim Kegiatan" />

            <div className="mb-4">
                <Link
                    href="/kegiatan/1"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Kembali
                </Link>
            </div>

            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900">Tim Kegiatan</h1>
                <p className="mt-1 text-sm text-gray-500">Kelola anggota tim untuk kegiatan ini</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Members */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-gray-900">
                                Anggota Tim ({teamData.filled}/{teamData.totalQuota})
                            </h2>
                            <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                <UserPlus className="size-3.5" />
                                Undang Anggota
                            </button>
                        </div>

                        {/* Progress bar */}
                        <div className="mb-5">
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                                <span>Kapasitas tim</span>
                                <span>{teamData.filled} dari {teamData.totalQuota} anggota</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-gray-100">
                                <div
                                    className="h-2 rounded-full bg-[#2F3E8F] transition-all"
                                    style={{ width: `${(teamData.filled / teamData.totalQuota) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            {teamData.members.map((member, i) => (
                                <div
                                    key={member.id}
                                    className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex size-9 items-center justify-center rounded-full ${avatarColors[i % avatarColors.length]}`}
                                        >
                                            <span className="text-xs font-semibold text-white">{member.avatar}</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                                                {member.isLeader && (
                                                    <span className="rounded-full bg-[#2F3E8F] px-2 py-0.5 text-xs font-medium text-white">
                                                        Ketua Tim
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500">{member.role}</p>
                                        </div>
                                    </div>
                                    <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                                        <CheckCircle2 className="size-3" />
                                        Diterima
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Open Positions */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h2 className="mb-4 text-sm font-semibold text-gray-900">Posisi yang Dibutuhkan</h2>
                        <div className="space-y-2">
                            {teamData.openPositions.map((pos) => (
                                <div
                                    key={pos.id}
                                    className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-8 items-center justify-center rounded-lg bg-gray-100">
                                            <Users className="size-4 text-gray-400" />
                                        </div>
                                        <span className="text-sm text-gray-900">{pos.title}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        {pos.filled}/{pos.quota}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Join Requests */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h2 className="mb-4 text-sm font-semibold text-gray-900">Permintaan Bergabung</h2>
                        <div className="space-y-3">
                            {teamData.requests.map((req, i) => (
                                <div
                                    key={req.id}
                                    className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex size-9 items-center justify-center rounded-full ${avatarColors[(i + 3) % avatarColors.length]}`}
                                        >
                                            <span className="text-xs font-semibold text-white">{req.avatar}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{req.name}</p>
                                            <p className="text-xs text-gray-500">{req.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="flex items-center gap-1 rounded-lg bg-[#2F3E8F] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#243070] transition-colors">
                                            <CheckCircle2 className="size-3.5" />
                                            Terima
                                        </button>
                                        <button className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors">
                                            <XCircle className="size-3.5" />
                                            Tolak
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="space-y-4">
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h2 className="mb-3 text-sm font-semibold text-gray-900">Kegiatan</h2>
                        <p className="text-sm text-gray-700 font-medium leading-snug">{teamData.eventTitle}</p>
                        <Link
                            href="/kegiatan/1"
                            className="mt-3 block text-xs font-medium text-[#2F3E8F] hover:underline"
                        >
                            Lihat detail kegiatan →
                        </Link>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h2 className="mb-3 text-sm font-semibold text-gray-900">Statistik Tim</h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Total Anggota</span>
                                <span className="text-sm font-semibold text-gray-900">{teamData.filled}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Posisi Terbuka</span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {teamData.totalQuota - teamData.filled}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Permintaan Masuk</span>
                                <span className="text-sm font-semibold text-gray-900">{teamData.requests.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CampLinkLayout>
    );
}
