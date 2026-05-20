import CampLinkLogo from '@/components/camplink-logo';
import { Link, usePage } from '@inertiajs/react';
import {
    Bell,
    BookOpen,
    Home,
    MessageSquare,
    Settings,
    User,
    Users,
    ChevronDown,
    Search,
    Plus,
    Calendar,
    Trophy,
    FlaskConical,
    FolderOpen,
    GraduationCap,
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
    { title: 'Notifikasi', href: '/notifikasi', icon: Bell },
    { title: 'Pesan', href: '/pesan', icon: MessageSquare },
    { title: 'Profil', href: '/profil', icon: User },
    { title: 'Pengaturan', href: '/pengaturan', icon: Settings },
];

interface CampLinkLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function CampLinkLayout({ children, title }: CampLinkLayoutProps) {
    const page = usePage();
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Sidebar */}
            <aside className="flex w-56 flex-shrink-0 flex-col border-r border-gray-200 bg-white">
                {/* Logo */}
                <div className="flex h-14 items-center px-4 border-b border-gray-100">
                    <CampLinkLogo />
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 py-3 space-y-0.5">
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
                                    className={`size-4 flex-shrink-0 ${isActive ? 'text-[#2F3E8F]' : 'text-gray-400'}`}
                                />
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>

                {/* User profile at bottom */}
                <div className="border-t border-gray-100 p-3">
                    <Link href="/profil" className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-gray-50 transition-colors">
                        <div className="size-8 rounded-full bg-[#2F3E8F] flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-semibold text-white">RY</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">Raffa Yuda</p>
                            <p className="text-xs text-gray-500">Mahasiswa</p>
                        </div>
                        <ChevronDown className="size-3 text-gray-400 flex-shrink-0" />
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
                        <button className="relative flex size-8 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                            <Bell className="size-4 text-gray-600" />
                            <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-red-500" />
                        </button>
                        <button className="flex size-8 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                            <MessageSquare className="size-4 text-gray-600" />
                        </button>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}
