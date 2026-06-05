import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import { ArrowLeft, MapPin, Calendar, Clock, Mail, Users, Plus, Trash2, X, MessageSquare, CheckCircle2, Edit3, AlertTriangle, Eye, Lock, Unlock, Megaphone } from 'lucide-react';
import { useState, FormEventHandler } from 'react';

interface Category {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface TeamRecruitment {
    id: number;
    status: string;
    total_slots: number;
    filled_slots: number;
    description: string;
    skills_required: Array<{ title: string; quota: number }>;
}

interface Announcement {
    id: number;
    title: string;
    content: string;
    created_at: string;
    creator: User;
}

interface Activity {
    id: number;
    title: string;
    category_id: number;
    creator_id: number;
    location: string | null;
    event_date: string | null;
    deadline_date: string | null;
    description: string;
    poster_url: string | null;
    status: string;
    category: Category;
    creator: User;
    is_team_based?: boolean;
    recruitment?: TeamRecruitment;
    announcements?: Announcement[];
}

interface Props {
    activity: Activity;
    userApplication?: any;
    userRegistration?: any;
    participantCount?: number;
}

function CategoryBadge({ category }: { category: string }) {
    const map: Record<string, { bg: string; text: string }> = {
        Lomba: { bg: 'bg-blue-50', text: 'text-blue-700' },
        Seminar: { bg: 'bg-purple-50', text: 'text-purple-700' },
        Workshop: { bg: 'bg-orange-50', text: 'text-orange-700' },
        Penelitian: { bg: 'bg-green-50', text: 'text-green-700' },
        Proyek: { bg: 'bg-rose-50', text: 'text-rose-700' },
    };
    const colors = map[category] ?? { bg: 'bg-gray-100', text: 'text-gray-600' };
    return (
        <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}>
            {category}
        </span>
    );
}

function StatusBadge({ status }: { status: string }) {
    const map: Record<string, { bg: string; text: string; label: string }> = {
        active: { bg: 'bg-green-50', text: 'text-green-700', label: 'Aktif' },
        draft: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Draft (Pendaftaran Ditutup)' },
        completed: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Selesai' },
        cancelled: { bg: 'bg-red-50', text: 'text-red-700', label: 'Dibatalkan' },
    };
    const colors = map[status] ?? { bg: 'bg-gray-100', text: 'text-gray-600', label: status };
    return (
        <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}>
            {colors.label}
        </span>
    );
}

const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop&auto=format';

export default function KegiatanDetail({ activity, userApplication, userRegistration, participantCount = 0 }: Props) {
    const { auth } = usePage().props as any;
    const currentUser = auth?.user;
    const isCreator = currentUser?.id === activity.creator_id;
    const hasRecruitment = !!activity.recruitment;

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

    // Form for creating recruitment
    const { data: createData, setData: setCreateData, post: postCreate, processing: createProcessing, errors: createErrors, reset: resetCreate } = useForm({
        description: '',
        total_slots: 1,
        skills_required: [{ title: '', quota: 1 }],
    });

    const handleCreateSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        postCreate(`/kegiatan/${activity.id}/tim`, {
            onSuccess: () => {
                setShowCreateModal(false);
                resetCreate();
            },
        });
    };

    const addSkill = () => {
        setCreateData('skills_required', [...createData.skills_required, { title: '', quota: 1 }]);
    };

    const removeSkill = (index: number) => {
        setCreateData('skills_required', createData.skills_required.filter((_, i) => i !== index));
    };

    // Form for applying
    const { data: applyData, setData: setApplyData, post: postApply, processing: applyProcessing, errors: applyErrors, reset: resetApply } = useForm({
        role: '',
        message: '',
    });

    const handleApplySubmit: FormEventHandler = (e) => {
        e.preventDefault();
        postApply(`/tim/${activity.recruitment?.id}/apply`, {
            onSuccess: () => {
                setShowApplyModal(false);
                resetApply();
            },
        });
    };

    // Form for announcement
    const { data: announcementData, setData: setAnnouncementData, post: postAnnouncement, processing: announcementProcessing, errors: announcementErrors, reset: resetAnnouncement } = useForm({
        title: '',
        content: '',
    });

    const handleAnnouncementSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        postAnnouncement(`/kegiatan/${activity.id}/pengumuman`, {
            onSuccess: () => {
                setShowAnnouncementModal(false);
                resetAnnouncement();
            },
        });
    };

    const handleDelete = () => {
        router.delete(`/kegiatan/${activity.id}`, {
            onSuccess: () => setShowDeleteConfirm(false),
        });
    };

    const handleToggleRegistration = () => {
        router.post(`/kegiatan/${activity.id}/toggle-registration`, {}, {
            preserveScroll: true,
        });
    };

    return (
        <CampLinkLayout>
            <Head title={activity.title} />

            <div className="mb-4 flex items-center justify-between">
                <Link href="/kegiatan" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft className="size-4" />
                    Kembali
                </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header */}
                    <div>
                        <div className="mb-3 flex items-start justify-between gap-4">
                            <h1 className="text-2xl font-bold text-gray-900">{activity.title}</h1>
                        </div>
                        <div className="mb-4 flex items-center gap-2 flex-wrap">
                            <CategoryBadge category={activity.category?.name ?? 'Umum'} />
                            <StatusBadge status={activity.status} />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>Diselenggarakan oleh</span>
                            <span className="font-semibold text-gray-900">{activity.creator?.name ?? 'Anonim'}</span>
                        </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-6 rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="size-4 text-gray-400" />
                            <span>{formatDate(activity.event_date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="size-4 text-gray-400" />
                            <span>{activity.location ?? '-'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="size-4 text-gray-400" />
                            <span>Pendaftaran hingga {formatDate(activity.deadline_date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Users className="size-4 text-gray-400" />
                            <span>{participantCount} Peserta terdaftar</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h2 className="mb-3 text-sm font-semibold text-gray-900">Deskripsi</h2>
                        <div className="text-sm leading-relaxed text-gray-600 whitespace-pre-wrap">{activity.description}</div>
                    </div>

                    {/* Details */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4">
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Kategori</h3>
                            <p className="text-sm text-gray-900">{activity.category?.name ?? 'Umum'}</p>
                        </div>
                        <div className="border-t border-gray-100" />
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Kontak Pembuat</h3>
                            <a href={`mailto:${activity.creator?.email}`} className="flex items-center gap-1.5 text-sm text-[#2F3E8F] hover:underline">
                                <Mail className="size-3.5" />
                                {activity.creator?.email ?? '-'}
                            </a>
                        </div>
                    </div>

                    {/* Announcements Section */}
                    {(activity.announcements && activity.announcements.length > 0 || isCreator) && (
                        <div className="rounded-xl border border-gray-200 bg-white p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                    <Megaphone className="size-4 text-[#2F3E8F]" />
                                    Pengumuman
                                </h2>
                                {isCreator && (
                                    <button
                                        onClick={() => setShowAnnouncementModal(true)}
                                        className="flex items-center gap-1.5 rounded-lg bg-[#2F3E8F] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#243070] transition-colors"
                                    >
                                        <Plus className="size-3.5" />
                                        Buat Pengumuman
                                    </button>
                                )}
                            </div>

                            {activity.announcements && activity.announcements.length > 0 ? (
                                <div className="space-y-3">
                                    {activity.announcements.map((announcement) => (
                                        <div key={announcement.id} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="text-sm font-semibold text-gray-900">{announcement.title}</h3>
                                                <span className="text-xs text-gray-400 shrink-0 ml-3">{formatDateTime(announcement.created_at)}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 whitespace-pre-wrap">{announcement.content}</p>
                                            <p className="mt-2 text-xs text-gray-400">oleh {announcement.creator.name}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 text-center py-4">Belum ada pengumuman.</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Sidebar */}
                <div className="space-y-4">
                    {/* Event Image */}
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                        <img src={activity.poster_url ?? FALLBACK_IMAGE} alt={activity.title} className="w-full h-44 object-cover" />
                    </div>

                    {/* Creator Actions */}
                    {isCreator && activity.status !== 'cancelled' && (
                        <div className="rounded-xl border border-gray-200 bg-white p-5">
                            <h2 className="mb-3 text-sm font-semibold text-gray-900">Kelola Kegiatan</h2>
                            <div className="space-y-2">
                                <Link
                                    href={`/kegiatan/${activity.id}/edit`}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2F3E8F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#243070] transition-colors"
                                >
                                    <Edit3 className="size-4" />
                                    Edit Kegiatan
                                </Link>
                                <Link
                                    href={`/kegiatan/${activity.id}/peserta`}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#2F3E8F]/20 bg-[#2F3E8F]/5 px-4 py-2.5 text-sm font-medium text-[#2F3E8F] hover:bg-[#2F3E8F]/10 transition-colors"
                                >
                                    <Eye className="size-4" />
                                    Lihat Peserta ({participantCount})
                                </Link>
                                <button
                                    onClick={handleToggleRegistration}
                                    className={`flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                                        activity.status === 'active'
                                            ? 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
                                            : 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
                                    }`}
                                >
                                    {activity.status === 'active' ? (
                                        <>
                                            <Lock className="size-4" />
                                            Tutup Pendaftaran
                                        </>
                                    ) : (
                                        <>
                                            <Unlock className="size-4" />
                                            Buka Pendaftaran
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
                                >
                                    <Trash2 className="size-4" />
                                    Batalkan Kegiatan
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Team Info */}
                    {activity.is_team_based && (
                        <div className="rounded-xl border border-gray-200 bg-white p-5">
                            <h2 className="mb-4 text-sm font-semibold text-gray-900">Informasi Tim</h2>
                            
                            {isCreator ? (
                                <>
                                    {hasRecruitment ? (
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Status</span>
                                                <span className="font-semibold text-green-600 uppercase">{activity.recruitment?.status}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Kuota Terisi</span>
                                                <span className="font-semibold text-gray-900">{activity.recruitment?.filled_slots} / {activity.recruitment?.total_slots}</span>
                                            </div>
                                            <Link href={`/kegiatan/${activity.id}/tim`} className="mt-4 block w-full text-center rounded-lg bg-[#2F3E8F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#243070] transition-colors">
                                                Kelola Tim
                                            </Link>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="mb-4 text-sm text-gray-600">Anda dapat membuka rekrutmen anggota tim untuk kegiatan ini.</p>
                                            <button onClick={() => setShowCreateModal(true)} className="w-full rounded-lg bg-[#2F3E8F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#243070] transition-colors">
                                                Buka Rekrutmen
                                            </button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    {hasRecruitment ? (
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-sm mb-2">
                                                <span className="text-gray-600">Kuota Terisi</span>
                                                <span className="font-semibold text-gray-900">{activity.recruitment?.filled_slots} / {activity.recruitment?.total_slots}</span>
                                            </div>
                                            {activity.recruitment?.skills_required.map((skill, idx) => (
                                                <div key={idx} className="flex justify-between items-center rounded bg-gray-50 p-2 text-xs">
                                                    <span className="font-medium text-gray-800">{skill.title}</span>
                                                    <span className="text-gray-500">Kebutuhan: {skill.quota}</span>
                                                </div>
                                            ))}
                                            
                                            {userApplication ? (
                                                <div className={`mt-4 w-full text-center rounded-lg px-4 py-2.5 text-sm font-semibold ${
                                                    userApplication.status === 'accepted' ? 'bg-green-100 text-green-700' : 
                                                    userApplication.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                                                    'bg-amber-100 text-amber-700'
                                                }`}>
                                                    Status Lamaran: <span className="uppercase">{userApplication.status}</span>
                                                </div>
                                            ) : (
                                                <button onClick={() => setShowApplyModal(true)} disabled={activity.recruitment?.status !== 'open' || activity.recruitment?.filled_slots >= activity.recruitment?.total_slots} className="mt-4 w-full rounded-lg bg-[#2F3E8F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#243070] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                                    Gabung Tim
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
                                            <Users className="size-4 text-gray-400" />
                                            <span>Belum ada rekrutmen terbuka.</span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                    
                    {/* Participant Registration (for all activities) */}
                    {!isCreator && (
                        <div className="rounded-xl border border-gray-200 bg-white p-5">
                            <h2 className="mb-3 text-sm font-semibold text-gray-900">Pendaftaran Peserta</h2>
                            <p className="mb-4 text-sm text-gray-600">Anda dapat mendaftar sebagai peserta untuk mengikuti kegiatan ini.</p>
                            
                            {userRegistration ? (
                                <div className="w-full text-center rounded-lg bg-emerald-100 px-4 py-2.5 text-sm font-semibold text-emerald-700">
                                    <span className="flex items-center justify-center gap-2">
                                        <CheckCircle2 className="size-4" />
                                        Terdaftar sebagai Peserta
                                    </span>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => router.post(`/kegiatan/${activity.id}/daftar`)}
                                    disabled={activity.status !== 'active'}
                                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Daftar sebagai Peserta
                                </button>
                            )}
                        </div>
                    )}

                    {/* Organizer */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h2 className="mb-3 text-sm font-semibold text-gray-900">Pembuat Kegiatan</h2>
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-[#2F3E8F]">
                                <span className="text-sm font-semibold text-white">
                                    {activity.creator?.name ? activity.creator.name.substring(0, 2).toUpperCase() : 'U'}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{activity.creator?.name ?? 'Anonim'}</p>
                                <p className="text-xs text-gray-500">Mahasiswa</p>
                            </div>
                        </div>

                        {!isCreator && (
                            <button 
                                onClick={() => router.post('/pesan/mulai', { other_user_id: activity.creator_id })} 
                                className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg border border-[#2F3E8F]/20 bg-[#2F3E8F]/5 text-[#2F3E8F] px-4 py-2 text-sm font-medium hover:bg-[#2F3E8F]/10 transition-colors"
                            >
                                <MessageSquare className="size-4" />
                                Kirim Pesan
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-red-100">
                                <AlertTriangle className="size-5 text-red-600" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">Batalkan Kegiatan?</h2>
                        </div>
                        <p className="mb-6 text-sm text-gray-600">
                            Kegiatan ini akan dibatalkan dan tidak bisa diakses oleh peserta lagi. Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
                            >
                                Ya, Batalkan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Recruitment Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Buka Rekrutmen Tim</h2>
                            <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="size-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">Total Slot Anggota</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={createData.total_slots}
                                    onChange={(e) => setCreateData('total_slots', parseInt(e.target.value))}
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#2F3E8F] focus:ring-2 focus:ring-[#2F3E8F]/20"
                                    required
                                />
                                {createErrors.total_slots && <p className="mt-1 text-xs text-red-500">{createErrors.total_slots}</p>}
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">Deskripsi (Opsional)</label>
                                <textarea
                                    rows={3}
                                    value={createData.description}
                                    onChange={(e) => setCreateData('description', e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#2F3E8F] focus:ring-2 focus:ring-[#2F3E8F]/20"
                                    placeholder="Ceritakan proyek ini secara singkat..."
                                />
                            </div>
                            
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">Kebutuhan Posisi & Skill</label>
                                {createData.skills_required.map((skill, index) => (
                                    <div key={index} className="flex items-center gap-3 mb-3">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                placeholder="Posisi (Contoh: Backend, UI/UX)"
                                                value={skill.title}
                                                onChange={(e) => {
                                                    const newSkills = [...createData.skills_required];
                                                    newSkills[index].title = e.target.value;
                                                    setCreateData('skills_required', newSkills);
                                                }}
                                                className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none transition-all focus:border-[#2F3E8F] focus:ring-2 focus:ring-[#2F3E8F]/20"
                                                required
                                            />
                                        </div>
                                        <div className="w-24">
                                            <input
                                                type="number"
                                                min="1"
                                                value={skill.quota}
                                                onChange={(e) => {
                                                    const newSkills = [...createData.skills_required];
                                                    newSkills[index].quota = parseInt(e.target.value);
                                                    setCreateData('skills_required', newSkills);
                                                }}
                                                className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none transition-all focus:border-[#2F3E8F] focus:ring-2 focus:ring-[#2F3E8F]/20"
                                                required
                                            />
                                        </div>
                                        {createData.skills_required.length > 1 && (
                                            <button type="button" onClick={() => removeSkill(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                                <Trash2 className="size-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button type="button" onClick={addSkill} className="mt-1 flex items-center gap-1.5 text-sm font-medium text-[#2F3E8F] hover:underline">
                                    <Plus className="size-4" /> Tambah Posisi
                                </button>
                            </div>

                            <button type="submit" disabled={createProcessing} className="mt-4 w-full rounded-lg bg-[#2F3E8F] px-4 py-3 text-sm font-semibold text-white hover:bg-[#243070] transition-colors disabled:opacity-50">
                                {createProcessing ? 'Memproses...' : 'Simpan & Buka Rekrutmen'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Apply Recruitment Modal */}
            {showApplyModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Gabung ke Tim</h2>
                            <button onClick={() => setShowApplyModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="size-5" />
                            </button>
                        </div>

                        <form onSubmit={handleApplySubmit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">Posisi yang Dilamar</label>
                                <select
                                    value={applyData.role}
                                    onChange={(e) => setApplyData('role', e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#2F3E8F] focus:ring-2 focus:ring-[#2F3E8F]/20"
                                    required
                                >
                                    <option value="" disabled>Pilih posisi...</option>
                                    {activity.recruitment?.skills_required.map((skill, idx) => (
                                        <option key={idx} value={skill.title}>{skill.title} (Kuota: {skill.quota})</option>
                                    ))}
                                </select>
                                {applyErrors.role && <p className="mt-1 text-xs text-red-500">{applyErrors.role}</p>}
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">Pesan Pengantar</label>
                                <textarea
                                    rows={4}
                                    value={applyData.message}
                                    onChange={(e) => setApplyData('message', e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#2F3E8F] focus:ring-2 focus:ring-[#2F3E8F]/20"
                                    placeholder="Jelaskan alasan dan pengalaman Anda mengapa cocok di posisi ini..."
                                    required
                                />
                                {applyErrors.message && <p className="mt-1 text-xs text-red-500">{applyErrors.message}</p>}
                            </div>
                            
                            <button type="submit" disabled={applyProcessing} className="mt-4 w-full rounded-lg bg-[#2F3E8F] px-4 py-3 text-sm font-semibold text-white hover:bg-[#243070] transition-colors disabled:opacity-50">
                                {applyProcessing ? 'Mengirim...' : 'Kirim Permintaan'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Announcement Modal */}
            {showAnnouncementModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Buat Pengumuman</h2>
                            <button onClick={() => setShowAnnouncementModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="size-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">Judul Pengumuman</label>
                                <input
                                    type="text"
                                    value={announcementData.title}
                                    onChange={(e) => setAnnouncementData('title', e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#2F3E8F] focus:ring-2 focus:ring-[#2F3E8F]/20"
                                    placeholder="Masukkan judul pengumuman..."
                                    required
                                />
                                {announcementErrors.title && <p className="mt-1 text-xs text-red-500">{announcementErrors.title}</p>}
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">Isi Pengumuman</label>
                                <textarea
                                    rows={5}
                                    value={announcementData.content}
                                    onChange={(e) => setAnnouncementData('content', e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#2F3E8F] focus:ring-2 focus:ring-[#2F3E8F]/20"
                                    placeholder="Tulis isi pengumuman..."
                                    required
                                />
                                {announcementErrors.content && <p className="mt-1 text-xs text-red-500">{announcementErrors.content}</p>}
                            </div>
                            
                            <button type="submit" disabled={announcementProcessing} className="mt-4 w-full rounded-lg bg-[#2F3E8F] px-4 py-3 text-sm font-semibold text-white hover:bg-[#243070] transition-colors disabled:opacity-50">
                                {announcementProcessing ? 'Menyimpan...' : 'Publikasikan Pengumuman'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </CampLinkLayout>
    );
}
