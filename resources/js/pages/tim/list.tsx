import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link } from '@inertiajs/react';
import { Users, Clock, CheckCircle2, XCircle, ArrowRight, Activity as ActivityIcon } from 'lucide-react';


interface TeamRecruitment {
    id: number;
    activity_id: number;
    description: string;
    skills_required: any;
    total_slots: number;
    filled_slots: number;
    status: string;
    pending_count?: number;
    accepted_count?: number;
}

interface Activity {
    id: number;
    title: string;
    creator_id: number;
    recruitment: TeamRecruitment | null;
    creator?: {
        id: number;
        name: string;
    };
}

interface TeamApplication {
    id: number;
    applicant_id: number;
    recruitment_id: number;
    message: string;
    role: string;
    status: 'pending' | 'accepted' | 'rejected';
    created_at: string;
    recruitment: {
        id: number;
        activity: Activity;
    };
}

interface Props {
    managedTeams: Activity[];
    myApplications: TeamApplication[];
}

export default function TimList({ managedTeams, myApplications }: Props) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'accepted':
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                        <CheckCircle2 className="size-3.5" />
                        Diterima
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                        <XCircle className="size-3.5" />
                        Ditolak
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-700">
                        <Clock className="size-3.5" />
                        Menunggu
                    </span>
                );
        }
    };

    return (
        <CampLinkLayout>
            <Head title="Tim Saya" />

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Tim Saya</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Kelola tim dari kegiatan Anda atau lihat status lamaran Anda di tim lain.
                </p>
            </div>

            <div className="space-y-10">
                {/* Section: Tim yang Dikelola */}
                <section>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Users className="size-5 text-[#2F3E8F]" />
                            Tim yang Anda Kelola
                        </h2>
                    </div>

                    {managedTeams.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-12 text-center">
                            <ActivityIcon className="mb-3 size-10 text-gray-400" />
                            <p className="text-sm font-medium text-gray-900">Belum ada tim yang Anda kelola</p>
                            <p className="mt-1 text-xs text-gray-500">Anda belum membuka rekrutmen tim di kegiatan apapun.</p>
                            <Link href="/kegiatan/buat" className="mt-4 rounded-lg bg-[#2F3E8F] px-4 py-2 text-sm font-medium text-white hover:bg-[#243070]">
                                Buat Kegiatan Baru
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {managedTeams.map((activity) => (
                                <Link 
                                    key={activity.id} 
                                    href={`/kegiatan/${activity.id}/tim`}
                                    className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
                                >
                                    <div className="mb-4 flex-1">
                                        <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-[#2F3E8F] transition-colors">
                                            {activity.title}
                                        </h3>
                                        <div className="mt-2 text-sm text-gray-500 space-y-1">
                                            <p className="flex justify-between">
                                                <span>Anggota Terisi:</span>
                                                <span className="font-medium text-gray-900">{activity.recruitment?.filled_slots} / {activity.recruitment?.total_slots}</span>
                                            </p>
                                            <p className="flex justify-between">
                                                <span>Status Rekrutmen:</span>
                                                <span className="font-medium text-gray-900 capitalize">{activity.recruitment?.status}</span>
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                                        <div className="flex items-center gap-2">
                                            {activity.recruitment?.pending_count && activity.recruitment.pending_count > 0 ? (
                                                <span className="inline-flex h-6 items-center rounded-full bg-blue-50 px-2.5 text-xs font-medium text-blue-700">
                                                    {activity.recruitment.pending_count} Lamaran Baru
                                                </span>
                                            ) : (
                                                <span className="text-xs text-gray-500">Kelola Tim</span>
                                            )}
                                        </div>
                                        <ArrowRight className="size-4 text-gray-400 group-hover:text-[#2F3E8F]" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                {/* Section: Lamaran Saya */}
                <section>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <ActivityIcon className="size-5 text-[#2F3E8F]" />
                            Status Lamaran Saya
                        </h2>
                    </div>

                    {myApplications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-12 text-center">
                            <Users className="mb-3 size-10 text-gray-400" />
                            <p className="text-sm font-medium text-gray-900">Belum ada lamaran</p>
                            <p className="mt-1 text-xs text-gray-500">Anda belum mengirimkan lamaran ke tim manapun.</p>
                            <Link href="/kegiatan" className="mt-4 rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Cari Kegiatan
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {myApplications.map((app) => (
                                <Link
                                    key={app.id}
                                    href={`/kegiatan/${app.recruitment.activity.id}`}
                                    className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
                                >
                                    <div className="mb-4 flex-1">
                                        <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-[#2F3E8F] transition-colors">
                                            {app.recruitment.activity.title}
                                        </h3>
                                        <div className="mt-3 text-sm text-gray-600 space-y-2">
                                            <div>
                                                <span className="text-xs text-gray-400 block mb-0.5">Peran yang dilamar:</span>
                                                <span className="font-medium text-gray-900 bg-gray-100 px-2 py-0.5 rounded text-xs">{app.role}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-400 block mb-0.5">Pembuat Kegiatan:</span>
                                                <span className="font-medium text-gray-900 text-xs">{app.recruitment.activity.creator?.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                                        <div className="flex flex-col">
                                            {getStatusBadge(app.status)}
                                            <span className="mt-1 text-[10px] text-gray-400">
                                                Dikirim {new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(app.created_at))}
                                            </span>
                                        </div>
                                        <ArrowRight className="size-4 text-gray-400 group-hover:text-[#2F3E8F]" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </CampLinkLayout>
    );
}
