import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import { ArrowLeft, MapPin, Calendar, Clock, Mail, Users, Plus, Trash2, X, MessageSquare, CheckCircle2, Bookmark, Star, ShieldCheck, Edit, Award, Download, Flag } from 'lucide-react';
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

interface ActivityReview {
    id: number;
    user_id: number;
    rating: number;
    review: string;
    is_anonymous: boolean;
    created_at: string;
    user: User;
}

interface TeamRecruitment {
    id: number;
    status: string;
    total_slots: number;
    filled_slots: number;
    description: string;
    skills_required: Array<{ title: string; quota: number }>;
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
    category: Category;
    creator: User;
    is_team_based?: boolean;
    recruitment?: TeamRecruitment;
    reviews: ActivityReview[];
}

interface Props {
    activity: Activity;
    userApplication?: any;
    userRegistration?: any;
    isBookmarked?: boolean;
    userReview?: ActivityReview | null;
    userCertificate?: { file_url: string; certificate_code: string } | null;
    stats: {
        averageRating: number;
        totalReviews: number;
    };
    participants?: Array<{ id: number; name: string; email: string }>;
}

function CategoryBadge({ category }: { category: string }) {
    const map: Record<string, { bg: string; text: string }> = {
        Lomba: { bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-700 dark:text-blue-400' },
        Seminar: { bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-700 dark:text-purple-400' },
        Workshop: { bg: 'bg-orange-50 dark:bg-orange-950/40', text: 'text-orange-700 dark:text-orange-400' },
        Penelitian: { bg: 'bg-green-50 dark:bg-green-950/40', text: 'text-green-700 dark:text-green-400' },
        Proyek: { bg: 'bg-rose-50 dark:bg-rose-950/40', text: 'text-rose-700 dark:text-rose-400' },
    };
    const colors = map[category] ?? { bg: 'bg-gray-100 dark:bg-slate-800', text: 'text-gray-600 dark:text-slate-400' };
    return (
        <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}>
            {category}
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

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop&auto=format';

export default function KegiatanDetail({ activity, userApplication, userRegistration, isBookmarked, userReview, userCertificate, stats, participants = [] }: Props) {
    const { auth } = usePage().props as any;
    const currentUser = auth?.user;
    const isCreator = currentUser?.id === activity.creator_id;
    const hasRecruitment = !!activity.recruitment;

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Form for reviews
    const { data: reviewData, setData: setReviewData, post: postReview, processing: reviewProcessing, errors: reviewErrors, reset: resetReview } = useForm({
        rating: 5,
        review: '',
        is_anonymous: false,
    });

    const handleReviewSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        postReview(`/kegiatan/${activity.id}/ulasan`, {
            onSuccess: () => {
                setShowReviewModal(false);
                resetReview();
            },
        });
    };

    // Form for reports
    const { data: reportData, setData: setReportData, post: postReport, processing: reportProcessing, errors: reportErrors, reset: resetReport } = useForm({
        reason: 'fake',
        details: '',
    });

    const handleReportSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        postReport(`/kegiatan/${activity.id}/report`, {
            onSuccess: () => {
                setShowReportModal(false);
                setShowSuccessAlert(true);
                setSuccessMessage('Laporan Anda telah berhasil dikirim dan akan segera ditinjau oleh admin.');
                resetReport();
                setTimeout(() => setShowSuccessAlert(false), 5000);
            },
        });
    };

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

    return (
        <CampLinkLayout>
            <Head title={activity.title} />

            <div className="mb-4">
                <Link href="/kegiatan" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft className="size-4" />
                    Kembali
                </Link>
            </div>

            {showSuccessAlert && (
                <div className="mb-4 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 shrink-0 text-green-600" />
                        <span>{successMessage}</span>
                    </div>
                    <button onClick={() => setShowSuccessAlert(false)} className="text-green-500 hover:text-green-700">
                        <X className="size-4" />
                    </button>
                </div>
            )}

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header */}
                    <div>
                        <div className="mb-3 flex items-start justify-between gap-4">
                            <h1 className="text-2xl font-bold text-gray-900">{activity.title}</h1>
                            {currentUser && (
                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.post(route('kegiatan.bookmark.toggle', activity.id), {}, { preserveScroll: true });
                                        }}
                                        className={`rounded-lg p-2.5 transition-colors border shadow-sm flex items-center justify-center ${
                                            isBookmarked 
                                                ? 'bg-blue-50 border-[#2F3E8F]/20 text-[#2F3E8F] hover:bg-blue-100' 
                                                : 'bg-white border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                        }`}
                                        title={isBookmarked ? "Hapus dari Simpanan" : "Simpan Kegiatan"}
                                    >
                                        <Bookmark className={`size-5 ${isBookmarked ? 'fill-current' : ''}`} />
                                    </button>

                                    {!isCreator && (
                                        <button
                                            onClick={() => setShowReportModal(true)}
                                            className="rounded-lg p-2.5 transition-colors border border-gray-200 bg-white text-gray-400 hover:text-red-600 hover:bg-red-50 shadow-sm flex items-center justify-center"
                                            title="Laporkan Kegiatan"
                                        >
                                            <Flag className="size-5" />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="mb-4">
                            <CategoryBadge category={activity.category?.name ?? 'Umum'} />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>Diselenggarakan oleh</span>
                            <Link href={route('profil.index', activity.creator_id)} className="font-semibold text-gray-900 hover:underline">
                                {activity.creator?.name ?? 'Anonim'}
                            </Link>
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

                    {/* Reviews Section */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-sm font-semibold text-gray-900">Ulasan & Rating</h2>
                                <div className="mt-1 flex items-center gap-2">
                                    <div className="flex items-center gap-0.5 text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`size-3.5 ${i < Math.round(stats.averageRating) ? 'fill-current' : 'text-gray-200'}`} />
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">{stats.averageRating}</span>
                                    <span className="text-xs text-gray-400">({stats.totalReviews} ulasan)</span>
                                </div>
                            </div>
                            
                            {userRegistration && !userReview && !isCreator && (
                                <button 
                                    onClick={() => setShowReviewModal(true)}
                                    className="rounded-lg border border-[#2F3E8F] px-4 py-2 text-xs font-semibold text-[#2F3E8F] hover:bg-[#2F3E8F]/5 transition-colors"
                                >
                                    Tulis Ulasan
                                </button>
                            )}
                        </div>

                        {activity.reviews.length > 0 ? (
                            <div className="space-y-6">
                                {activity.reviews.map((review) => (
                                    <div key={review.id} className="border-t border-gray-100 pt-4 first:border-t-0 first:pt-0">
                                        <div className="mb-2 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="flex size-7 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-500">
                                                    {review.is_anonymous ? 'A' : (review.user?.name ? review.user.name[0] : 'U')}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-900">
                                                        {review.is_anonymous ? 'Pengguna Anonim' : review.user?.name}
                                                    </p>
                                                    <div className="flex items-center gap-0.5 text-amber-400">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className={`size-2.5 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-[10px] text-gray-400">{formatDate(review.created_at)}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 italic">"{review.review}"</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-4 text-center text-sm text-gray-500 italic">
                                Belum ada ulasan untuk kegiatan ini.
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-4">
                    {/* Event Image */}
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                        <img src={activity.poster_url ?? FALLBACK_IMAGE} alt={activity.title} className="w-full h-44 object-cover" />
                    </div>

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
                                            {activity.recruitment?.skills_required?.map((skill, idx) => (
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
                    {!isCreator && activity.has_participants && (
                        <div className="rounded-xl border border-gray-200 bg-white p-5">
                            <h2 className="mb-3 text-sm font-semibold text-gray-900">Pendaftaran Peserta</h2>
                            
                            {userRegistration ? (
                                <div className="space-y-4">
                                    <div className="w-full text-center rounded-lg bg-emerald-100 px-4 py-2.5 text-sm font-semibold text-emerald-700">
                                        <span className="flex items-center justify-center gap-2">
                                            <CheckCircle2 className="size-4" />
                                            Terdaftar sebagai Peserta
                                        </span>
                                    </div>
                                    
                                    {userCertificate && (
                                        <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="rounded-full bg-indigo-100 p-2 text-indigo-600 shrink-0">
                                                    <Award className="size-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-indigo-900">Sertifikat Tersedia!</h3>
                                                    <p className="text-xs text-indigo-700 mt-1 mb-3">Selamat, Anda telah menerima sertifikat untuk kegiatan ini.</p>
                                                    <a 
                                                        href={userCertificate.file_url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
                                                    >
                                                        <Download className="size-3.5" />
                                                        Unduh Sertifikat
                                                    </a>
                                                    <p className="mt-2 text-[10px] text-indigo-400 font-mono">Kode: {userCertificate.certificate_code}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <p className="mb-4 text-sm text-gray-600">Anda dapat mendaftar sebagai peserta untuk mengikuti kegiatan ini.</p>
                                    <button 
                                        onClick={() => router.post(`/kegiatan/${activity.id}/daftar`)}
                                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
                                    >
                                        Daftar sebagai Peserta
                                    </button>
                                </>
                            )}
                        </div>
                    )}

                    {/* Organizer */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h2 className="mb-3 text-sm font-semibold text-gray-900">Pembuat Kegiatan</h2>
                        <div className="flex items-center gap-3">
                            <Link href={route('profil.index', activity.creator_id)} className="flex size-10 items-center justify-center rounded-full bg-[#2F3E8F] text-white hover:opacity-90 transition-opacity">
                                <span className="text-sm font-semibold">
                                    {activity.creator?.name ? activity.creator.name.substring(0, 2).toUpperCase() : 'U'}
                                </span>
                            </Link>
                            <div>
                                <Link href={route('profil.index', activity.creator_id)} className="text-sm font-semibold text-gray-900 hover:underline block">
                                    {activity.creator?.name ?? 'Anonim'}
                                </Link>
                                <p className="text-xs text-gray-500">Mahasiswa</p>
                            </div>
                        </div>

                        {isCreator && (
                            <>
                                <Link
                                    href={route('kegiatan.edit', activity.id)}
                                    className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <Edit className="size-4" />
                                    Edit
                                </Link>
                                <Link
                                    href={route('kegiatan.sertifikat.manage', activity.id)}
                                    className="mt-2 w-full flex items-center justify-center gap-2 rounded-lg border border-[#2F3E8F]/20 bg-[#2F3E8F]/5 px-4 py-2 text-sm font-semibold text-[#2F3E8F] hover:bg-[#2F3E8F]/10 transition-colors"
                                >
                                    <Award className="size-4" />
                                    Kelola Sertifikat
                                </Link>
                            </>
                        )}

                        {!isCreator && (
                            <>
                                <button 
                                    onClick={() => router.post('/pesan/mulai', { user_id: activity.creator_id })} 
                                    className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg border border-[#2F3E8F]/20 bg-[#2F3E8F]/5 text-[#2F3E8F] px-4 py-2 text-sm font-medium hover:bg-[#2F3E8F]/10 transition-colors"
                                >
                                    <MessageSquare className="size-4" />
                                    Kirim Pesan
                                </button>

                                {currentUser && (
                                    <button 
                                        onClick={() => setShowReportModal(true)}
                                        className="mt-2 w-full flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50/50 text-red-600 px-4 py-2 text-sm font-medium hover:bg-red-50 transition-colors"
                                    >
                                        <Flag className="size-4" />
                                        Laporkan Kegiatan
                                    </button>
                                )}
                            </>
                        )}
                        
                        {(isCreator || (userApplication && userApplication.status === 'accepted')) && activity.recruitment && (
                            <Link 
                                href={route('pesan.index', { team_recruitment_id: activity.recruitment.id })}
                                className="mt-2 w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm"
                            >
                                <Users className="size-4" />
                                Chat Tim
                            </Link>
                        )}
                    </div>

                    {/* Participants List */}
                    {activity.has_participants && (
                        <div className="rounded-xl border border-gray-200 bg-white p-5">
                            <h2 className="mb-3 text-sm font-semibold text-[#111111]">
                                Peserta Terdaftar ({participants.length})
                            </h2>
                            {participants.length === 0 ? (
                                <p className="text-xs text-gray-500 italic py-2">Belum ada peserta yang mendaftar.</p>
                            ) : (
                                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                                    {participants.map((p) => (
                                        <div key={p.id} className="flex items-center gap-3">
                                            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#EEF1FA] text-[#2F3E8F] font-bold text-xs">
                                                {p.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <Link 
                                                    href={route('profil.index', p.id)} 
                                                    className="block text-xs font-semibold text-gray-900 hover:underline truncate"
                                                >
                                                    {p.name}
                                                </Link>
                                                <p className="text-[10px] text-gray-500 truncate">{p.email}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

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
                                    {activity.recruitment?.skills_required?.map((skill, idx) => (
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
            {/* Review Modal */}
            {showReviewModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Berikan Ulasan</h2>
                            <button onClick={() => setShowReviewModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="size-5" />
                            </button>
                        </div>

                        <form onSubmit={handleReviewSubmit} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">Rating</label>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setReviewData('rating', star)}
                                            className={`p-1 transition-transform hover:scale-110 ${star <= reviewData.rating ? 'text-amber-400' : 'text-gray-200'}`}
                                        >
                                            <Star className={`size-8 ${star <= reviewData.rating ? 'fill-current' : ''}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">Ulasan Anda</label>
                                <textarea
                                    rows={4}
                                    value={reviewData.review}
                                    onChange={(e) => setReviewData('review', e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#2F3E8F] focus:ring-2 focus:ring-[#2F3E8F]/20"
                                    placeholder="Ceritakan pengalaman Anda mengikuti kegiatan ini..."
                                />
                                {reviewErrors.review && <p className="mt-1 text-xs text-red-500">{reviewErrors.review}</p>}
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_anonymous"
                                    checked={reviewData.is_anonymous}
                                    onChange={(e) => setReviewData('is_anonymous', e.target.checked)}
                                    className="size-4 rounded border-gray-300 text-[#2F3E8F] focus:ring-[#2F3E8F]"
                                />
                                <label htmlFor="is_anonymous" className="text-sm text-gray-600">Berikan ulasan secara anonim</label>
                            </div>

                            <button type="submit" disabled={reviewProcessing} className="mt-4 w-full rounded-lg bg-[#2F3E8F] px-4 py-3 text-sm font-semibold text-white hover:bg-[#243070] transition-colors disabled:opacity-50">
                                {reviewProcessing ? 'Mengirim...' : 'Kirim Ulasan'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Report Modal */}
            {showReportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Flag className="size-5 text-red-600 shrink-0" />
                                Laporkan Kegiatan
                            </h2>
                            <button onClick={() => setShowReportModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X className="size-5" />
                            </button>
                        </div>

                        <form onSubmit={handleReportSubmit} className="space-y-4">
                            <p className="text-sm text-gray-500">
                                Apakah menurut Anda kegiatan ini melanggar ketentuan, palsu, duplikat, atau memiliki informasi yang salah? Silakan laporkan di bawah ini. Laporan Anda akan ditinjau oleh tim admin.
                            </p>

                            <div>
                                <label className="mb-1.5 block text-sm font-semibold text-gray-700">Alasan Laporan</label>
                                <select
                                    value={reportData.reason}
                                    onChange={(e) => setReportData('reason', e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                    required
                                >
                                    <option value="fake">Kegiatan Palsu / Penipuan</option>
                                    <option value="duplicate">Kegiatan Duplikat</option>
                                    <option value="wrong_info">Informasi Salah / Keliru</option>
                                    <option value="other">Lainnya</option>
                                </select>
                                {reportErrors.reason && <p className="mt-1 text-xs text-red-500">{reportErrors.reason}</p>}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-semibold text-gray-700">Detail Laporan (Opsional)</label>
                                <textarea
                                    rows={4}
                                    value={reportData.details}
                                    onChange={(e) => setReportData('details', e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                                    placeholder="Jelaskan detail laporan Anda secara singkat (maksimal 500 karakter)..."
                                    maxLength={500}
                                />
                                {reportErrors.details && <p className="mt-1 text-xs text-red-500">{reportErrors.details}</p>}
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowReportModal(false)}
                                    className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={reportProcessing}
                                    className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                                >
                                    {reportProcessing ? 'Mengirim...' : 'Kirim Laporan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </CampLinkLayout>
    );
}
