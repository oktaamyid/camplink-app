import CampLinkLogo from '@/components/camplink-logo';
import { Link } from '@inertiajs/react';
import { Sparkles, Users, BookOpen } from 'lucide-react';

export default function AuthLayout({ children, title, description }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <div className="relative min-h-screen grid lg:grid-cols-2 bg-[#F8F9FB] dark:bg-[#090D1A] transition-colors duration-300">
            {/* Left Panel: Desktop Visual Branding (Hidden on mobile) */}
            <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-gradient-to-br from-[#0A0E1A] via-[#11182D] to-[#0D1324] border-r border-slate-800/60 select-none">
                {/* Glow Nodes */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-sky-500/10 blur-[120px] pointer-events-none" />
                
                {/* Top: Logo */}
                <div className="relative z-10 flex items-center">
                    <Link href="/beranda" className="transition-opacity active:scale-[0.98]">
                        <CampLinkLogo className="scale-110 origin-left" textClassName="text-white font-extrabold tracking-tight" />
                    </Link>
                </div>

                {/* Middle: Tagline & Interactive Mockup Card */}
                <div className="relative z-10 my-auto max-w-lg space-y-10">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                            <Sparkles className="size-3.5" />
                            <span>Platform Kegiatan Mahasiswa #1</span>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
                            Hubungkan Kegiatan,<br />
                            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-300 bg-clip-text text-transparent">Kolaborasi Bersama Tim</span>,<br />
                            & Bangun Portfolio Hebat.
                        </h1>
                        <p className="text-slate-400 text-base leading-relaxed">
                            CampLink membantu mahasiswa STT-NF menemukan kegiatan menarik, berkolaborasi dalam tim, mengajukan inisiator kegiatan, dan memamerkan portfolio pencapaian secara terintegrasi.
                        </p>
                    </div>

                    {/* Premium glassmorphic preview widget */}
                    <div className="backdrop-blur-md bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                            <span className="text-xs font-bold text-slate-300 tracking-wider uppercase">Menu Layanan Utama</span>
                            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex gap-3 items-start p-2 rounded-lg hover:bg-white/[0.02] transition-colors">
                                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 shrink-0">
                                    <Users className="size-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-white">Kolaborasi Tim</p>
                                    <p className="text-[10px] text-slate-400 mt-0.5">Cari rekan untuk proyek/kegiatan</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start p-2 rounded-lg hover:bg-white/[0.02] transition-colors">
                                <div className="p-2 rounded-lg bg-sky-500/20 text-sky-300 shrink-0">
                                    <BookOpen className="size-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-white">Eksplorasi Kegiatan</p>
                                    <p className="text-[10px] text-slate-400 mt-0.5">Temukan webinar, lomba, & proyek</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom: Footer Info */}
                <div className="relative z-10 text-xs text-slate-500 flex justify-between">
                    <span>© {new Date().getFullYear()} CampLink. All rights reserved.</span>
                    <span>STT Terpadu Nurul Fikri</span>
                </div>
            </div>

            {/* Right Panel: Auth Form Pane */}
            <div className="flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
                {/* Glow Decoration behind the card in Light/Dark Mode */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/[0.03] blur-[80px] pointer-events-none" />

                <div className="w-full max-w-[460px] relative z-10">
                    {/* Brand Logo for Mobile only (hidden on desktop left-panel) */}
                    <div className="flex justify-center mb-8 lg:hidden">
                        <Link href="/beranda" className="transition-opacity active:scale-[0.98]">
                            <CampLinkLogo textClassName="font-extrabold tracking-tight text-[#111111] dark:text-white" />
                        </Link>
                    </div>

                    {/* Elegant Form Card */}
                    <div className="bg-white dark:bg-[#111625]/90 border border-gray-200/80 dark:border-slate-800/80 rounded-[24px] shadow-xl shadow-gray-100/50 dark:shadow-none p-8 sm:p-10 transition-all duration-300">
                        {/* Title and Description */}
                        <div className="space-y-2 mb-8 text-center sm:text-left">
                            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                                {title}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-slate-400">
                                {description}
                            </p>
                        </div>

                        {/* Page-Specific Forms */}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
