import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import CampLinkLogo from '@/components/camplink-logo';
import { type SharedData } from '@/types';
import { Link, usePage, useForm } from '@inertiajs/react';
import { Menu, X, ArrowRight, Instagram, Linkedin, Youtube, LoaderCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import InputError from '@/components/input-error';

const TikTokIcon = ({ className = 'size-4' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

function LoginFormModal({ onSuccess, switchToRegister }: { onSuccess: () => void; switchToRegister: () => void }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
            onSuccess: () => onSuccess(),
        });
    };

    return (
        <form className="flex flex-col gap-4 mt-2 text-left" onSubmit={submit}>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email" className="font-semibold text-xs tracking-wider uppercase text-gray-500 dark:text-slate-400">Alamat Email</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="nama@email.com"
                        className="rounded-xl border-gray-200 dark:border-slate-800 bg-[#F8F9FB] dark:bg-slate-900/50 focus-visible:ring-indigo-500/20 dark:focus-visible:ring-indigo-500/10 focus-visible:border-indigo-500 transition-all duration-200 h-11 px-4 text-slate-800 dark:text-white placeholder:text-slate-400"
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="font-semibold text-xs tracking-wider uppercase text-gray-500 dark:text-slate-400">Kata Sandi</Label>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        required
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Masukkan kata sandi Anda"
                        className="rounded-xl border-gray-200 dark:border-slate-800 bg-[#F8F9FB] dark:bg-slate-900/50 focus-visible:ring-indigo-500/20 dark:focus-visible:ring-indigo-500/10 focus-visible:border-indigo-500 transition-all duration-200 h-11 px-4 text-slate-800 dark:text-white placeholder:text-slate-400"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center space-x-3 py-1">
                    <Checkbox
                        id="remember"
                        name="remember"
                        checked={data.remember}
                        onCheckedChange={(checked) => setData('remember', !!checked)}
                        className="border-gray-300 dark:border-slate-700 data-[state=checked]:bg-[#2563EB] data-[state=checked]:border-[#2563EB] rounded-md"
                    />
                    <Label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none font-medium">Ingat saya</Label>
                </div>

                <Button type="submit" className="mt-2 w-full h-11 rounded-xl bg-[#2563EB] hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold shadow-md transition-all duration-200 active:scale-[0.98] border-none" disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                    Masuk Sistem
                </Button>
            </div>

            <div className="text-center text-sm text-gray-500 dark:text-slate-400 mt-2">
                Belum punya akun?{' '}
                <button type="button" onClick={switchToRegister} className="text-[#2563EB] dark:text-blue-400 hover:underline font-bold ml-1 cursor-pointer">
                    Daftar di sini
                </button>
            </div>
        </form>
    );
}

function RegisterFormModal({ onSuccess, switchToLogin }: { onSuccess: () => void; switchToLogin: () => void }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
            onSuccess: () => onSuccess(),
        });
    };

    return (
        <form className="flex flex-col gap-4 mt-2 text-left" onSubmit={submit}>
            <div className="grid gap-3">
                <div className="grid gap-1.5">
                    <Label htmlFor="reg-name" className="font-semibold text-xs tracking-wider uppercase text-gray-500 dark:text-slate-400">Nama Lengkap</Label>
                    <Input
                        id="reg-name"
                        type="text"
                        required
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Nama Lengkap Anda"
                        className="rounded-xl border-gray-200 dark:border-slate-800 bg-[#F8F9FB] dark:bg-slate-900/50 focus-visible:ring-indigo-500/20 dark:focus-visible:ring-indigo-500/10 focus-visible:border-indigo-500 transition-all duration-200 h-10 px-4 text-slate-800 dark:text-white placeholder:text-slate-400"
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-1.5">
                    <Label htmlFor="reg-email" className="font-semibold text-xs tracking-wider uppercase text-gray-500 dark:text-slate-400">Alamat Email</Label>
                    <Input
                        id="reg-email"
                        type="email"
                        required
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="nama@email.com"
                        className="rounded-xl border-gray-200 dark:border-slate-800 bg-[#F8F9FB] dark:bg-slate-900/50 focus-visible:ring-indigo-500/20 dark:focus-visible:ring-indigo-500/10 focus-visible:border-indigo-500 transition-all duration-200 h-10 px-4 text-slate-800 dark:text-white placeholder:text-slate-400"
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="grid gap-1.5">
                    <Label htmlFor="reg-password" className="font-semibold text-xs tracking-wider uppercase text-gray-500 dark:text-slate-400">Kata Sandi</Label>
                    <Input
                        id="reg-password"
                        type="password"
                        required
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Buat kata sandi minimal 8 karakter"
                        className="rounded-xl border-gray-200 dark:border-slate-800 bg-[#F8F9FB] dark:bg-slate-900/50 focus-visible:ring-indigo-500/20 dark:focus-visible:ring-indigo-500/10 focus-visible:border-indigo-500 transition-all duration-200 h-10 px-4 text-slate-800 dark:text-white placeholder:text-slate-400"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="grid gap-1.5">
                    <Label htmlFor="reg-password-confirmation" className="font-semibold text-xs tracking-wider uppercase text-gray-500 dark:text-slate-400">Konfirmasi Kata Sandi</Label>
                    <Input
                        id="reg-password-confirmation"
                        type="password"
                        required
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        placeholder="Ulangi kata sandi Anda"
                        className="rounded-xl border-gray-200 dark:border-slate-800 bg-[#F8F9FB] dark:bg-slate-900/50 focus-visible:ring-indigo-500/20 dark:focus-visible:ring-indigo-500/10 focus-visible:border-indigo-500 transition-all duration-200 h-10 px-4 text-slate-800 dark:text-white placeholder:text-slate-400"
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                <Button type="submit" className="mt-2 w-full h-11 rounded-xl bg-[#2563EB] hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold shadow-md transition-all duration-200 active:scale-[0.98] border-none" disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                    Daftar Akun Baru
                </Button>
            </div>

            <div className="text-center text-sm text-gray-500 dark:text-slate-400 mt-2">
                Sudah punya akun?{' '}
                <button type="button" onClick={switchToLogin} className="text-[#2563EB] dark:text-blue-400 hover:underline font-bold ml-1 cursor-pointer">
                    Masuk di sini
                </button>
            </div>
        </form>
    );
}

export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage<SharedData>().props;
    const { url } = usePage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('beranda');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (url !== '/') return;
        // IDs must match the DOM (top-to-bottom) order of sections
        const ids = ['beranda', 'tentang', 'event-mendatang', 'kolaborasi-pilihan'];
        const sectionEls = ids
            .map((id) => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];

        // Single observer for all sections — picks the topmost visible one
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .map((e) => e.target.id);
                if (visible.length === 0) return;
                // Prefer the section that appears first in page order
                const topmost = ids.find((id) => visible.includes(id));
                if (topmost) setActiveSection(topmost);
            },
            { rootMargin: '-25% 0px -60% 0px', threshold: 0 },
        );

        sectionEls.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [url]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); }
        setMobileMenuOpen(false);
    };

    // navItems order must match the DOM section order
    const navItems = [
        { label: 'Beranda',    id: 'beranda',             offPageHref: route('home') },
        { label: 'Tentang',    id: 'tentang',              offPageHref: '/#tentang' },
        { label: 'Event',      id: 'event-mendatang',      offPageHref: '/#event-mendatang' },
        { label: 'Kolaborasi', id: 'kolaborasi-pilihan',   offPageHref: '/#kolaborasi-pilihan' },
    ];

    return (
        <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#090D1A] text-slate-700 dark:text-slate-300 transition-colors duration-300 font-sans antialiased relative overflow-x-hidden">
            <style>{`
                .bg-grid-pattern {
                    background-size: 50px 50px;
                    background-image: 
                        linear-gradient(to right, rgba(99, 102, 241, 0.18) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(99, 102, 241, 0.18) 1px, transparent 1px);
                }
                .dark .bg-grid-pattern {
                    background-image: 
                        linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
                }
                @keyframes beam-down {
                    0%   { top: -280px; }
                    100% { top: calc(100% + 280px); }
                }
                @keyframes beam-right {
                    0%   { left: -280px; }
                    100% { left: calc(100% + 280px); }
                }
                .grid-beam-v { position: absolute; width: 1px; height: 280px; animation: beam-down linear infinite; }
                .grid-beam-h { position: absolute; height: 1px; width: 280px; animation: beam-right linear infinite; }
            `}</style>

            {/* Grid Background — full page coverage */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Full-page grid pattern */}
                <div className="absolute inset-0 bg-grid-pattern" />

                {/* ── Vertical beams — positions are exact multiples of 50px (grid cell size) ── */}
                {/* 200px = 4 × 50   */}
                <div className="grid-beam-v bg-gradient-to-b from-transparent via-blue-500/70 to-transparent"
                    style={{ left: '200px', animationDuration: '14s', animationDelay: '0s' }} />
                {/* 450px = 9 × 50   */}
                <div className="grid-beam-v bg-gradient-to-b from-transparent via-indigo-400/60 to-transparent"
                    style={{ left: '450px', animationDuration: '19s', animationDelay: '-7s' }} />
                {/* 700px = 14 × 50  */}
                <div className="grid-beam-v bg-gradient-to-b from-transparent via-blue-500/55 to-transparent"
                    style={{ left: '700px', animationDuration: '16s', animationDelay: '-12s' }} />
                {/* 1000px = 20 × 50 */}
                <div className="grid-beam-v bg-gradient-to-b from-transparent via-violet-400/50 to-transparent"
                    style={{ left: '1000px', animationDuration: '22s', animationDelay: '-4s' }} />
                {/* 1250px = 25 × 50 */}
                <div className="grid-beam-v bg-gradient-to-b from-transparent via-blue-500/65 to-transparent"
                    style={{ left: '1250px', animationDuration: '12s', animationDelay: '-9s' }} />

                {/* ── Horizontal beams — positions are exact multiples of 50px ── */}
                {/* 300px = 6 × 50  */}
                <div className="grid-beam-h bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"
                    style={{ top: '300px', animationDuration: '11s', animationDelay: '-3s' }} />
                {/* 700px = 14 × 50 */}
                <div className="grid-beam-h bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"
                    style={{ top: '700px', animationDuration: '17s', animationDelay: '-8s' }} />
                {/* 1200px = 24 × 50 */}
                <div className="grid-beam-h bg-gradient-to-r from-transparent via-blue-500/55 to-transparent"
                    style={{ top: '1200px', animationDuration: '13s', animationDelay: '-1s' }} />
            </div>

            {/* Navbar — always full-width fixed; inner div becomes pill when scrolled */}
            <header className="fixed inset-x-0 top-0 z-50 flex justify-center transition-[padding,top] duration-300 ease-in-out"
                style={{ paddingTop: scrolled ? '12px' : '0', paddingLeft: scrolled ? '4%' : '0', paddingRight: scrolled ? '4%' : '0' }}
            >
                <div className={`w-full max-w-none transition-all duration-300 ease-in-out ${
                    scrolled
                        ? 'rounded-2xl backdrop-blur-xl bg-white/90 dark:bg-[#090D1A]/92 border border-slate-200/60 dark:border-slate-700/40 shadow-xl shadow-black/10'
                        : 'backdrop-blur-md bg-white/80 dark:bg-[#090D1A]/80 border-b border-slate-100 dark:border-slate-800/80'
                }`}>
                <div className="px-5 h-[68px] flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <button
                            onClick={() => scrollToSection('beranda')}
                            className="transition-opacity active:scale-[0.98] cursor-pointer"
                        >
                            <CampLinkLogo textClassName="font-extrabold text-[#0F172A] dark:text-white text-xl" />
                        </button>
                    </div>

                    {/* Desktop nav links */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = url === '/' ? activeSection === item.id : url.includes(item.id);
                            return url === '/' ? (
                                <button
                                    key={item.label}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`relative px-4 py-1.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                                        isActive
                                            ? 'text-[#2563EB] dark:text-blue-400'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-[#2563EB] dark:hover:text-blue-400 hover:bg-slate-50/60 dark:hover:bg-slate-900/40'
                                    }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#2563EB] dark:bg-blue-500 rounded-full" />
                                    )}
                                </button>
                            ) : (
                                <a
                                    key={item.label}
                                    href={item.offPageHref}
                                    className="relative px-4 py-1.5 text-sm font-semibold rounded-lg transition-all duration-200 text-slate-600 dark:text-slate-400 hover:text-[#2563EB] dark:hover:text-blue-400 hover:bg-slate-50/60 dark:hover:bg-slate-900/40"
                                >
                                    {item.label}
                                </a>
                            );
                        })}
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
                                <button
                                    onClick={() => setLoginOpen(true)}
                                    className="inline-flex items-center justify-center h-10 px-5 rounded-[12px] border border-[#2563EB]/40 text-[#2563EB] dark:border-blue-500/40 dark:text-blue-400 text-sm font-semibold hover:bg-blue-50/50 dark:hover:bg-slate-900/50 transition-all duration-200 cursor-pointer bg-transparent"
                                >
                                    Masuk
                                </button>
                                <button
                                    onClick={() => setRegisterOpen(true)}
                                    className="inline-flex items-center justify-center h-10 px-5 rounded-[12px] bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1d4ed8] transition-all duration-200 active:scale-[0.98] cursor-pointer"
                                >
                                    Daftar
                                </button>
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
                            {navItems.map((item) =>
                                url === '/' ? (
                                    <button
                                        key={item.label}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`text-left text-sm font-bold px-3 py-2 rounded-xl transition-all cursor-pointer ${
                                            activeSection === item.id
                                                ? 'text-[#2563EB] bg-blue-50 dark:bg-blue-950/20'
                                                : 'text-slate-600 dark:text-slate-400 hover:text-[#2563EB] hover:bg-slate-50 dark:hover:bg-slate-900'
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ) : (
                                    <a
                                        key={item.label}
                                        href={item.offPageHref}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-sm font-bold px-3 py-2 rounded-xl transition-all text-slate-600 dark:text-slate-400 hover:text-[#2563EB] hover:bg-slate-50 dark:hover:bg-slate-900"
                                    >
                                        {item.label}
                                    </a>
                                )
                            )}
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
                                    <button
                                        onClick={() => { setMobileMenuOpen(false); setLoginOpen(true); }}
                                        className="inline-flex w-full items-center justify-center h-10 rounded-[12px] border border-[#2563EB]/40 text-[#2563EB] dark:border-blue-500/40 dark:text-blue-400 text-sm font-semibold cursor-pointer bg-transparent"
                                    >
                                        Masuk
                                    </button>
                                    <button
                                        onClick={() => { setMobileMenuOpen(false); setRegisterOpen(true); }}
                                        className="inline-flex w-full items-center justify-center h-10 rounded-[12px] bg-[#2563EB] text-white text-sm font-semibold cursor-pointer"
                                    >
                                        Daftar
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
                </div>{/* /inner pill wrapper */}
            </header>

            {/* Content Body */}
            <main className="relative z-10 w-full pt-[72px]">
                {children}
            </main>

            {/* Detailed Multi-Column Footer */}
            <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#070A13] py-16 relative z-10">
                <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

                    {/* Col 1: Brand Info */}
                    <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-8">
                        <CampLinkLogo textClassName="font-extrabold text-[#0F172A] dark:text-white text-xl" />
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            Platform aktivitas dan kolaborasi mahasiswa untuk menciptakan dampak positif di kampus dan masyarakat.
                        </p>
                        <div className="flex items-center gap-3 pt-2 text-slate-400 dark:text-slate-500">
                            <a href="#" className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors bg-white dark:bg-transparent">
                                <Instagram className="size-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors bg-white dark:bg-transparent">
                                <Linkedin className="size-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors bg-white dark:bg-transparent">
                                <Youtube className="size-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors bg-white dark:bg-transparent">
                                <TikTokIcon className="size-4" />
                            </a>
                        </div>
                    </div>

                    {/* Col 2: Platform Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">Platform</h4>
                        <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
                            <li><a href="#event-mendatang" className="hover:text-[#2563EB] transition-colors">Event</a></li>
                            <li><a href="#kolaborasi-pilihan" className="hover:text-[#2563EB] transition-colors">Kolaborasi</a></li>
                            <li><a href="#kolaborasi-pilihan" className="hover:text-[#2563EB] transition-colors">Proyek Saya</a></li>
                            <li><a href="#kolaborasi-pilihan" className="hover:text-[#2563EB] transition-colors">Notifikasi</a></li>
                        </ul>
                    </div>

                    {/* Col 3: Perusahaan Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">Perusahaan</h4>
                        <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
                            <li><span className="hover:text-[#2563EB] cursor-pointer transition-colors">Tentang Kami</span></li>
                            <li><span className="hover:text-[#2563EB] cursor-pointer transition-colors">Karier</span></li>
                            <li><span className="hover:text-[#2563EB] cursor-pointer transition-colors">Blog</span></li>
                            <li><span className="hover:text-[#2563EB] cursor-pointer transition-colors">Kontak</span></li>
                        </ul>
                    </div>

                    {/* Col 4: Bantuan Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">Bantuan</h4>
                        <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
                            <li><span className="hover:text-[#2563EB] cursor-pointer transition-colors">Pusat Bantuan</span></li>
                            <li><span className="hover:text-[#2563EB] cursor-pointer transition-colors">Syarat & Ketentuan</span></li>
                            <li><span className="hover:text-[#2563EB] cursor-pointer transition-colors">Kebijakan Privasi</span></li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Box */}
                <div className="max-w-[1200px] mx-auto px-6 mt-12 pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="w-full max-w-md">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white">Dapatkan update terbaru</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Berlangganan newsletter Camplink.</p>
                        <div className="flex items-center gap-2 mt-3">
                            <input
                                type="email"
                                placeholder="Masukkan email kamu"
                                className="h-10 px-4 flex-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111625] text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white transition-colors shrink-0">
                                <ArrowRight className="size-4" />
                            </button>
                        </div>
                    </div>

                    <div className="text-xs text-slate-400 dark:text-slate-500 md:self-end">
                        <p>© 2025 CampLink. Semua hak dilindungi.</p>
                    </div>
                </div>
            </footer>

            {/* Login Dialog Modal */}
            <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                <DialogContent className="sm:max-w-[420px] rounded-2xl bg-white dark:bg-[#0E121E] border border-slate-200 dark:border-slate-800/80 p-6 shadow-2xl">
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-xl font-extrabold text-[#0F172A] dark:text-white">Masuk ke CampLink</DialogTitle>
                        <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
                            Masukkan email dan kata sandi Anda untuk masuk ke akun Anda.
                        </DialogDescription>
                    </DialogHeader>
                    <LoginFormModal
                        onSuccess={() => setLoginOpen(false)}
                        switchToRegister={() => {
                            setLoginOpen(false);
                            setRegisterOpen(true);
                        }}
                    />
                </DialogContent>
            </Dialog>

            {/* Register Dialog Modal */}
            <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
                <DialogContent className="sm:max-w-[420px] rounded-2xl bg-white dark:bg-[#0E121E] border border-slate-200 dark:border-slate-800/80 p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-xl font-extrabold text-[#0F172A] dark:text-white">Buat Akun Baru</DialogTitle>
                        <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
                            Masukkan detail Anda di bawah ini untuk mendaftar akun CampLink.
                        </DialogDescription>
                    </DialogHeader>
                    <RegisterFormModal
                        onSuccess={() => setRegisterOpen(false)}
                        switchToLogin={() => {
                            setRegisterOpen(false);
                            setLoginOpen(true);
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
