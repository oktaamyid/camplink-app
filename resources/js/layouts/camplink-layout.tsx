import CampLinkLogo from '@/components/camplink-logo';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { type SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    BookOpen,
    LayoutDashboard,
    MessageSquare,
    Search,
    Settings,
    User,
    Users,
    Power,
    Bookmark,
    ChevronUp,
    ShieldAlert,
    Megaphone
} from 'lucide-react';
import { type ReactNode, useState } from 'react';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';

interface NavGroup {
    label: string;
    items: NavItem[];
}

interface NavItem {
    title: string;
    href: string;
    icon: React.ElementType;
    badge?: number;
}

interface CampLinkLayoutProps {
    children: ReactNode;
}

export default function CampLinkLayout({ children }: CampLinkLayoutProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const [searchQuery, setSearchQuery] = useState('');

    type NotificationItem = {
        id: string;
        created_at: string;
        data?: { action_url?: string; message?: string };
    };
    const notifications = (auth?.user?.notifications as NotificationItem[]) || [];
    const unreadCount = (auth?.user?.unread_notifications_count as number) || 0;
    const unreadMessagesCount = (auth?.user?.unread_messages_count as number) || 0;
    const pendingInisiatorsCount = (auth?.user?.pending_inisiators_count as number) || 0;

    const isAdmin = auth?.user?.role === 'admin';

    const navGroups: NavGroup[] = [
        {
            label: 'UTAMA',
            items: [
                { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
                { title: 'Kegiatan', href: '/kegiatan', icon: BookOpen },
                { title: 'Pengumuman', href: '/pengumuman', icon: Megaphone },
            ]
        },
        {
            label: 'LAYANAN',
            items: [
                { title: 'Tim Saya', href: '/tim', icon: Users },
                { title: 'Pesan', href: '/pesan', icon: MessageSquare, badge: unreadMessagesCount },
                { title: 'Bookmarks', href: '/kegiatan?tab=saved', icon: Bookmark },
            ]
        }
    ];

    if (isAdmin) {
        navGroups.push({
            label: 'ADMINISTRATOR',
            items: [
                { title: 'Verifikasi Inisiator', href: '/admin/inisiator-requests', icon: ShieldAlert, badge: pendingInisiatorsCount },
            ]
        });
    }

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

    const checkActive = (href: string) => {
        const currentUrl = page.url;
        if (href.includes('?')) return currentUrl === href;
        const currentPath = currentUrl.split('?')[0];
        const itemPath = href.split('?')[0];
        if (itemPath === '/dashboard') return currentPath === itemPath;
        if (currentPath.startsWith(itemPath)) {
            if (itemPath === '/kegiatan' && currentUrl.includes('tab=saved')) return false;
            return true;
        }
        return false;
    };

    const userInitials = auth.user.name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();

    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex h-screen w-full bg-[#F5F5F5] dark:bg-[#090D1A] font-sans selection:bg-[#2F3E8F]/10 text-[#111111] dark:text-slate-100">
                {/* Sidebar */}
                <Sidebar collapsible="icon" className="bg-transparent border-none">
                    <div className="flex flex-col h-full bg-white dark:bg-[#111625] rounded-3xl shadow-sm border border-[#EAEAEA] dark:border-slate-800/80 group-data-[state=expanded]:m-2 transition-all duration-300">
                        
                        {/* Sidebar Header - Brand Logo */}
                        <SidebarHeader className="p-4 border-b border-[#F0F0F0] dark:border-slate-800/80 flex flex-row items-center justify-center group-data-[state=expanded]:justify-start group-data-[state=expanded]:px-6 h-16 transition-all">
                            <Link href="/dashboard" className="transition-opacity active:scale-[0.98]">
                                <CampLinkLogo compact={false} textClassName="group-data-[state=collapsed]:hidden font-bold tracking-tight text-[#111111] dark:text-white" />
                            </Link>
                        </SidebarHeader>

                        {/* Sidebar Content */}
                        <SidebarContent className="px-3 py-6 custom-scrollbar group-data-[state=collapsed]:px-1">
                            <SidebarMenu className="gap-8 group-data-[state=collapsed]:gap-4">
                                {navGroups.map((group) => (
                                    <div key={group.label} className="flex flex-col gap-1.5">
                                        <div className="px-3 mb-1 group-data-[state=collapsed]:hidden">
                                            <span className="text-[10px] font-bold text-[#B0B0B0] dark:text-slate-500 tracking-widest uppercase">{group.label}</span>
                                        </div>
                                        <div className="flex flex-col gap-0.5 items-center group-data-[state=expanded]:items-stretch">
                                            {group.items.map((item) => {
                                                const isActive = checkActive(item.href);
                                                
                                                return (
                                                    <SidebarMenuItem key={item.href} className="w-full flex justify-center group-data-[state=expanded]:block">
                                                        <SidebarMenuButton
                                                            asChild
                                                            isActive={isActive}
                                                            tooltip={item.title}
                                                            className={`h-10 rounded-lg px-3 transition-all duration-200 ${
                                                                isActive 
                                                                ? 'bg-white dark:bg-slate-800 border border-[#2F3E8F] dark:border-indigo-500/50 text-[#2F3E8F] dark:text-indigo-400 font-bold shadow-sm' 
                                                                : 'text-[#505050] dark:text-slate-400 hover:bg-[#F8F9FB] dark:hover:bg-slate-800 hover:text-[#111111] dark:hover:text-slate-200'
                                                            } active:scale-[0.98] group-data-[state=collapsed]:size-10 group-data-[state=collapsed]:p-0 group-data-[state=collapsed]:justify-center`}
                                                        >
                                                            <Link href={item.href} className="flex items-center justify-between w-full">
                                                                <div className="flex items-center gap-3 group-data-[state=collapsed]:gap-0 group-data-[state=collapsed]:justify-center w-full">
                                                                    <item.icon className={`size-4.5 shrink-0 ${isActive ? 'text-[#2F3E8F]' : ''}`} />
                                                                    <span className="text-[13px] group-data-[state=collapsed]:hidden whitespace-nowrap">{item.title}</span>
                                                                </div>
                                                                {item.badge !== undefined && item.badge > 0 && (
                                                                    <span className={`size-4.5 rounded-full ${isActive ? 'bg-[#2F3E8F]' : 'bg-[#E53E3E]'} text-[9px] font-bold text-white flex items-center justify-center shrink-0 group-data-[state=collapsed]:absolute group-data-[state=collapsed]:top-1 group-data-[state=collapsed]:right-1`}>
                                                                        {item.badge}
                                                                    </span>
                                                                )}
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </SidebarMenu>
                        </SidebarContent>

                        {/* Sidebar Footer - User Profile Dropdown */}
                        <SidebarFooter className="p-2 border-t border-[#F0F0F0] dark:border-slate-800/80">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton size="lg" className="w-full h-14 rounded-xl hover:bg-[#F8F9FB] dark:hover:bg-slate-800 transition-all active:scale-[0.98] px-2">
                                        <div className="flex items-center justify-between w-full group-data-[state=collapsed]:justify-center">
                                            <div className="flex items-center gap-3 group-data-[state=collapsed]:hidden overflow-hidden">
                                                <div className="size-10 rounded-xl bg-[#FDEBEC] dark:bg-red-950/40 flex items-center justify-center shrink-0 overflow-hidden text-[#9F2F2D] dark:text-red-400">
                                                    {auth.user.avatar ? (
                                                        <img src={auth.user.avatar} alt={auth.user.name} className="size-full object-cover" />
                                                    ) : (
                                                        <span className="text-sm font-bold">{userInitials}</span>
                                                    )}
                                                </div>
                                                <div className="flex flex-col min-w-0 text-left">
                                                    <p className="text-[13px] font-bold text-[#111111] dark:text-slate-200 truncate leading-tight">{auth.user.name}</p>
                                                    <p className="text-[11px] text-[#A0A0A0] dark:text-slate-500 mt-0.5 capitalize truncate">Online</p>
                                                </div>
                                            </div>
                                            
                                            {/* Collapsed Avatar */}
                                            <div className="hidden group-data-[state=collapsed]:flex size-10 rounded-xl bg-[#FDEBEC] dark:bg-red-950/40 items-center justify-center shrink-0 overflow-hidden shadow-sm text-[#9F2F2D] dark:text-red-400">
                                                 {auth.user.avatar ? (
                                                    <img src={auth.user.avatar} alt={auth.user.name} className="size-full object-cover" />
                                                ) : (
                                                    <span className="text-xs font-bold">{userInitials}</span>
                                                )}
                                            </div>

                                            <ChevronUp className="size-4 text-[#B0B0B0] dark:text-slate-600 group-data-[state=collapsed]:hidden shrink-0" />
                                        </div>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="right" align="end" className="w-64 p-2 rounded-2xl shadow-xl border border-[#EAEAEA] dark:border-slate-800 bg-white dark:bg-[#111625] mb-2 animate-in slide-in-from-bottom-2 duration-200">
                                    <div className="px-3 py-2 border-b border-[#F0F0F0] dark:border-slate-800 mb-1">
                                        <p className="text-[11px] font-bold text-[#B0B0B0] dark:text-slate-500 uppercase tracking-wider">Akun Saya</p>
                                    </div>
                                    <DropdownMenuItem asChild className="rounded-xl h-10 px-3 focus:bg-[#F8F9FB] dark:focus:bg-slate-800 cursor-pointer group">
                                        <Link href="/profil" className="flex items-center gap-3">
                                            <User className="size-4 text-[#505050] dark:text-slate-400 group-focus:text-[#2F3E8F] dark:group-focus:text-slate-200" />
                                            <span className="text-sm font-semibold text-[#111111] dark:text-slate-200">Profil Saya</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="rounded-xl h-10 px-3 focus:bg-[#F8F9FB] dark:focus:bg-slate-800 cursor-pointer group">
                                        <Link href={route('profile.edit')} className="flex items-center gap-3">
                                            <Settings className="size-4 text-[#505050] dark:text-slate-400 group-focus:text-[#2F3E8F] dark:group-focus:text-slate-200" />
                                            <span className="text-sm font-semibold text-[#111111] dark:text-slate-200">Pengaturan</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="my-1 bg-[#F0F0F0] dark:bg-slate-800" />
                                    <DropdownMenuItem asChild className="rounded-xl h-10 px-3 focus:bg-[#FFF5F5] dark:focus:bg-red-950/20 cursor-pointer group">
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="flex w-full items-center gap-3"
                                        >
                                            <Power className="size-4 text-red-500" />
                                            <span className="text-sm font-semibold text-red-600">Keluar Sistem</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarFooter>
                    </div>
                </Sidebar>

                {/* Main content */}
                <SidebarInset className="flex flex-1 flex-col min-w-0 bg-transparent py-2 pr-2">
                    <div className="flex flex-col h-full bg-white dark:bg-[#111625] rounded-3xl shadow-sm border border-[#EAEAEA] dark:border-slate-800/80 overflow-hidden">
                        {/* Top header */}
                        <header className="flex h-14 items-center gap-4 bg-white/80 dark:bg-[#111625]/80 backdrop-blur-md px-4 md:px-6 sticky top-0 z-20 border-b border-[#F0F0F0]/50 dark:border-slate-800/50">
                            <div className="flex items-center gap-2 bg-[#F8F9FB] dark:bg-slate-900 rounded-xl border border-[#EAEAEA] dark:border-slate-800 p-1 px-2 shadow-sm">
                                <SidebarTrigger className="size-8 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-[#787774] dark:text-slate-400 transition-colors" />
                                <div className="h-4 w-px bg-[#EAEAEA] dark:bg-slate-800" />
                                <div className="flex items-center gap-2 px-2 max-w-md group">
                                    <Search className="size-3.5 text-[#787774] dark:text-slate-400 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Cari..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-48 md:w-64 bg-transparent py-1 text-[13px] text-[#111111] dark:text-slate-200 placeholder-[#787774] dark:placeholder-slate-500 border-none focus:outline-none focus:ring-0"
                                    />
                                </div>
                            </div>

                             <div className="ml-auto flex items-center gap-2 bg-[#F8F9FB] dark:bg-slate-900 rounded-xl border border-[#EAEAEA] dark:border-slate-800 p-1 px-2 shadow-sm">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="relative flex size-8 items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors focus:outline-none group">
                                            <Bell className="size-4 text-[#787774] dark:text-slate-400 group-hover:text-[#111111] dark:group-hover:text-slate-200" />
                                            {unreadCount > 0 && (
                                                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#E53E3E]" />
                                            )}
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-80 p-1 rounded-xl shadow-lg border border-[#EAEAEA] dark:border-slate-800 bg-white dark:bg-[#111625] text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-100">
                                        <div className="flex items-center justify-between px-3 py-2 border-b border-[#F0F0F0] dark:border-slate-800 mb-1">
                                            <h3 className="text-[12px] font-bold">Notifikasi</h3>
                                            {unreadCount > 0 && (
                                                <button onClick={markAllAsRead} className="text-[10px] font-medium text-[#2F3E8F] dark:text-indigo-400 hover:underline">
                                                    Baca Semua
                                                </button>
                                            )}
                                        </div>
                                        <div className="max-h-80 overflow-y-auto">
                                            {notifications.length === 0 ? (
                                                <div className="px-4 py-8 text-center text-[12px] text-[#787774] dark:text-slate-500">
                                                    Tidak ada notifikasi
                                                </div>
                                            ) : (
                                                notifications.map((notif) => (
                                                    <DropdownMenuItem 
                                                        key={notif.id} 
                                                        className="rounded-lg px-3 py-2 focus:bg-[#F8F9FB] dark:focus:bg-slate-800 cursor-pointer" 
                                                        onSelect={() => markAsRead(notif.id, notif.data?.action_url || '/tim')}
                                                    >
                                                        <div className="flex flex-col gap-0.5 w-full text-left">
                                                            <p className="text-[12px] font-medium text-[#111111] dark:text-slate-200 line-clamp-1">{notif.data?.message}</p>
                                                            <span className="text-[10px] text-[#787774] dark:text-slate-500">{new Date(notif.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                                                        </div>
                                                    </DropdownMenuItem>
                                                ))
                                            )}
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Link href="/pesan" className="flex size-8 items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors">
                                    <MessageSquare className="size-4 text-[#787774] dark:text-slate-400 hover:text-[#111111] dark:hover:text-slate-200" />
                                </Link>

                                <div className="h-4 w-px bg-[#EAEAEA] dark:bg-slate-800" />

                                <AppearanceToggleDropdown />
                            </div>
                        </header>

                        {/* Page content */}
                        <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
                            <div className="max-w-7xl mx-auto">
                                {children}
                            </div>
                        </main>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
