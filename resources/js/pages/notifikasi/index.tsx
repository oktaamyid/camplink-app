import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { Bell, CheckCircle2, Users, Calendar, AlertCircle, CheckCheck } from 'lucide-react';
import { type SharedData } from '@/types';

interface DatabaseNotification {
    id: string;
    type: string;
    data: {
        title?: string;
        message?: string;
        activity_id?: number;
        activity_title?: string;
        applicant_name?: string;
        [key: string]: unknown;
    };
    read_at: string | null;
    created_at: string;
}

interface PageProps extends SharedData {
    notifications: {
        data: DatabaseNotification[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

function getNotifIcon(type: string) {
    if (type.includes('TeamApplicationSubmitted')) return { icon: Users, iconColor: 'text-purple-500', iconBg: 'bg-purple-50' };
    if (type.includes('TeamApplicationUpdated')) return { icon: CheckCircle2, iconColor: 'text-green-500', iconBg: 'bg-green-50' };
    if (type.includes('deadline') || type.includes('Deadline')) return { icon: Calendar, iconColor: 'text-orange-500', iconBg: 'bg-orange-50' };
    if (type.includes('cancel') || type.includes('Cancel')) return { icon: AlertCircle, iconColor: 'text-red-500', iconBg: 'bg-red-50' };
    return { icon: Bell, iconColor: 'text-blue-500', iconBg: 'bg-blue-50' };
}

function formatNotifTitle(notif: DatabaseNotification): string {
    if (notif.data.title) return notif.data.title;
    if (notif.type.includes('TeamApplicationSubmitted')) return 'Pelamar baru untuk tim kamu';
    if (notif.type.includes('TeamApplicationUpdated')) return 'Status lamaran timmu diperbarui';
    return 'Notifikasi baru';
}

function formatNotifMessage(notif: DatabaseNotification): string {
    if (notif.data.message) return notif.data.message;
    if (notif.type.includes('TeamApplicationSubmitted')) {
        return `${notif.data.applicant_name ?? 'Seseorang'} mengajukan diri bergabung ke tim ${notif.data.activity_title ?? ''}.`;
    }
    if (notif.type.includes('TeamApplicationUpdated')) {
        return `Lamaran kamu untuk kegiatan ${notif.data.activity_title ?? ''} telah diperbarui.`;
    }
    return 'Klik untuk melihat detail.';
}

function timeAgo(dateStr: string): string {
    const now = new Date();
    const then = new Date(dateStr);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Baru saja';
    if (diffMins < 60) return `${diffMins} menit yang lalu`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs} jam yang lalu`;
    const diffDays = Math.floor(diffHrs / 24);
    return `${diffDays} hari yang lalu`;
}

export default function Notifikasi() {
    const { notifications } = usePage<PageProps>().props;
    const unreadCount = notifications.data.filter((n) => !n.read_at).length;

    const handleClick = (notif: DatabaseNotification) => {
        router.post(`/notifikasi/${notif.id}/read`);
    };

    const handleMarkAllRead = () => {
        router.post('/notifikasi/read-all');
    };

    return (
        <CampLinkLayout>
            <Head title="Notifikasi" />

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <Bell className="size-5 text-[#2F3E8F]" />
                        Notifikasi
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {unreadCount > 0
                            ? `${unreadCount} notifikasi belum dibaca`
                            : 'Semua notifikasi sudah dibaca'}
                    </p>
                </div>
                {unreadCount > 0 && (
                    <button
                        onClick={handleMarkAllRead}
                        className="flex items-center gap-1.5 text-xs font-medium text-[#2F3E8F] hover:underline"
                    >
                        <CheckCheck className="size-3.5" />
                        Tandai semua dibaca
                    </button>
                )}
            </div>

            {notifications.data.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-20 text-center">
                    <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gray-50">
                        <Bell className="size-8 text-gray-300" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">Belum ada notifikasi</h3>
                    <p className="mt-1 text-xs text-gray-500">Notifikasi akan muncul di sini saat ada aktivitas baru.</p>
                </div>
            ) : (
                <>
                    <div className="max-w-2xl space-y-2">
                        {notifications.data.map((notif) => {
                            const { icon: Icon, iconColor, iconBg } = getNotifIcon(notif.type);
                            const isRead = !!notif.read_at;

                            return (
                                <button
                                    key={notif.id}
                                    onClick={() => handleClick(notif)}
                                    className={`w-full flex gap-4 rounded-xl border p-4 transition-colors text-left hover:bg-gray-50 ${
                                        isRead ? 'border-gray-200 bg-white' : 'border-blue-100 bg-blue-50/30'
                                    }`}
                                >
                                    <div className={`flex size-10 flex-shrink-0 items-center justify-center rounded-full ${iconBg}`}>
                                        <Icon className={`size-5 ${iconColor}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <p className="text-sm font-semibold text-gray-900">
                                                {formatNotifTitle(notif)}
                                            </p>
                                            {!isRead && (
                                                <span className="mt-1.5 size-2 flex-shrink-0 rounded-full bg-blue-500" />
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {formatNotifMessage(notif)}
                                        </p>
                                        <p className="mt-2 text-xs text-gray-400">{timeAgo(notif.created_at)}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {notifications.last_page > 1 && (
                        <div className="mt-6 flex max-w-2xl justify-center gap-2">
                            {notifications.links.map((link, i) => (
                                <button
                                    key={i}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                                        link.active
                                            ? 'bg-[#2F3E8F] text-white'
                                            : link.url
                                            ? 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                                            : 'border border-gray-100 text-gray-300 cursor-not-allowed'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </CampLinkLayout>
    );
}
