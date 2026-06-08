import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import CampLinkLogo from '@/components/camplink-logo';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage<SharedData>().props;
    const { url } = usePage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { label: 'Home', href: route('home'), active: url === '/' },
        { label: 'About', href: route('about'), active: url === '/about' },
        { label: 'Service', href: route('service'), active: url === '/service' },
        { label: 'FAQ', href: route('faq'), active: url === '/faq' },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#090D1A] text-slate-700 dark:text-slate-300 transition-colors duration-300 font-sans antialiased relative overflow-x-hidden">
            {/* Header Navbar - Fixed Glassmorphism */}
            <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-[#090D1A]/70 border-b border-white/20 dark:border-slate-800/80 transition-all duration-200 shadow-xs">
                <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href={route('home')} className="transition-opacity active:scale-[0.98]">
                            <CampLinkLogo textClassName="font-extrabold text-[#0F172A] dark:text-white" />
                        </Link>
                    </div>

                    {/* Menu links */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`text-sm font-semibold transition-all duration-200 relative py-1.5 ${
                                    item.active
                                        ? 'text-[#2563EB] dark:text-blue-500 font-bold'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-[#2563EB] dark:hover:text-blue-500'
                                }`}
                            >
                                {item.label}
                                {item.active && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2563EB] dark:bg-blue-500 rounded-full" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Auth & Theme buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <AppearanceToggleDropdown />
                        {auth.user ? (
                            <Link
                                href={route('beranda')}
                                className="inline-flex items-center justify-center h-10 px-5 rounded-[12px] bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1d4ed8] transition-all duration-200 active:scale-[0.98]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center justify-center h-10 px-5 rounded-[12px] border border-[#2563EB] text-[#2563EB] dark:border-blue-500 dark:text-blue-500 text-sm font-semibold hover:bg-blue-50/50 dark:hover:bg-slate-900/50 transition-all duration-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center justify-center h-10 px-5 rounded-[12px] bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1d4ed8] transition-all duration-200 active:scale-[0.98]"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu trigger */}
                    <div className="flex md:hidden items-center gap-3">
                        <AppearanceToggleDropdown />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors"
                        >
                            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-b border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-[#090D1A]/95 backdrop-blur-lg px-6 py-4 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`text-sm font-bold px-3 py-2 rounded-xl transition-all ${
                                        item.active
                                            ? 'bg-blue-50/80 dark:bg-slate-800/80 text-[#2563EB]'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-[#2563EB]'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="h-[1px] bg-slate-100 dark:bg-slate-800" />
                        <div className="flex flex-col gap-2">
                            {auth.user ? (
                                <Link
                                    href={route('beranda')}
                                    className="inline-flex w-full items-center justify-center h-10 rounded-[12px] bg-[#2563EB] text-white text-sm font-semibold"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex w-full items-center justify-center h-10 rounded-[12px] border border-[#2563EB] text-[#2563EB] dark:border-blue-500 dark:text-blue-500 text-sm font-semibold"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex w-full items-center justify-center h-10 rounded-[12px] bg-[#2563EB] text-white text-sm font-semibold"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Content Body */}
            <main className="relative z-10 w-full pt-[72px]">
                {children}
            </main>

            {/* Detailed Multi-Column Footer */}
            <footer className="border-t border-slate-100 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0A0F1D] py-16 relative z-10">
                <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                    
                    {/* Col 1: Brand Info */}
                    <div className="lg:col-span-1 space-y-4">
                        <CampLinkLogo textClassName="font-extrabold text-[#0F172A] dark:text-white" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            Platform kegiatan mahasiswa & kolaborasi kampus untuk masa depan yang lebih baik.
                        </p>
                        <div className="flex items-center gap-4 pt-2 text-slate-400 dark:text-slate-500">
                            {/* Simple mock social media icons */}
                            <span className="hover:text-[#2563EB] cursor-pointer"><span className="text-xs">IG</span></span>
                            <span className="hover:text-[#2563EB] cursor-pointer"><span className="text-xs">IN</span></span>
                            <span className="hover:text-[#2563EB] cursor-pointer"><span className="text-xs">YT</span></span>
                            <span className="hover:text-[#2563EB] cursor-pointer"><span className="text-xs">TW</span></span>
                        </div>
                    </div>

                    {/* Col 2: Platform Links */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">Platform</h4>
                        <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
                            <li><Link href={route('about')} className="hover:text-[#2563EB] transition-colors">About</Link></li>
                            <li><Link href={route('service')} className="hover:text-[#2563EB] transition-colors">Service</Link></li>
                            <li><Link href={route('faq')} className="hover:text-[#2563EB] transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Col 3: Perusahaan Links */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">Perusahaan</h4>
                        <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
                            <li><span className="hover:text-[#2563EB] cursor-pointer transition-colors">Tentang Kami</span></li>
                            <li><span className="hover:text-[#2563EB] cursor-pointer transition-colors">Karier</span></li>
                            <li><span className="hover:text-[#2563EB] cursor-pointer transition-colors">Blog</span></li>
                            <li><span className="hover:text-[#2563EB] cursor-pointer transition-colors">Kontak</span></li>
                        </ul>
                    </div>

                    {/* Col 4: Bantuan Links */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">Bantuan</h4>
                        <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
                            <li><span className="hover:text-[#2563EB] cursor-pointer transition-colors">Pusat Bantuan</span></li>
                            <li><span className="hover:text-[#2563EB] cursor-pointer transition-colors">Panduan</span></li>
                            <li><span className="hover:text-[#2563EB] cursor-pointer transition-colors">Kebijakan Privasi</span></li>
                            <li><span className="hover:text-[#2563EB] cursor-pointer transition-colors">Syarat & Ketentuan</span></li>
                        </ul>
                    </div>

                    {/* Col 5: App Download Links */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">Unduh Aplikasi</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Segera hadir di iOS dan Android.</p>
                        <div className="flex flex-col gap-2 pt-1 max-w-[140px]">
                            {/* App download link layouts */}
                            <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-left cursor-pointer hover:border-[#2563EB] dark:hover:border-blue-500 transition-all select-none">
                                <span className="text-base"></span>
                                <div>
                                    <p className="text-[7px] text-slate-400 uppercase tracking-widest leading-none">Download on the</p>
                                    <p className="text-[10px] font-bold text-[#0F172A] dark:text-white leading-tight mt-0.5">App Store</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-left cursor-pointer hover:border-[#2563EB] dark:hover:border-blue-500 transition-all select-none">
                                <span className="text-base text-emerald-500">▶</span>
                                <div>
                                    <p className="text-[7px] text-slate-400 uppercase tracking-widest leading-none">GET IT ON</p>
                                    <p className="text-[10px] font-bold text-[#0F172A] dark:text-white leading-tight mt-0.5">Google Play</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Line */}
                <div className="max-w-[1200px] mx-auto px-6 mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                    <p>© 2026 CampLink. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
