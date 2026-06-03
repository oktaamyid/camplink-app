import { type SharedData } from '@/types';
import CampLinkLogo from '@/components/camplink-logo';
import { Link, usePage, router } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Bell,
    BookOpen,
    Home,
    MessageSquare,
    User,
    Users,
    ChevronDown,
    Search,
    Plus,
    LayoutDashboard,
} from 'lucide-react';
import { type ReactNode, useState } from 'react';

interface NavItem {
    title: string;
    href: string;
    icon: React.ElementType;
}

const navItems: NavItem[] = [
    { title: 'Beranda', href: '/beranda', icon: Home },
    { title: 'Kegiatan', href: '/kegiatan', icon: BookOpen },
    { title: 'Tim Saya', href: '/tim', icon: Users },
    { title: 'Pesan', href: '/pesan', icon: MessageSquare },
    { title: 'Profil', href: '/profil', icon: User },
];

interface CampLinkLayoutProps {
    children: ReactNode;
}

export default function CampLinkLayout({ children }: CampLinkLayoutProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const [searchQuery, setSearchQuery] = useState('');

    const notifications = (auth?.user?.notifications as Record<string, unknown>[]) || [];
    const unreadCount = (auth?.user?.unread_notifications_count as number) || 0;

    const markAsRead = (id: string, url: string = '/tim') => {
        router.post(`/notifikasi/${id}/read`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                router.get(url);
            }
        });
    };

    const markAllAsRead = () => {
        router.post('/notifikasi/read-all', {}, { preserveScroll: true });
    };

    const userInitials = auth.user.name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Sidebar */}
            <aside className="flex w-56 shrink-0 flex-col border-r border-gray-200 bg-white">
                {/* Logo */}
                <div className="flex h-14 items-center px-4 border-b border-gray-100">
                    <CampLinkLogo />
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 py-3 space-y-0.5">
                    {/* Inject Dashboard to the top of navigation */}
                    <Link
                        href="/dashboard"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                            page.url.startsWith('/dashboard')
                                ? 'bg-[#EEF1FA] text-[#2F3E8F]'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                    >
                        <LayoutDashboard
                            className={`size-4 shrink-0 ${page.url.startsWith('/dashboard') ? 'text-[#2F3E8F]' : 'text-gray-400'}`}
                        />
                        {auth.user.role === 'admin' ? 'Dashboard Admin' : 'Dashboard'}
                    </Link>
                    
                    {navItems.map((item) => {
                        const isActive = page.url.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'bg-[#EEF1FA] text-[#2F3E8F]'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                            >
                                <item.icon
                                    className={`size-4 shrink-0 ${isActive ? 'text-[#2F3E8F]' : 'text-gray-400'}`}
                                />
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>

                {/* User profile at bottom */}
                <div className="border-t border-gray-100 p-3">
                    <Link href="/profil" className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-gray-50 transition-colors">
                        <div className="size-8 rounded-full bg-[#2F3E8F] flex items-center justify-center shrink-0">
                            <span className="text-xs font-semibold text-white">{userInitials}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{auth.user.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{auth.user.role === 'mahasiswa' ? 'Mahasiswa' : 'Admin'}</p>
                        </div>
                        <ChevronDown className="size-3 text-gray-400 shrink-0" />
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-1 flex-col min-w-0">
                {/* Top header */}
                <header className="flex h-14 items-center gap-4 border-b border-gray-200 bg-white px-6">
                    <div className="flex flex-1 items-center gap-2 max-w-md">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari kegiatan, lomba, seminar..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F]"
                            />
                        </div>
                    </div>

                    <div className="ml-auto flex items-center gap-3">
                        <Link
                            href="/kegiatan/buat"
                            className="flex items-center gap-2 rounded-lg bg-[#2F3E8F] px-3 py-2 text-sm font-medium text-white hover:bg-[#243070] transition-colors"
                        >
                            <Plus className="size-4" />
                            Buat Kegiatan
                        </Link>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="relative flex size-8 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors focus:outline-none">
                                    <Bell className="size-4 text-gray-600" />
                                    {unreadCount > 0 && (
                                        <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                        </span>
                                    )}
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80">
                                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                                    <h3 className="font-semibold text-sm">Notifikasi</h3>
                                    {unreadCount > 0 && (
                                        <button onClick={markAllAsRead} className="text-xs text-[#2F3E8F] hover:underline">
                                            Tandai semua dibaca
                                        </button>
                                    )}
                                </div>
                                <div className="max-h-75 overflow-y-auto">
                                    {notifications.length === 0 ? (
                                        <div className="px-4 py-6 text-center text-sm text-gray-500">
                                            Belum ada notifikasi baru.
                                        </div>
                                    ) : (
                                        notifications.map((notif: any) => (
                                            <DropdownMenuItem 
                                                key={notif.id} 
                                                className="cursor-pointer border-b border-gray-50 p-0 focus:bg-gray-50" 
                                                onSelect={() => markAsRead(notif.id, notif.data?.action_url || '/tim')}
                                            >
                                                <div className="flex flex-col px-4 py-3 w-full">
                                                    <p className="text-sm font-medium text-gray-900 mb-1">{notif.data?.message || 'Notifikasi baru'}</p>
                                                    <span className="text-xs text-gray-400">{new Date(notif.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                            </DropdownMenuItem>
                                        ))
                                    )}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Link href="/pesan" className="flex size-8 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                            <MessageSquare className="size-4 text-gray-600" />
                        </Link>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}
