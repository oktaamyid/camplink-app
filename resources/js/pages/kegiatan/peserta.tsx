import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Users, Mail, GraduationCap, Building2 } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    university: string | null;
    major: string | null;
}

interface Registration {
    id: number;
    user_id: number;
    registered_at: string;
    user: User;
}

interface Activity {
    id: number;
    title: string;
    category?: { name: string };
}

interface Props {
    activity: Activity;
    participants: Registration[];
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const avatarColors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-emerald-500',
    'bg-orange-500',
    'bg-rose-500',
    'bg-cyan-500',
    'bg-amber-500',
    'bg-indigo-500',
];

export default function Peserta({ activity, participants }: Props) {
    return (
        <CampLinkLayout>
            <Head title={`Peserta - ${activity.title}`} />

            <div className="mb-4">
                <Link
                    href={`/kegiatan/${activity.id}`}
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Kembali ke Kegiatan
                </Link>
            </div>

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Daftar Peserta</h1>
                    <p className="mt-1 text-sm text-gray-500">{activity.title}</p>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-[#2F3E8F]/5 border border-[#2F3E8F]/10 px-4 py-2">
                    <Users className="size-4 text-[#2F3E8F]" />
                    <span className="text-sm font-semibold text-[#2F3E8F]">{participants.length} Peserta</span>
                </div>
            </div>

            {participants.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
                    <Users className="mb-3 size-12 text-gray-300" />
                    <h2 className="text-lg font-semibold text-gray-900">Belum ada peserta</h2>
                    <p className="mt-1 text-sm text-gray-500">Belum ada mahasiswa yang mendaftar untuk kegiatan ini.</p>
                </div>
            ) : (
                <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 border-b border-gray-100 bg-gray-50 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        <div className="col-span-1">#</div>
                        <div className="col-span-4">Nama</div>
                        <div className="col-span-3">Universitas / Jurusan</div>
                        <div className="col-span-4">Tanggal Daftar</div>
                    </div>

                    {/* Table Body */}
                    {participants.map((reg, index) => (
                        <div
                            key={reg.id}
                            className="grid grid-cols-12 items-center gap-4 border-b border-gray-50 px-5 py-4 last:border-0 hover:bg-gray-50/50 transition-colors"
                        >
                            <div className="col-span-1 text-sm text-gray-400 font-medium">
                                {index + 1}
                            </div>
                            <div className="col-span-4 flex items-center gap-3">
                                <div className={`flex size-9 shrink-0 items-center justify-center rounded-full ${avatarColors[index % avatarColors.length]}`}>
                                    <span className="text-xs font-semibold text-white">
                                        {reg.user.name.substring(0, 2).toUpperCase()}
                                    </span>
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-gray-900">{reg.user.name}</p>
                                    <p className="flex items-center gap-1 truncate text-xs text-gray-500">
                                        <Mail className="size-3" />
                                        {reg.user.email}
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="space-y-0.5">
                                    {reg.user.university && (
                                        <p className="flex items-center gap-1 text-xs text-gray-700">
                                            <Building2 className="size-3 text-gray-400" />
                                            <span className="truncate">{reg.user.university}</span>
                                        </p>
                                    )}
                                    {reg.user.major && (
                                        <p className="flex items-center gap-1 text-xs text-gray-500">
                                            <GraduationCap className="size-3 text-gray-400" />
                                            <span className="truncate">{reg.user.major}</span>
                                        </p>
                                    )}
                                    {!reg.user.university && !reg.user.major && (
                                        <span className="text-xs text-gray-400">-</span>
                                    )}
                                </div>
                            </div>
                            <div className="col-span-4 text-xs text-gray-500">
                                {formatDate(reg.registered_at)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </CampLinkLayout>
    );
}
