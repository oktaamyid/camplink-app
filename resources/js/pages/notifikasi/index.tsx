import CampLinkLayout from '@/layouts/camplink-layout';
import { Head } from '@inertiajs/react';
import { Bell, CheckCircle2, Users, Calendar, AlertCircle } from 'lucide-react';

const notifications = [
    {
        id: 1,
        type: 'accepted',
        icon: CheckCircle2,
        iconColor: 'text-green-500',
        iconBg: 'bg-green-50',
        title: 'Permintaan bergabung diterima',
        message: 'Kamu diterima di tim National Business Plan Competition 2024 sebagai Backend Developer.',
        time: '2 jam yang lalu',
        isRead: false,
    },
    {
        id: 2,
        type: 'new_event',
        icon: Bell,
        iconColor: 'text-blue-500',
        iconBg: 'bg-blue-50',
        title: 'Kegiatan baru: Workshop UI/UX Design',
        message: 'Ada kegiatan baru yang mungkin kamu minati. Workshop UI/UX Design - 28 Mei 2024 di Lab Komputer.',
        time: '5 jam yang lalu',
        isRead: false,
    },
    {
        id: 3,
        type: 'deadline',
        icon: AlertCircle,
        iconColor: 'text-orange-500',
        iconBg: 'bg-orange-50',
        title: 'Pengingat deadline pendaftaran',
        message: 'Deadline pendaftaran LKTI Nasional 2024 adalah 3 hari lagi. Segera daftar sebelum terlambat!',
        time: '1 hari yang lalu',
        isRead: true,
    },
    {
        id: 4,
        type: 'team',
        icon: Users,
        iconColor: 'text-purple-500',
        iconBg: 'bg-purple-50',
        title: 'Anggota baru bergabung ke tim kamu',
        message: 'Dinda Aulia telah bergabung ke timmu sebagai UI/UX Designer untuk kegiatan Business Plan Competition.',
        time: '2 hari yang lalu',
        isRead: true,
    },
    {
        id: 5,
        type: 'deadline',
        icon: Calendar,
        iconColor: 'text-red-500',
        iconBg: 'bg-red-50',
        title: 'Kegiatan besok: Seminar AI & Masa Depan',
        message: 'Jangan lupa! Seminar AI & Masa Depan Teknologi akan diadakan besok di Auditorium Kampus.',
        time: '3 hari yang lalu',
        isRead: true,
    },
];

export default function Notifikasi() {
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return (
        <CampLinkLayout>
            <Head title="Notifikasi" />

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Notifikasi</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : 'Semua notifikasi sudah dibaca'}
                    </p>
                </div>
                {unreadCount > 0 && (
                    <button className="text-xs font-medium text-[#2F3E8F] hover:underline">
                        Tandai semua dibaca
                    </button>
                )}
            </div>

            <div className="max-w-2xl space-y-2">
                {notifications.map((notif) => {
                    const Icon = notif.icon;
                    return (
                        <div
                            key={notif.id}
                            className={`flex gap-4 rounded-xl border p-4 transition-colors cursor-pointer hover:bg-gray-50 ${
                                notif.isRead ? 'border-gray-200 bg-white' : 'border-blue-100 bg-blue-50/30'
                            }`}
                        >
                            <div className={`flex size-10 flex-shrink-0 items-center justify-center rounded-full ${notif.iconBg}`}>
                                <Icon className={`size-5 ${notif.iconColor}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                    <p className={`text-sm font-semibold ${notif.isRead ? 'text-gray-900' : 'text-gray-900'}`}>
                                        {notif.title}
                                    </p>
                                    {!notif.isRead && (
                                        <span className="mt-1 size-2 flex-shrink-0 rounded-full bg-blue-500" />
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">{notif.message}</p>
                                <p className="mt-2 text-xs text-gray-400">{notif.time}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </CampLinkLayout>
    );
}
