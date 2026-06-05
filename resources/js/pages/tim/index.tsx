import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link, router, usePage, useForm } from '@inertiajs/react';
import { useState, FormEventHandler } from 'react';
import { ArrowLeft, Users, CheckCircle2, XCircle, FileText, MessageSquare, Lock, Unlock, UserMinus, Edit3, X, MoreVertical } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface TeamApplication {
    id: number;
    applicant_id: number;
    message: string;
    role: string;
    status: 'pending' | 'accepted' | 'rejected';
    applied_at: string;
    applicant: User;
}

interface TeamRecruitment {
    id: number;
    status: string;
    total_slots: number;
    filled_slots: number;
    description: string;
    skills_required: Array<{ title: string; quota: number }>;
    applications: TeamApplication[];
}

interface Activity {
    id: number;
    title: string;
    creator_id: number;
    creator: User;
}

interface Props {
    activity: Activity;
    recruitment: TeamRecruitment | null;
}

const avatarColors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-emerald-500',
    'bg-orange-500',
    'bg-rose-500',
    'bg-cyan-500',
];

export default function Tim({ activity, recruitment }: Props) {
    const { auth } = usePage().props as unknown as { auth?: { user?: User } };
    const currentUser = auth?.user;
    const isCreator = currentUser?.id === activity.creator_id;

    const [processing, setProcessing] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamApplication | null>(null);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    const { data: roleData, setData: setRoleData, patch: patchRole, processing: roleProcessing, reset: resetRole } = useForm({
        role: '',
    });

    const handleUpdateStatus = (applicationId: number, status: 'accepted' | 'rejected') => {
        if (!confirm(`Apakah Anda yakin ingin ${status === 'accepted' ? 'menerima' : 'menolak'} kandidat ini?`)) {
            return;
        }
        
        router.patch(`/aplikasi/${applicationId}/status`, { status }, {
            preserveScroll: true,
            onBefore: () => setProcessing(true),
            onFinish: () => setProcessing(false),
        });
    };

    const handleCloseRecruitment = () => {
        if (!recruitment) return;
        const action = recruitment.status === 'open' ? 'menutup' : 'membuka kembali';
        if (!confirm(`Apakah Anda yakin ingin ${action} rekrutmen tim?`)) return;

        router.patch(`/tim/${recruitment.id}/close`, {}, {
            preserveScroll: true,
        });
    };

    const handleRemoveMember = (applicationId: number, memberName: string) => {
        if (!confirm(`Apakah Anda yakin ingin mengeluarkan ${memberName} dari tim?`)) return;

        router.delete(`/aplikasi/${applicationId}/remove`, {
            preserveScroll: true,
        });
    };

    const openRoleModal = (member: TeamApplication) => {
        setEditingMember(member);
        setRoleData('role', member.role);
        setShowRoleModal(true);
        setOpenDropdown(null);
    };

    const handleRoleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!editingMember) return;

        patchRole(`/aplikasi/${editingMember.id}/role`, {
            preserveScroll: true,
            onSuccess: () => {
                setShowRoleModal(false);
                setEditingMember(null);
                resetRole();
            },
        });
    };

    if (!recruitment) {
        return (
            <CampLinkLayout>
                <Head title="Tim Kegiatan" />
                <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-6 text-center">
                    <Users className="mb-4 size-12 text-gray-300" />
                    <h2 className="text-lg font-semibold text-gray-900">Belum ada tim</h2>
                    <p className="mt-1 text-sm text-gray-500">Kegiatan ini belum membuka rekrutmen tim.</p>
                    <Link href={`/kegiatan/${activity.id}`} className="mt-4 rounded-lg bg-[#2F3E8F] px-4 py-2 text-sm font-medium text-white hover:bg-[#243070]">
                        Kembali ke Kegiatan
                    </Link>
                </div>
            </CampLinkLayout>
        );
    }

    const acceptedApplications = recruitment.applications.filter(a => a.status === 'accepted');
    const pendingApplications = recruitment.applications.filter(a => a.status === 'pending');

    const positions = recruitment.skills_required.map(skill => {
        const filled = acceptedApplications.filter(a => a.role === skill.title).length;
        return {
            ...skill,
            filled,
        };
    });

    return (
        <CampLinkLayout>
            <Head title={`Tim - ${activity.title}`} />

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
                    <h1 className="text-xl font-semibold text-gray-900">Tim Kolaborasi</h1>
                    <p className="mt-1 text-sm text-gray-500">{activity.title}</p>
                </div>
                {isCreator && (
                    <button
                        onClick={handleCloseRecruitment}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                            recruitment.status === 'open'
                                ? 'border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
                                : 'border border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
                        }`}
                    >
                        {recruitment.status === 'open' ? (
                            <>
                                <Lock className="size-4" />
                                Tutup Rekrutmen
                            </>
                        ) : (
                            <>
                                <Unlock className="size-4" />
                                Buka Rekrutmen
                            </>
                        )}
                    </button>
                )}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Members */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-gray-900">
                                Anggota Tim ({recruitment.filled_slots + 1}/{recruitment.total_slots + 1})
                            </h2>
                        </div>

                        {/* Progress bar */}
                        <div className="mb-5">
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                                <span>Kapasitas tim (termasuk ketua)</span>
                                <span>{recruitment.filled_slots + 1} dari {recruitment.total_slots + 1} anggota</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-gray-100">
                                <div
                                    className="h-2 rounded-full bg-[#2F3E8F] transition-all"
                                    style={{ width: `${Math.min(((recruitment.filled_slots + 1) / (recruitment.total_slots + 1)) * 100, 100)}%` }}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            {/* Leader */}
                            <div className="flex items-center justify-between rounded-lg bg-[#2F3E8F]/5 px-4 py-3 border border-[#2F3E8F]/10">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-9 items-center justify-center rounded-full bg-[#2F3E8F]">
                                        <span className="text-xs font-semibold text-white">
                                            {activity.creator.name.substring(0, 2).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium text-gray-900">{activity.creator.name}</p>
                                            <span className="rounded-full bg-[#2F3E8F] px-2 py-0.5 text-xs font-medium text-white">
                                                Ketua Tim
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500">Event Creator</p>
                                    </div>
                                </div>
                            </div>

                            {/* Accepted Members */}
                            {acceptedApplications.map((app, i) => (
                                <div
                                    key={app.id}
                                    className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`flex size-9 items-center justify-center rounded-full ${avatarColors[i % avatarColors.length]}`}>
                                            <span className="text-xs font-semibold text-white">
                                                {app.applicant.name.substring(0, 2).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{app.applicant.name}</p>
                                            <p className="text-xs text-gray-500">{app.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                                            <CheckCircle2 className="size-3" />
                                            Diterima
                                        </span>
                                        {currentUser?.id !== app.applicant_id && (
                                            <button 
                                                onClick={() => router.post('/pesan/mulai', { other_user_id: app.applicant_id })}
                                                className="p-1.5 text-gray-400 hover:text-[#2F3E8F] hover:bg-[#2F3E8F]/10 rounded-lg transition-colors"
                                                title="Kirim Pesan"
                                            >
                                                <MessageSquare className="size-4" />
                                            </button>
                                        )}
                                        {isCreator && (
                                            <div className="relative">
                                                <button
                                                    onClick={() => setOpenDropdown(openDropdown === app.id ? null : app.id)}
                                                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                    title="Opsi lainnya"
                                                >
                                                    <MoreVertical className="size-4" />
                                                </button>
                                                {openDropdown === app.id && (
                                                    <div className="absolute right-0 top-full mt-1 z-20 w-44 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                                                        <button
                                                            onClick={() => openRoleModal(app)}
                                                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <Edit3 className="size-3.5" />
                                                            Ubah Posisi
                                                        </button>
                                                        <button
                                                            onClick={() => handleRemoveMember(app.id, app.applicant.name)}
                                                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                        >
                                                            <UserMinus className="size-3.5" />
                                                            Keluarkan
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Open Positions */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h2 className="mb-4 text-sm font-semibold text-gray-900">Posisi yang Dibutuhkan</h2>
                        <div className="space-y-2">
                            {positions.map((pos, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-8 items-center justify-center rounded-lg bg-gray-100">
                                            <Users className="size-4 text-gray-400" />
                                        </div>
                                        <span className="text-sm text-gray-900">{pos.title}</span>
                                    </div>
                                    <span className={`text-xs font-medium ${pos.filled >= pos.quota ? 'text-green-600' : 'text-gray-500'}`}>
                                        {pos.filled}/{pos.quota} Terisi
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Join Requests (Only for Creator) */}
                    {isCreator && (
                        <div className="rounded-xl border border-gray-200 bg-white p-5">
                            <h2 className="mb-4 text-sm font-semibold text-gray-900">Permintaan Bergabung ({pendingApplications.length})</h2>
                            
                            {pendingApplications.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center py-4">Belum ada permintaan bergabung yang baru.</p>
                            ) : (
                                <div className="space-y-4">
                                    {pendingApplications.map((req, i) => (
                                        <div
                                            key={req.id}
                                            className="rounded-lg bg-gray-50 px-4 py-4"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`flex size-9 items-center justify-center rounded-full ${avatarColors[(i + 3) % avatarColors.length]}`}>
                                                        <span className="text-xs font-semibold text-white">
                                                            {req.applicant.name.substring(0, 2).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{req.applicant.name}</p>
                                                        <p className="text-xs font-medium text-[#2F3E8F]">{req.role}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button 
                                                        disabled={processing}
                                                        onClick={() => handleUpdateStatus(req.id, 'accepted')}
                                                        className="flex items-center gap-1 rounded-lg bg-[#2F3E8F] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#243070] transition-colors disabled:opacity-50"
                                                    >
                                                        <CheckCircle2 className="size-3.5" />
                                                        Terima
                                                    </button>
                                                    <button 
                                                        disabled={processing}
                                                        onClick={() => handleUpdateStatus(req.id, 'rejected')}
                                                        className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                                                    >
                                                        <XCircle className="size-3.5" />
                                                        Tolak
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-2 bg-white rounded-md p-3 border border-gray-100 text-sm text-gray-600">
                                                <div className="flex items-center gap-1.5 mb-1 text-gray-400">
                                                    <FileText className="size-3.5" />
                                                    <span className="text-xs uppercase font-semibold">Pesan Pengantar</span>
                                                </div>
                                                <p className="whitespace-pre-wrap">{req.message}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right sidebar */}
                <div className="space-y-4">
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h2 className="mb-3 text-sm font-semibold text-gray-900">Kegiatan</h2>
                        <p className="text-sm text-gray-700 font-medium leading-snug">{activity.title}</p>
                        <p className="text-xs text-gray-500 mt-2 line-clamp-2">{recruitment.description}</p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h2 className="mb-3 text-sm font-semibold text-gray-900">Statistik Tim</h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Status Rekrutmen</span>
                                <span className={`text-xs font-semibold uppercase ${recruitment.status === 'open' ? 'text-green-600' : 'text-gray-500'}`}>
                                    {recruitment.status === 'open' ? 'Terbuka' : 'Ditutup'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Total Anggota</span>
                                <span className="text-sm font-semibold text-gray-900">{recruitment.filled_slots + 1}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Posisi Terbuka</span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {Math.max(recruitment.total_slots - recruitment.filled_slots, 0)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Permintaan Pending</span>
                                <span className="text-sm font-semibold text-gray-900">{pendingApplications.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Update Role Modal */}
            {showRoleModal && editingMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">Ubah Posisi</h2>
                            <button onClick={() => { setShowRoleModal(false); setEditingMember(null); }} className="text-gray-400 hover:text-gray-600">
                                <X className="size-5" />
                            </button>
                        </div>

                        <p className="mb-4 text-sm text-gray-600">
                            Ubah posisi <span className="font-semibold text-gray-900">{editingMember.applicant.name}</span> dalam tim.
                        </p>

                        <form onSubmit={handleRoleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">Posisi Baru</label>
                                <select
                                    value={roleData.role}
                                    onChange={(e) => setRoleData('role', e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#2F3E8F] focus:ring-2 focus:ring-[#2F3E8F]/20"
                                    required
                                >
                                    <option value="" disabled>Pilih posisi...</option>
                                    {recruitment.skills_required.map((skill, idx) => (
                                        <option key={idx} value={skill.title}>{skill.title}</option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" disabled={roleProcessing} className="w-full rounded-lg bg-[#2F3E8F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#243070] transition-colors disabled:opacity-50">
                                {roleProcessing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </CampLinkLayout>
    );
}
