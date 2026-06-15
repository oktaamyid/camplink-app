/* eslint-disable @typescript-eslint/no-explicit-any */
import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Clock, CheckCircle2, XCircle, Users, Search, Filter } from 'lucide-react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    profile_pic?: string | null;
    major?: string;
    semester?: string;
}

interface Registration {
    id: number;
    status: 'pending' | 'approved' | 'rejected';
    registered_at: string;
    reviewed_at?: string;
    user: User;
}

interface Activity {
    id: number;
    title: string;
    category: { id: number; name: string };
}

interface Props {
    activity: Activity;
    registrations: Registration[];
}

const StatusBadge = ({ status }: { status: string }) => {
    const map: Record<string, { bg: string; text: string; label: string }> = {
        pending: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Menunggu' },
        approved: { bg: 'bg-green-100', text: 'text-green-700', label: 'Disetujui' },
        rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Ditolak' },
    };
    const s = map[status] ?? { bg: 'bg-gray-100', text: 'text-gray-600', label: status };
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${s.bg} ${s.text}`}>
            {s.label}
        </span>
    );
};

const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export default function Pendaftar({ activity, registrations }: Props) {
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [processing, setProcessing] = useState<number | null>(null);

    const filtered = registrations.filter((r) => {
        const matchSearch =
            r.user.name.toLowerCase().includes(search.toLowerCase()) ||
            r.user.email.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === 'all' || r.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const pendingCount = registrations.filter((r) => r.status === 'pending').length;
    const approvedCount = registrations.filter((r) => r.status === 'approved').length;

    const handleApprove = (registration: Registration) => {
        setProcessing(registration.id);
        router.post(
            route('kegiatan.registrasi.approve', { kegiatan: activity.id, registration: registration.id }),
            {},
            {
                preserveScroll: true,
                onFinish: () => setProcessing(null),
            },
        );
    };

    const handleReject = (registration: Registration) => {
        setProcessing(registration.id);
        router.post(
            route('kegiatan.registrasi.reject', { kegiatan: activity.id, registration: registration.id }),
            {},
            {
                preserveScroll: true,
                onFinish: () => setProcessing(null),
            },
        );
    };

    return (
        <CampLinkLayout>
            <Head title={`Pendaftar — ${activity.title}`} />

            <div className="mb-4">
                <Link href={route('kegiatan.show', activity.id)} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft className="size-4" />
                    Kembali ke Kegiatan
                </Link>
            </div>

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Kelola Pendaftar</h1>
                <p className="mt-1 text-sm text-gray-500">{activity.title}</p>
            </div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{registrations.length}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Total Pendaftar</p>
                </div>
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
                    <p className="text-2xl font-bold text-amber-700">{pendingCount}</p>
                    <p className="text-xs text-amber-600 mt-0.5">Menunggu</p>
                </div>
                <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center">
                    <p className="text-2xl font-bold text-green-700">{approvedCount}</p>
                    <p className="text-xs text-green-600 mt-0.5">Disetujui</p>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-4 flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari nama atau email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-white pl-9 pr-4 py-2 text-sm outline-none focus:border-[#2F3E8F] focus:ring-2 focus:ring-[#2F3E8F]/20"
                    />
                </div>
                <div className="relative flex items-center gap-2">
                    <Filter className="size-4 text-gray-400" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#2F3E8F] focus:ring-2 focus:ring-[#2F3E8F]/20"
                    >
                        <option value="all">Semua Status</option>
                        <option value="pending">Menunggu</option>
                        <option value="approved">Disetujui</option>
                        <option value="rejected">Ditolak</option>
                    </select>
                </div>
            </div>

            {/* List */}
            <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
                {filtered.length === 0 ? (
                    <div className="py-16 text-center">
                        <Users className="size-10 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-gray-500">Belum ada pendaftar yang ditemukan.</p>
                    </div>
                ) : (
                    filtered.map((reg) => (
                        <div key={reg.id} className="flex items-center justify-between gap-4 p-4">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#EEF1FA] text-[#2F3E8F] font-bold text-sm">
                                    {reg.user.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <Link href={route('profil.index', reg.user.id)} className="block text-sm font-semibold text-gray-900 hover:underline truncate">
                                        {reg.user.name}
                                    </Link>
                                    <p className="text-xs text-gray-500 truncate">{reg.user.email}</p>
                                    {(reg.user.major || reg.user.semester) && (
                                        <p className="text-xs text-gray-400 truncate">
                                            {reg.user.major} {reg.user.semester ? `· Sem. ${reg.user.semester}` : ''}
                                        </p>
                                    )}
                                    <div className="mt-1 flex items-center gap-1.5 text-[10px] text-gray-400">
                                        <Clock className="size-3" />
                                        <span>Mendaftar {formatDate(reg.registered_at)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-3">
                                <StatusBadge status={reg.status} />

                                {reg.status === 'pending' && (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleApprove(reg)}
                                            disabled={processing === reg.id}
                                            className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                                        >
                                            <CheckCircle2 className="size-3.5" />
                                            Setujui
                                        </button>
                                        <button
                                            onClick={() => handleReject(reg)}
                                            disabled={processing === reg.id}
                                            className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                                        >
                                            <XCircle className="size-3.5" />
                                            Tolak
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </CampLinkLayout>
    );
}
