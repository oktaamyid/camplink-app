import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { 
    Users, 
    Activity, 
    CheckCircle2, 
    Clock, 
    FileText, 
    ArrowRight, 
    UserPlus, 
    Search, 
    Trash2, 
    Ban, 
    Check, 
    ShieldAlert,
    BadgeCheck,
    ShieldX,
    Edit,
    LayoutGrid,
    Plus,
    X,
    Megaphone,
    Flag,
    Star,
    Shield,
    FileDown,
    FileSpreadsheet,
    Image as LucideImage,
    Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import RichTextEditor from '@/components/rich-text-editor';
import { useState } from 'react';

interface Props {
    isAdmin: boolean;
    stats: any;
}

export default function Dashboard({ isAdmin, stats }: Props) {
    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'activities' | 'categories' | 'announcements' | 'reports' | 'reviews'>('overview');
    const [userSearch, setUserSearch] = useState('');
    const [activitySearch, setActivitySearch] = useState('');
    
    // Category states
    const [categoryName, setCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState<{id: number, name: string} | null>(null);

    // Announcement form
    const { data: announcementData, setData: setAnnouncementData, post: postAnnouncement, processing: processingAnnouncement, reset: resetAnnouncement } = useForm({
        title: '',
        content: '',
        type: 'general' as 'general' | 'activity',
        activity_id: '',
        thumbnail: null as File | null,
    });

    // Report states
    const [reportNote, setReportNote] = useState('');
    const [processingReport, setProcessingReport] = useState<number | null>(null);

    const toggleUserStatus = (userId: number) => {
        if (confirm('Apakah Anda yakin ingin mengubah status aktif pengguna ini?')) {
            router.patch(route('admin.users.toggleStatus', userId), {}, {
                preserveScroll: true
            });
        }
    };

    const toggleActivityStatus = (activityId: number) => {
        if (confirm('Apakah Anda yakin ingin mengubah status kegiatan ini?')) {
            router.patch(route('admin.activities.toggleStatus', activityId), {}, {
                preserveScroll: true
            });
        }
    };

    const toggleActivityVerification = (activityId: number) => {
        router.patch(route('admin.activities.toggleVerification', activityId), {}, {
            preserveScroll: true
        });
    };

    const deleteActivity = (activityId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus kegiatan ini secara permanen? Semua data rekrutmen dan lamaran tim yang terkait juga akan dihapus.')) {
            router.delete(route('admin.activities.delete', activityId), {
                preserveScroll: true
            });
        }
    };

    const handleCategorySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            router.patch(route('admin.categories.update', editingCategory.id), { name: categoryName }, {
                onSuccess: () => {
                    setEditingCategory(null);
                    setCategoryName('');
                },
                preserveScroll: true
            });
        } else {
            router.post(route('admin.categories.store'), { name: categoryName }, {
                onSuccess: () => setCategoryName(''),
                preserveScroll: true
            });
        }
    };

    const deleteCategory = (categoryId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
            router.delete(route('admin.categories.delete', categoryId), {
                preserveScroll: true
            });
        }
    };

    const updateUserRole = (userId: number, role: string) => {
        router.patch(route('admin.users.updateRole', userId), { role }, {
            preserveScroll: true
        });
    };

    const handleAnnouncementSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postAnnouncement(route('admin.announcements.store'), {
            onSuccess: () => {
                resetAnnouncement();
            },
            preserveScroll: true
        });
    };

    const handleImageUpload = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(route('admin.announcements.upload-image'), {
                method: 'POST',
                body: formData,
                headers: {
                    'X-XSRF-TOKEN': decodeURIComponent(document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''),
                    'Accept': 'application/json',
                }
            });
            const data = await response.json();
            return data.url;
        } catch (error) {
            console.error('Image upload failed:', error);
            return '';
        }
    };

    const deleteAnnouncement = (announcementId: number) => {
        if (confirm('Hapus pengumuman ini?')) {
            router.delete(route('admin.announcements.delete', announcementId), {
                preserveScroll: true
            });
        }
    };

    const resolveReport = (reportId: number, status: 'resolved' | 'rejected') => {
        router.patch(route('admin.reports.resolve', reportId), { status, admin_note: reportNote }, {
            onSuccess: () => {
                setProcessingReport(null);
                setReportNote('');
            },
            preserveScroll: true
        });
    };

    const deleteReview = (reviewId: number) => {
        if (confirm('Hapus ulasan ini?')) {
            router.delete(route('admin.reviews.delete', reviewId), {
                preserveScroll: true
            });
        }
    };

    const users = stats.users || [];
    const activities = stats.activities || [];

    const filteredUsers = users.filter((u: any) => 
        u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
        u.email.toLowerCase().includes(userSearch.toLowerCase())
    );

    const filteredActivities = activities.filter((act: any) => 
        act.title.toLowerCase().includes(activitySearch.toLowerCase())
    );

    return (
        <CampLinkLayout>
            <Head title="Dashboard" />
            
            <div className="flex flex-1 flex-col gap-6 p-6 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isAdmin ? 'Dashboard Admin' : 'Dashboard Anda'}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {isAdmin 
                                ? 'Kelola pengguna, moderasi kegiatan kampus, dan pantau aktivitas platform.' 
                                : 'Ringkasan aktivitas dan partisipasi Anda di platform ini.'}
                        </p>
                    </div>
                </div>

                {isAdmin ? (
                    // Admin View
                    <div className="space-y-6">
                        {/* Tabs Navigation */}
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                                    activeTab === 'overview'
                                        ? 'border-[#2F3E8F] text-[#2F3E8F]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Ringkasan
                            </button>
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                                    activeTab === 'users'
                                        ? 'border-[#2F3E8F] text-[#2F3E8F]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Kelola Pengguna
                            </button>
                            <button
                                onClick={() => setActiveTab('activities')}
                                className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                                    activeTab === 'activities'
                                        ? 'border-[#2F3E8F] text-[#2F3E8F]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Kelola Kegiatan
                            </button>
                            <button
                                onClick={() => setActiveTab('categories')}
                                className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                                    activeTab === 'categories'
                                        ? 'border-[#2F3E8F] text-[#2F3E8F]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Kelola Kategori
                            </button>
                            <button
                                onClick={() => setActiveTab('announcements')}
                                className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                                    activeTab === 'announcements'
                                        ? 'border-[#2F3E8F] text-[#2F3E8F]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Pengumuman
                            </button>
                            <button
                                onClick={() => setActiveTab('reports')}
                                className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                                    activeTab === 'reports'
                                        ? 'border-[#2F3E8F] text-[#2F3E8F]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Laporan {stats.totalReports > 0 && <span className="ml-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] text-red-600">{stats.totalReports}</span>}
                            </button>
                            <button
                                onClick={() => setActiveTab('reviews')}
                                className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                                    activeTab === 'reviews'
                                        ? 'border-[#2F3E8F] text-[#2F3E8F]'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Ulasan
                            </button>
                        </div>

                        {/* Overview Content */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Export Section */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900">Export Laporan Sistem</h3>
                                        <p className="text-xs text-gray-500 mt-1 max-w-sm">Unduh ringkasan data pengguna, status kegiatan, rekrutmen tim, dan laporan yang ada di sistem.</p>
                                    </div>
                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <a
                                            href={route('admin.export.pdf')}
                                            target="_blank"
                                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-red-50 text-red-600 border border-red-200 px-5 py-2.5 text-sm font-semibold hover:bg-red-100 hover:border-red-300 transition-colors shadow-sm"
                                        >
                                            <FileDown className="size-4" />
                                            PDF
                                        </a>
                                        <a
                                            href={route('admin.export.csv')}
                                            target="_blank"
                                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 px-5 py-2.5 text-sm font-semibold hover:bg-emerald-100 hover:border-emerald-300 transition-colors shadow-sm"
                                        >
                                            <FileSpreadsheet className="size-4" />
                                            Excel (CSV)
                                        </a>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <Card className="rounded-2xl border-gray-200 shadow-sm">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium text-gray-700">Total Pengguna</CardTitle>
                                        <Users className="size-4 text-gray-400" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-gray-900">{stats.totalUsers}</div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Akun mahasiswa & admin terdaftar
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium text-gray-700">Total Kegiatan</CardTitle>
                                        <Activity className="size-4 text-gray-400" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-gray-900">{stats.totalActivities}</div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Kegiatan kampus terposting
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium text-gray-700">Kegiatan Aktif</CardTitle>
                                        <CheckCircle2 className="size-4 text-green-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-gray-900">{stats.activeActivities}</div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Kegiatan yang sedang berjalan
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium text-gray-700">Total Lamaran Tim</CardTitle>
                                        <FileText className="size-4 text-gray-400" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-gray-900">{stats.totalApplications}</div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Interaksi kolaborasi tim mahasiswa
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => router.get(route('admin.inisiator-requests.index'))}>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium text-gray-700">Permohonan Inisiator</CardTitle>
                                        <UserPlus className="size-4 text-orange-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-gray-900">{stats.pendingInisiators}</div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Menunggu persetujuan admin
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                            </div>
                        )}

                        {/* Users Management */}
                        {activeTab === 'users' && (
                            <Card>
                                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
                                    <div>
                                        <CardTitle className="text-lg">Daftar Pengguna</CardTitle>
                                        <CardDescription>Aktifkan atau nonaktifkan akses akun mahasiswa.</CardDescription>
                                    </div>
                                    <div className="relative w-full sm:w-72">
                                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Cari nama atau email..."
                                            value={userSearch}
                                            onChange={(e) => setUserSearch(e.target.value)}
                                            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F] transition-shadow duration-150"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                                        <table className="w-full text-sm text-left text-gray-500">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                                                <tr>
                                                    <th className="px-6 py-3 font-semibold">Nama</th>
                                                    <th className="px-6 py-3 font-semibold">Email</th>
                                                    <th className="px-6 py-3 font-semibold">Peran</th>
                                                    <th className="px-6 py-3 font-semibold">Status</th>
                                                    <th className="px-6 py-3 font-semibold text-right">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {filteredUsers.length > 0 ? (
                                                    filteredUsers.map((u: any) => (
                                                        <tr key={u.id} className="bg-white hover:bg-gray-50 transition-colors">
                                                            <td className="px-6 py-4 font-medium text-gray-900">{u.name}</td>
                                                            <td className="px-6 py-4">{u.email}</td>
                                                            <td className="px-6 py-4">
                                                                <select
                                                                    value={u.role}
                                                                    onChange={(e) => updateUserRole(u.id, e.target.value)}
                                                                    className={`rounded-full px-2 py-0.5 text-xs font-medium border focus:outline-none ${
                                                                        u.role === 'admin' 
                                                                            ? 'bg-purple-50 text-purple-700 border-purple-100' 
                                                                            : 'bg-blue-50 text-blue-700 border-blue-100'
                                                                    }`}
                                                                >
                                                                    <option value="mahasiswa">Mahasiswa</option>
                                                                    <option value="admin">Admin</option>
                                                                </select>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                                                                    u.is_active 
                                                                        ? 'bg-green-50 text-green-700 border border-green-100' 
                                                                        : 'bg-red-50 text-red-700 border border-red-100'
                                                                }`}>
                                                                    {u.is_active ? 'Aktif' : 'Nonaktif'}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <button
                                                                    onClick={() => toggleUserStatus(u.id)}
                                                                    className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                                                                        u.is_active
                                                                            ? 'border border-red-200 bg-white text-red-700 hover:bg-red-50'
                                                                            : 'border border-green-200 bg-white text-green-700 hover:bg-green-50'
                                                                    }`}
                                                                >
                                                                    {u.is_active ? (
                                                                        <>
                                                                            <Ban className="size-3" /> Nonaktifkan
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Check className="size-3" /> Aktifkan
                                                                        </>
                                                                    )}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                                            <div className="flex flex-col items-center justify-center space-y-1">
                                                                <Users className="size-8 text-gray-300" />
                                                                <p className="font-medium">Tidak ada pengguna ditemukan.</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Activities Management */}
                        {activeTab === 'activities' && (
                            <Card>
                                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <CardTitle className="text-lg">Moderasi Kegiatan</CardTitle>
                                            <Link 
                                                href={route('kegiatan.buat')} 
                                                className="inline-flex items-center gap-1 rounded-md bg-[#2F3E8F] px-3 py-1 text-xs font-semibold text-white hover:bg-[#243070] transition-colors"
                                            >
                                                <Activity className="size-3" /> Tambah Kegiatan
                                            </Link>
                                        </div>
                                        <CardDescription>Kelola status keaktifan kegiatan atau hapus kegiatan yang tidak valid.</CardDescription>
                                    </div>
                                    <div className="relative w-full sm:w-72">
                                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Cari judul kegiatan..."
                                            value={activitySearch}
                                            onChange={(e) => setActivitySearch(e.target.value)}
                                            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F] transition-shadow duration-150"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                                        <table className="w-full text-sm text-left text-gray-500">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                                                <tr>
                                                    <th className="px-6 py-3 font-semibold">Nama Kegiatan</th>
                                                    <th className="px-6 py-3 font-semibold text-center">Verifikasi</th>
                                                    <th className="px-6 py-3 font-semibold">Kategori</th>
                                                    <th className="px-6 py-3 font-semibold">Pembuat</th>
                                                    <th className="px-6 py-3 font-semibold">Tanggal</th>
                                                    <th className="px-6 py-3 font-semibold">Status</th>
                                                    <th className="px-6 py-3 font-semibold text-right">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {filteredActivities.length > 0 ? (
                                                    filteredActivities.map((act: any) => (
                                                        <tr key={act.id} className="bg-white hover:bg-gray-50 transition-colors">
                                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                                <Link 
                                                                    href={route('kegiatan.show', act.id)} 
                                                                    className="hover:underline text-[#2F3E8F]"
                                                                >
                                                                    {act.title}
                                                                </Link>
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <button 
                                                                    onClick={() => toggleActivityVerification(act.id)}
                                                                    title={act.is_verified ? 'Batal Verifikasi' : 'Verifikasi Kegiatan'}
                                                                    className={`p-1.5 rounded-full transition-colors ${
                                                                        act.is_verified 
                                                                            ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
                                                                            : 'text-gray-300 bg-gray-50 hover:bg-gray-100'
                                                                    }`}
                                                                >
                                                                    <BadgeCheck className="size-5" />
                                                                </button>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className="inline-flex items-center rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">
                                                                    {act.category?.name || 'Umum'}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">{act.creator?.name || 'Anonim'}</td>
                                                            <td className="px-6 py-4">
                                                                {new Date(act.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                                    act.status === 'active' 
                                                                        ? 'bg-green-50 text-green-700 border border-green-100' 
                                                                        : 'bg-red-50 text-red-700 border border-red-100'
                                                                }`}>
                                                                    {act.status === 'active' ? 'Aktif' : 'Invalid'}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <div className="flex items-center justify-end gap-1">
                                                                    <Link
                                                                        href={route('kegiatan.edit', act.id)}
                                                                        className="p-1.5 text-gray-400 hover:text-[#2F3E8F] hover:bg-gray-100 rounded-lg transition-colors"
                                                                        title="Edit Kegiatan"
                                                                    >
                                                                        <Edit className="size-4" />
                                                                    </Link>
                                                                    <button
                                                                        onClick={() => toggleActivityStatus(act.id)}
                                                                        className={`p-1.5 rounded-lg transition-colors ${
                                                                            act.status === 'active'
                                                                                ? 'text-amber-600 hover:bg-amber-50'
                                                                                : 'text-green-600 hover:bg-green-50'
                                                                        }`}
                                                                        title={act.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                                                                    >
                                                                        {act.status === 'active' ? <Ban className="size-4" /> : <Check className="size-4" />}
                                                                    </button>
                                                                    <button
                                                                        onClick={() => deleteActivity(act.id)}
                                                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                        title="Hapus Permanen"
                                                                    >
                                                                        <Trash2 className="size-4" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                                            <div className="flex flex-col items-center justify-center space-y-1">
                                                                <ShieldAlert className="size-8 text-gray-300" />
                                                                <p className="font-medium">Tidak ada kegiatan ditemukan.</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Categories Management */}
                        {activeTab === 'categories' && (
                            <div className="grid gap-6 md:grid-cols-3">
                                <Card className="md:col-span-1">
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            {editingCategory ? 'Edit Kategori' : 'Tambah Kategori'}
                                        </CardTitle>
                                        <CardDescription>
                                            {editingCategory ? 'Ubah nama kategori yang sudah ada.' : 'Buat kategori kegiatan kampus baru.'}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleCategorySubmit} className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-gray-700">Nama Kategori</label>
                                                <input
                                                    type="text"
                                                    placeholder="Contoh: Seminar, Lomba"
                                                    value={categoryName}
                                                    onChange={(e) => setCategoryName(e.target.value)}
                                                    required
                                                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F]"
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    type="submit"
                                                    className="flex-1 rounded-lg bg-[#2F3E8F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#243070] transition-colors"
                                                >
                                                    {editingCategory ? 'Perbarui' : 'Simpan'}
                                                </button>
                                                {editingCategory && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setEditingCategory(null);
                                                            setCategoryName('');
                                                        }}
                                                        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                                                    >
                                                        Batal
                                                    </button>
                                                )}
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>

                                <Card className="md:col-span-2">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Daftar Kategori</CardTitle>
                                        <CardDescription>Semua kategori yang tersedia untuk kegiatan.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {stats.categories && stats.categories.length > 0 ? (
                                                stats.categories.map((cat: any) => (
                                                    <div key={cat.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-sm transition-all group">
                                                        <div className="flex items-center gap-2">
                                                            <div className="p-1.5 rounded-md bg-white border border-gray-100 text-gray-400">
                                                                <LayoutGrid className="size-4" />
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-900">{cat.name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button 
                                                                onClick={() => {
                                                                    setEditingCategory(cat);
                                                                    setCategoryName(cat.name);
                                                                }}
                                                                className="p-1.5 text-gray-400 hover:text-[#2F3E8F] hover:bg-white rounded-md"
                                                                title="Edit"
                                                            >
                                                                <Edit className="size-4" />
                                                            </button>
                                                            <button 
                                                                onClick={() => deleteCategory(cat.id)}
                                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-white rounded-md"
                                                                title="Hapus"
                                                            >
                                                                <Trash2 className="size-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-span-2 py-8 text-center text-gray-500">
                                                    Belum ada kategori.
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* Announcements Management */}
                        {activeTab === 'announcements' && (
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <Megaphone className="size-5 text-[#2F3E8F]" />
                                            Buat Pengumuman Baru
                                        </CardTitle>
                                        <CardDescription>Kirim pesan penting ke seluruh pengguna platform dengan format kaya dan gambar.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleAnnouncementSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                            {/* Left Column: Settings and Thumbnail */}
                                            <div className="lg:col-span-1 space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-gray-700">Judul Pengumuman</label>
                                                    <input
                                                        type="text"
                                                        value={announcementData.title}
                                                        onChange={(e) => setAnnouncementData('title', e.target.value)}
                                                        required
                                                        placeholder="Masukkan judul menarik..."
                                                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#2F3E8F] focus:outline-none focus:ring-2 focus:ring-[#2F3E8F]/20 transition-all"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-gray-700">Thumbnail Pengumuman</label>
                                                    <div className="relative group aspect-video rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-[#2F3E8F]/50">
                                                        {announcementData.thumbnail ? (
                                                            <>
                                                                <img 
                                                                    src={URL.createObjectURL(announcementData.thumbnail)} 
                                                                    className="size-full object-cover" 
                                                                    alt="Preview"
                                                                />
                                                                <button 
                                                                    type="button"
                                                                    onClick={() => setAnnouncementData('thumbnail', null)}
                                                                    className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
                                                                >
                                                                    <X className="size-4" />
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <div className="flex flex-col items-center gap-2 p-4">
                                                                <div className="p-3 bg-white rounded-full shadow-sm text-gray-400 group-hover:text-[#2F3E8F] transition-colors">
                                                                    <LucideImage className="size-6" />
                                                                </div>
                                                                <p className="text-xs text-center text-gray-500 font-medium">Klik untuk upload thumbnail</p>
                                                            </div>
                                                        )}
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                                            onChange={(e) => setAnnouncementData('thumbnail', e.target.files?.[0] || null)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-gray-700">Tipe Pengumuman</label>
                                                    <select
                                                        value={announcementData.type}
                                                        onChange={(e) => setAnnouncementData('type', e.target.value as any)}
                                                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#2F3E8F] focus:outline-none focus:ring-2 focus:ring-[#2F3E8F]/20 transition-all"
                                                    >
                                                        <option value="general">Umum (Semua User)</option>
                                                        <option value="activity">Terkait Kegiatan</option>
                                                    </select>
                                                </div>

                                                {announcementData.type === 'activity' && (
                                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                                        <label className="text-sm font-bold text-gray-700">ID Kegiatan</label>
                                                        <input
                                                            type="number"
                                                            value={announcementData.activity_id}
                                                            onChange={(e) => setAnnouncementData('activity_id', e.target.value)}
                                                            required
                                                            placeholder="Contoh: 12"
                                                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#2F3E8F] focus:outline-none focus:ring-2 focus:ring-[#2F3E8F]/20 transition-all"
                                                        />
                                                    </div>
                                                )}

                                                <button
                                                    type="submit"
                                                    disabled={processingAnnouncement}
                                                    className="w-full rounded-xl bg-[#2F3E8F] px-4 py-3 text-sm font-bold text-white hover:bg-[#243070] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
                                                >
                                                    {processingAnnouncement ? (
                                                        <Loader2 className="size-4 animate-spin" />
                                                    ) : (
                                                        <Megaphone className="size-4" />
                                                    )}
                                                    {processingAnnouncement ? 'Sedang Terbit...' : 'Terbitkan Sekarang'}
                                                </button>
                                            </div>

                                            {/* Right Column: Content Editor */}
                                            <div className="lg:col-span-2 space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Isi Pengumuman</label>
                                                <RichTextEditor 
                                                    content={announcementData.content}
                                                    onChange={(content) => setAnnouncementData('content', content)}
                                                    onImageUpload={handleImageUpload}
                                                />
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Riwayat Pengumuman</CardTitle>
                                        <CardDescription>Daftar semua pengumuman yang telah diterbitkan sebelumnya.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {stats.announcements && stats.announcements.length > 0 ? (
                                                stats.announcements.map((ann: any) => (
                                                    <div key={ann.id} className="group relative bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-all">
                                                        <div className="flex gap-4 items-start">
                                                            {ann.thumbnail_url && (
                                                                <img 
                                                                    src={ann.thumbnail_url} 
                                                                    className="size-16 rounded-xl object-cover shrink-0"
                                                                    alt="" 
                                                                />
                                                            )}
                                                            <div className="flex-1 min-w-0 space-y-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full ${ann.type === 'general' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}`}>
                                                                        {ann.type}
                                                                    </span>
                                                                    <span className="text-[10px] text-gray-400 font-medium">
                                                                        {new Date(ann.created_at).toLocaleDateString('id-ID')}
                                                                    </span>
                                                                </div>
                                                                <h4 className="text-sm font-bold text-gray-900 truncate">{ann.title}</h4>
                                                                <p className="text-xs text-gray-500 line-clamp-1 italic">
                                                                    Oleh {ann.creator?.name || 'Admin'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button 
                                                                onClick={() => deleteAnnouncement(ann.id)}
                                                                className="p-1.5 bg-white shadow-sm border border-gray-100 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                                                            >
                                                                <Trash2 className="size-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-span-full py-12 text-center text-gray-500">
                                                    <Megaphone className="size-12 text-gray-200 mx-auto mb-4" />
                                                    <p className="font-medium text-gray-400">Belum ada pengumuman yang diterbitkan.</p>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* Reports Management */}
                        {activeTab === 'reports' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Flag className="size-5 text-red-600" />
                                        Moderasi Laporan Kegiatan
                                    </CardTitle>
                                    <CardDescription>Tinjau laporan dari pengguna mengenai kegiatan yang tidak valid atau palsu.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                                        <table className="w-full text-sm text-left text-gray-500">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                                                <tr>
                                                    <th className="px-6 py-3 font-semibold">Kegiatan</th>
                                                    <th className="px-6 py-3 font-semibold">Pelapor</th>
                                                    <th className="px-6 py-3 font-semibold">Alasan</th>
                                                    <th className="px-6 py-3 font-semibold text-center">Status</th>
                                                    <th className="px-6 py-3 font-semibold text-right">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {stats.reports && stats.reports.length > 0 ? (
                                                    stats.reports.map((rep: any) => (
                                                        <tr key={rep.id} className="bg-white hover:bg-gray-50 transition-colors">
                                                            <td className="px-6 py-4 font-medium text-gray-900">{rep.activity.title}</td>
                                                            <td className="px-6 py-4">{rep.reporter.name}</td>
                                                            <td className="px-6 py-4">
                                                                <span className="capitalize">{rep.reason.replace('_', ' ')}</span>
                                                                {rep.details && <p className="text-[10px] text-gray-400 mt-0.5">{rep.details}</p>}
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                                                    rep.status === 'pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                                                                    rep.status === 'resolved' ? 'bg-green-100 text-green-700 border border-green-200' :
                                                                    'bg-red-100 text-red-700 border border-red-200'
                                                                }`}>
                                                                    {rep.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                {rep.status === 'pending' ? (
                                                                    <div className="flex items-center justify-end gap-2">
                                                                        {processingReport === rep.id ? (
                                                                            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2">
                                                                                <input 
                                                                                    type="text" 
                                                                                    placeholder="Catatan..." 
                                                                                    className="px-2 py-1 text-xs border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#2F3E8F]"
                                                                                    value={reportNote}
                                                                                    onChange={(e) => setReportNote(e.target.value)}
                                                                                />
                                                                                <button onClick={() => resolveReport(rep.id, 'resolved')} className="text-green-600 hover:bg-green-50 px-2 py-1 rounded-md text-xs font-bold">Selesai</button>
                                                                                <button onClick={() => resolveReport(rep.id, 'rejected')} className="text-red-600 hover:bg-red-50 px-2 py-1 rounded-md text-xs font-bold">Tolak</button>
                                                                                <button onClick={() => setProcessingReport(null)} className="text-gray-400"><X className="size-4" /></button>
                                                                            </div>
                                                                        ) : (
                                                                            <button 
                                                                                onClick={() => setProcessingReport(rep.id)}
                                                                                className="inline-flex items-center gap-1 rounded-lg border border-[#2F3E8F]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#2F3E8F] hover:bg-[#F8F9FB] transition-colors"
                                                                            >
                                                                                Proses Laporan
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-[10px] text-gray-400 italic">Sudah diproses</span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                                            <div className="flex flex-col items-center justify-center space-y-1">
                                                                <Flag className="size-8 text-gray-200" />
                                                                <p className="font-medium text-gray-400">Tidak ada laporan.</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Reviews Management */}
                        {activeTab === 'reviews' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Star className="size-5 text-amber-500" />
                                        Kelola Ulasan Kegiatan
                                    </CardTitle>
                                    <CardDescription>Moderasi ulasan dan rating dari mahasiswa.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {stats.reviews && stats.reviews.length > 0 ? (
                                            stats.reviews.map((rev: any) => (
                                                <div key={rev.id} className="p-4 rounded-2xl border border-gray-100 bg-gray-50 group hover:bg-white hover:shadow-md transition-all">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div className="flex items-center gap-1 text-amber-500">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} className={`size-3 ${i < rev.rating ? 'fill-current' : 'text-gray-200'}`} />
                                                            ))}
                                                            <span className="text-xs font-bold text-gray-900 ml-1">{rev.rating}/5</span>
                                                        </div>
                                                        <button 
                                                            onClick={() => deleteReview(rev.id)}
                                                            className="p-1.5 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <Trash2 className="size-4" />
                                                        </button>
                                                    </div>
                                                    <p className="text-sm text-gray-700 leading-relaxed italic mb-4">"{rev.review}"</p>
                                                    <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-auto">
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] font-bold text-gray-900">{rev.user.name}</span>
                                                            <span className="text-[9px] text-gray-500 truncate max-w-[150px]">{rev.activity.title}</span>
                                                        </div>
                                                        <span className="text-[9px] text-gray-400">
                                                            {new Date(rev.created_at).toLocaleDateString('id-ID')}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-span-full py-12 text-center text-gray-500">
                                                <Star className="size-12 text-gray-200 mx-auto mb-4" />
                                                <p className="font-medium text-gray-400">Belum ada ulasan.</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                ) : (
                    // User View
                    <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card className="bg-[#2F3E8F] text-white overflow-hidden relative group border-none shadow-lg">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                    <Users className="size-24" />
                                </div>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                                    <CardTitle className="text-sm font-bold text-blue-100">Tim Dikelola</CardTitle>
                                    <Users className="size-4 text-blue-200" />
                                </CardHeader>
                                <CardContent className="relative z-10">
                                    <div className="text-3xl font-extrabold">{stats.managedTeams}</div>
                                    <Link href="/tim" className="text-xs font-semibold text-blue-200 hover:text-white mt-2 flex items-center gap-1 transition-colors">
                                        Kelola Tim Sekarang <ArrowRight className="size-3" />
                                    </Link>
                                </CardContent>
                            </Card>
                            <Card className="rounded-2xl border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-bold text-gray-600">Kegiatan Diikuti</CardTitle>
                                    <Activity className="size-4 text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-extrabold text-gray-900">{stats.totalActivities}</div>
                                    <Link href="/profil" className="text-xs font-semibold text-[#2F3E8F] mt-2 flex items-center gap-1">
                                        Lihat Riwayat <ArrowRight className="size-3" />
                                    </Link>
                                </CardContent>
                            </Card>
                            <Card className="rounded-2xl border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-bold text-gray-600">Lamaran Terkirim</CardTitle>
                                    <FileText className="size-4 text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-extrabold text-gray-900">{stats.totalApplications}</div>
                                    <Link href="/tim" className="text-xs font-semibold text-[#2F3E8F] mt-2 flex items-center gap-1">
                                        Cek Status <ArrowRight className="size-3" />
                                    </Link>
                                </CardContent>
                            </Card>
                            <Card className="rounded-2xl border-gray-100 shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-green-500">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-bold text-gray-600">Diterima di Tim</CardTitle>
                                    <CheckCircle2 className="size-4 text-green-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-extrabold text-green-600">{stats.acceptedApplications}</div>
                                    <p className="text-xs text-gray-500 mt-2 font-medium">
                                        Dari {stats.totalApplications} lamaran terkirim
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        
                        {/* Feed Kegiatan Terbaru */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card className="md:col-span-1 border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                                <CardHeader className="bg-gray-50/50 border-b border-gray-100">
                                    <CardTitle className="text-lg font-bold">Aktivitas Terkini</CardTitle>
                                    <CardDescription>Jejak pendaftaran dan lamaran tim Anda.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    {stats.recentActivity && stats.recentActivity.length > 0 ? (
                                        <div className="divide-y divide-gray-50">
                                            {stats.recentActivity.map((activity: any) => (
                                                <div key={activity.type + activity.id} className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors group">
                                                    <div className={`rounded-2xl p-3 shadow-sm transition-transform group-hover:scale-110 ${activity.type === 'team_application' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                        {activity.type === 'team_application' ? <UserPlus className="size-5" /> : <Activity className="size-5" />}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-bold text-gray-900 truncate">
                                                            {activity.title}
                                                        </p>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${
                                                                activity.status === 'accepted' ? 'text-green-600' :
                                                                activity.status === 'rejected' ? 'text-red-600' :
                                                                activity.status === 'registered' ? 'text-emerald-600' :
                                                                'text-amber-600'
                                                            }`}>
                                                                {activity.status}
                                                            </span>
                                                            <span className="text-[10px] text-gray-400 font-medium">
                                                                {new Date(activity.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <ArrowRight className="size-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-16 text-center text-gray-500">
                                            <div className="p-4 bg-gray-50 rounded-full w-fit mx-auto mb-4">
                                                <Clock className="size-8 text-gray-300" />
                                            </div>
                                            <p className="font-medium text-gray-400">Belum ada aktivitas terbaru.</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card className="md:col-span-1 border-none shadow-sm rounded-3xl bg-white overflow-hidden">
                                <CardHeader className="bg-gray-50/50 border-b border-gray-100">
                                    <CardTitle className="text-lg font-bold">Rekomendasi Untukmu</CardTitle>
                                    <CardDescription>Kegiatan menarik yang mungkin kamu sukai.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="flex flex-col items-center justify-center py-10 text-center">
                                        <div className="p-4 bg-[#2F3E8F]/5 rounded-full mb-4">
                                            <Star className="size-10 text-[#2F3E8F]/20" />
                                        </div>
                                        <h3 className="text-sm font-bold text-gray-900 mb-1">Cari Kegiatan Lain?</h3>
                                        <p className="text-xs text-gray-500 mb-6 max-w-[200px]">Temukan ratusan kegiatan menarik lainnya di halaman Eksplorasi.</p>
                                        <Link 
                                            href="/kegiatan"
                                            className="inline-flex items-center gap-2 rounded-xl bg-[#2F3E8F] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#243070] transition-all shadow-md active:scale-95"
                                        >
                                            <Search className="size-3.5" /> Eksplorasi Sekarang
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </CampLinkLayout>
    );
}
