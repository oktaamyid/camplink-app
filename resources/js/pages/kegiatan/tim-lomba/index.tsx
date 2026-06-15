/* eslint-disable @typescript-eslint/no-explicit-any */
import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Plus,
    Users,
    Crown,
    CheckCircle2,
    Clock,
    X,
    UserPlus,
    Trophy,
    ChevronRight,
} from 'lucide-react';
import { useState, FormEventHandler } from 'react';

interface User {
    id: number;
    name: string;
    email?: string;
}

interface Member {
    id: number;
    user_id: number;
    status: 'pending' | 'accepted' | 'rejected';
    message?: string;
    applied_at: string;
    user: User;
}

interface Team {
    id: number;
    name: string;
    leader_id: number;
    leader: User;
    accepted_members: Member[];
    pending_members: Member[];
    accepted_members_count: number;
    members: Member[];
}

interface Activity {
    id: number;
    title: string;
    category: { id: number; name: string };
    max_teams?: number;
    max_members_per_team?: number;
}

interface Props {
    activity: Activity;
    teams: Team[];
    myTeam: Team | null;
    myMembership: Member | null;
    isApprovedParticipant: boolean;
    isCreator: boolean;
}

export default function TimLombaIndex({ activity, teams, myTeam, myMembership, isApprovedParticipant, isCreator }: Props) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [processingMember, setProcessingMember] = useState<number | null>(null);

    const { data: createData, setData: setCreateData, post: postCreate, processing: createProcessing, errors: createErrors, reset: resetCreate } = useForm({ name: '' });

    const { data: applyData, setData: setApplyData, post: postApply, processing: applyProcessing, errors: applyErrors, reset: resetApply } = useForm({ message: '' });

    const handleCreate: FormEventHandler = (e) => {
        e.preventDefault();
        postCreate(route('kegiatan.tim-lomba.store', activity.id), {
            onSuccess: () => {
                setShowCreateModal(false);
                resetCreate();
            },
        });
    };

    const handleApply: FormEventHandler = (e) => {
        e.preventDefault();
        if (!selectedTeam) return;
        postApply(route('tim-lomba.apply', selectedTeam.id), {
            onSuccess: () => {
                setShowApplyModal(false);
                resetApply();
                setSelectedTeam(null);
            },
        });
    };

    const handleMemberStatus = (memberId: number, status: 'accepted' | 'rejected') => {
        setProcessingMember(memberId);
        router.patch(
            route('tim-lomba.member.update', memberId),
            { status },
            {
                preserveScroll: true,
                onFinish: () => setProcessingMember(null),
            },
        );
    };

    const canCreateTeam = isApprovedParticipant && !myTeam && (!activity.max_teams || teams.length < activity.max_teams);
    const myPendingApplication = !myTeam && teams.some((t) => t.members.some((m) => m.user_id === myMembership?.user_id && m.status === 'pending'));

    return (
        <CampLinkLayout>
            <Head title={`Tim Lomba — ${activity.title}`} />

            <div className="mb-4">
                <Link href={route('kegiatan.show', activity.id)} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft className="size-4" />
                    Kembali ke Kegiatan
                </Link>
            </div>

            {/* Header */}
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Trophy className="size-5 text-amber-500" />
                        <h1 className="text-2xl font-bold text-gray-900">Tim Lomba</h1>
                    </div>
                    <p className="text-sm text-gray-500">{activity.title}</p>
                    {activity.max_teams && (
                        <p className="mt-1 text-xs text-gray-400">
                            {teams.length} / {activity.max_teams} tim terbentuk
                            {activity.max_members_per_team && ` · Maks. ${activity.max_members_per_team} anggota/tim`}
                        </p>
                    )}
                </div>
                {canCreateTeam && (
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 rounded-lg bg-[#2F3E8F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#243070] transition-colors shrink-0"
                    >
                        <Plus className="size-4" />
                        Buat Tim Baru
                    </button>
                )}
            </div>

            {/* Creator overview banner */}
            {isCreator && (
                <div className="mb-6 rounded-xl border border-[#2F3E8F]/20 bg-[#2F3E8F]/5 p-4 flex items-center gap-3">
                    <Trophy className="size-5 text-[#2F3E8F] shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-[#2F3E8F]">Mode Pantau — Pembuat Kegiatan</p>
                        <p className="text-xs text-[#2F3E8F]/70 mt-0.5">
                            Anda melihat semua tim dan anggotanya. Hanya ketua tim yang dapat menyetujui permohonan masuk.
                        </p>
                    </div>
                </div>
            )}

            {/* My team status banner (participant) */}
            {!isCreator && myTeam && (
                <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-green-600 shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-green-800">Anda tergabung dalam tim "{myTeam.name}"</p>
                        {myTeam.leader_id === myMembership?.user_id && <p className="text-xs text-green-600 mt-0.5">Anda adalah ketua tim</p>}
                    </div>
                </div>
            )}

            {!isCreator && myPendingApplication && (
                <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-center gap-3">
                    <Clock className="size-5 text-amber-600 shrink-0" />
                    <p className="text-sm font-semibold text-amber-800">Permohonan bergabung ke tim sedang menunggu persetujuan ketua tim.</p>
                </div>
            )}

            {/* Teams list */}
            {teams.length === 0 ? (
                <div className="py-20 text-center rounded-xl border border-dashed border-gray-200">
                    <Trophy className="size-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-gray-500">Belum ada tim yang terbentuk.</p>
                    {canCreateTeam && (
                        <p className="text-xs text-gray-400 mt-1">Jadilah yang pertama membuat tim!</p>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {teams.map((team) => {
                        const isMyTeam = myTeam?.id === team.id;
                        const isTeamLeader = !isCreator && team.leader_id === myMembership?.user_id;
                        const isMember = team.members.some((m) => m.user_id === myMembership?.user_id && m.status === 'accepted');
                        const hasPendingApply = team.members.some((m) => m.user_id === myMembership?.user_id && m.status === 'pending');
                        const isFull = activity.max_members_per_team ? team.accepted_members_count >= activity.max_members_per_team : false;

                        return (
                            <div key={team.id} className={`rounded-xl border bg-white p-5 ${isMyTeam ? 'border-[#2F3E8F]/30 ring-1 ring-[#2F3E8F]/10' : 'border-gray-200'}`}>
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-base font-bold text-gray-900">{team.name}</h2>
                                            {isMyTeam && (
                                                <span className="rounded-full bg-[#2F3E8F]/10 px-2 py-0.5 text-xs font-medium text-[#2F3E8F]">Tim Saya</span>
                                            )}
                                            {isFull && (
                                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">Penuh</span>
                                            )}
                                        </div>
                                        <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                                            <Crown className="size-3.5 text-amber-500" />
                                            <span>Ketua: {team.leader.name}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="text-xs text-gray-500">
                                            <span className="font-semibold text-gray-900">{team.accepted_members_count}</span>
                                            {activity.max_members_per_team && `/${activity.max_members_per_team}`} anggota
                                        </span>

                                        {!isCreator && !myTeam && isApprovedParticipant && !hasPendingApply && !isFull && !isMember && (
                                            <button
                                                onClick={() => {
                                                    setSelectedTeam(team);
                                                    setShowApplyModal(true);
                                                }}
                                                className="flex items-center gap-1.5 rounded-lg bg-[#2F3E8F]/10 px-3 py-1.5 text-xs font-semibold text-[#2F3E8F] hover:bg-[#2F3E8F]/20 transition-colors"
                                            >
                                                <UserPlus className="size-3.5" />
                                                Bergabung
                                            </button>
                                        )}
                                        {!isCreator && hasPendingApply && (
                                            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">Menunggu</span>
                                        )}
                                        {isCreator && team.pending_members.length > 0 && (
                                            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                                                {team.pending_members.length} menunggu
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Accepted Members */}
                                {team.accepted_members.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {team.accepted_members.map((m) => (
                                            <div key={m.id} className="flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs">
                                                <div className="size-4 rounded-full bg-[#2F3E8F] flex items-center justify-center text-white text-[9px] font-bold">
                                                    {m.user.name.charAt(0)}
                                                </div>
                                                <span className="font-medium text-gray-700">{m.user.name}</span>
                                                {team.leader_id === m.user_id && <Crown className="size-3 text-amber-500" />}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-gray-400 italic">Belum ada anggota yang bergabung.</p>
                                )}

                                {/* Pending Applications — with action for team leader, read-only for creator */}
                                {team.pending_members.length > 0 && (isTeamLeader || isCreator) && (
                                    <div className="mt-4 border-t border-gray-100 pt-4">
                                        <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                                            Permohonan Masuk ({team.pending_members.length})
                                        </p>
                                        <div className="space-y-2">
                                            {team.pending_members.map((m) => (
                                                <div key={m.id} className="flex items-center justify-between gap-3 rounded-lg bg-amber-50 border border-amber-100 px-3 py-2">
                                                    <div className="min-w-0">
                                                        <p className="text-xs font-semibold text-gray-900 truncate">{m.user.name}</p>
                                                        {m.message && <p className="text-[11px] text-gray-500 truncate mt-0.5">"{m.message}"</p>}
                                                    </div>
                                                    {isTeamLeader ? (
                                                        <div className="flex gap-2 shrink-0">
                                                            <button
                                                                onClick={() => handleMemberStatus(m.id, 'accepted')}
                                                                disabled={processingMember === m.id}
                                                                className="flex items-center gap-1 rounded-lg bg-green-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                                                            >
                                                                <CheckCircle2 className="size-3" />
                                                                Terima
                                                            </button>
                                                            <button
                                                                onClick={() => handleMemberStatus(m.id, 'rejected')}
                                                                disabled={processingMember === m.id}
                                                                className="flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50"
                                                            >
                                                                <X className="size-3" />
                                                                Tolak
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        /* Creator: read-only badge */
                                                        <span className="shrink-0 rounded-full bg-amber-200 px-2.5 py-0.5 text-[10px] font-semibold text-amber-800">
                                                            Menunggu Ketua
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Create Team Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Buat Tim Baru</h2>
                            <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="size-5" />
                            </button>
                        </div>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">Nama Tim</label>
                                <input
                                    type="text"
                                    value={createData.name}
                                    onChange={(e) => setCreateData('name', e.target.value)}
                                    placeholder="Masukkan nama tim..."
                                    maxLength={100}
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#2F3E8F] focus:ring-2 focus:ring-[#2F3E8F]/20"
                                    required
                                />
                                {createErrors.name && <p className="mt-1 text-xs text-red-500">{createErrors.name}</p>}
                            </div>
                            <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 text-xs text-blue-700">
                                <Users className="inline size-3.5 mr-1" />
                                Anda akan otomatis menjadi ketua tim.
                                {activity.max_members_per_team && ` Maksimal ${activity.max_members_per_team} anggota per tim.`}
                            </div>
                            <button
                                type="submit"
                                disabled={createProcessing}
                                className="w-full rounded-lg bg-[#2F3E8F] px-4 py-3 text-sm font-semibold text-white hover:bg-[#243070] transition-colors disabled:opacity-50"
                            >
                                {createProcessing ? 'Membuat...' : 'Buat Tim'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Apply to Team Modal */}
            {showApplyModal && selectedTeam && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Bergabung ke Tim</h2>
                                <p className="text-sm text-gray-500 mt-0.5">{selectedTeam.name}</p>
                            </div>
                            <button onClick={() => { setShowApplyModal(false); setSelectedTeam(null); }} className="text-gray-400 hover:text-gray-600">
                                <X className="size-5" />
                            </button>
                        </div>
                        <form onSubmit={handleApply} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">Pesan ke Ketua Tim (Opsional)</label>
                                <textarea
                                    rows={3}
                                    value={applyData.message}
                                    onChange={(e) => setApplyData('message', e.target.value)}
                                    placeholder="Perkenalkan diri Anda atau ceritakan keahlian yang Anda bawa..."
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#2F3E8F] focus:ring-2 focus:ring-[#2F3E8F]/20"
                                />
                                {applyErrors.message && <p className="mt-1 text-xs text-red-500">{applyErrors.message}</p>}
                            </div>
                            <button
                                type="submit"
                                disabled={applyProcessing}
                                className="w-full rounded-lg bg-[#2F3E8F] px-4 py-3 text-sm font-semibold text-white hover:bg-[#243070] transition-colors disabled:opacity-50"
                            >
                                {applyProcessing ? 'Mengirim...' : 'Kirim Permohonan'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </CampLinkLayout>
    );
}
