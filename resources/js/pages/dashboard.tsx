import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link } from '@inertiajs/react';
import { Users, Activity as ActivityIcon, CheckCircle2, Clock, FileText, ArrowRight, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Props {
    isAdmin: boolean;
    stats: any;
}



export default function Dashboard({ isAdmin, stats }: Props) {
    return (
        <CampLinkLayout>
            <Head title="Dashboard" />
            
            <div className="flex flex-1 flex-col gap-6 p-6 max-w-7xl mx-auto w-full">
                <div className="mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isAdmin ? 'Dashboard Admin' : 'Dashboard Anda'}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {isAdmin ? 'Ringkasan platform dan statistik keseluruhan.' : 'Ringkasan aktivitas dan partisipasi Anda di platform ini.'}
                    </p>
                </div>

                {isAdmin ? (
                    // Admin View
                    <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
                                    <Users className="size-4 text-muted-foreground text-gray-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-gray-900">{stats.totalUsers}</div>
                                    <p className="text-xs text-muted-foreground mt-1 text-gray-500">
                                        Akun terdaftar di platform
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Kegiatan</CardTitle>
                                    <ActivityIcon className="size-4 text-muted-foreground text-gray-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-gray-900">{stats.totalActivities}</div>
                                    <p className="text-xs text-muted-foreground mt-1 text-gray-500">
                                        Kegiatan dibuat
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Kegiatan Aktif</CardTitle>
                                    <CheckCircle2 className="size-4 text-muted-foreground text-green-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-gray-900">{stats.activeActivities}</div>
                                    <p className="text-xs text-muted-foreground mt-1 text-gray-500">
                                        Masih berlangsung
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Lamaran Tim</CardTitle>
                                    <FileText className="size-4 text-muted-foreground text-gray-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-gray-900">{stats.totalApplications}</div>
                                    <p className="text-xs text-muted-foreground mt-1 text-gray-500">
                                        Interaksi antar pengguna
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ) : (
                    // User View
                    <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card className="bg-[#2F3E8F] text-white">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-blue-100">Tim Dikelola</CardTitle>
                                    <Users className="size-4 text-blue-200" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.managedTeams}</div>
                                    <Link href="/tim" className="text-xs text-blue-200 hover:text-white mt-1 flex items-center gap-1 group">
                                        Kelola Tim <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-700">Kegiatan Diikuti</CardTitle>
                                    <ActivityIcon className="size-4 text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-gray-900">{stats.totalActivities}</div>
                                    <Link href="/profil" className="text-xs text-[#2F3E8F] mt-1 flex items-center gap-1 group">
                                        Lihat Riwayat <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-700">Lamaran Terkirim</CardTitle>
                                    <FileText className="size-4 text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-gray-900">{stats.totalApplications}</div>
                                    <Link href="/tim" className="text-xs text-[#2F3E8F] mt-1 flex items-center gap-1 group">
                                        Cek Status <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-700">Diterima di Tim</CardTitle>
                                    <CheckCircle2 className="size-4 text-green-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-green-600">{stats.acceptedApplications}</div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Dari {stats.totalApplications} lamaran
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        
                        {/* Feed Kegiatan Terbaru */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card className="md:col-span-1">
                                <CardHeader>
                                    <CardTitle>Aktivitas Terkini</CardTitle>
                                    <CardDescription>Riwayat pendaftaran dan lamaran tim Anda.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {stats.recentActivity && stats.recentActivity.length > 0 ? (
                                        <div className="space-y-4">
                                            {stats.recentActivity.map((activity: any) => (
                                                <div key={activity.type + activity.id} className="flex items-start gap-4 pb-4 last:pb-0 border-b last:border-0 border-gray-100">
                                                    <div className={`mt-0.5 rounded-full p-2 ${activity.type === 'team_application' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                        {activity.type === 'team_application' ? <UserPlus className="size-4" /> : <ActivityIcon className="size-4" />}
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <p className="text-sm font-medium leading-none text-gray-900">
                                                            {activity.title}
                                                        </p>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-xs font-medium ${
                                                                activity.status === 'accepted' ? 'text-green-600' :
                                                                activity.status === 'rejected' ? 'text-red-600' :
                                                                activity.status === 'registered' ? 'text-emerald-600' :
                                                                'text-yellow-600'
                                                            }`}>
                                                                {activity.status === 'accepted' ? 'Diterima' :
                                                                 activity.status === 'rejected' ? 'Ditolak' :
                                                                 activity.status === 'registered' ? 'Terdaftar' :
                                                                 'Menunggu'}
                                                            </span>
                                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                                <Clock className="size-3" /> {activity.time}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
                                            <Clock className="size-8 text-gray-300 mb-3" />
                                            <p className="text-sm">Belum ada aktivitas baru.</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                            
                            <Card className="md:col-span-1 bg-gray-50 border-dashed shadow-none">
                                <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
                                    <div className="bg-white p-4 rounded-full shadow-sm border border-gray-100">
                                        <ActivityIcon className="size-8 text-[#2F3E8F]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Mulai Kolaborasi Baru</h3>
                                        <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                                            Bergabunglah dengan proyek yang sesuai dengan minat Anda atau mulai kegiatan Anda sendiri sekarang!
                                        </p>
                                    </div>
                                    <div className="flex gap-3 mt-2">
                                        <Link href="/kegiatan" className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                            Cari Kegiatan
                                        </Link>
                                        <Link href="/kegiatan/buat" className="rounded-lg bg-[#2F3E8F] px-4 py-2 text-sm font-medium text-white hover:bg-[#243070] transition-colors">
                                            Buat Kegiatan
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </CampLinkLayout>
    );
}
