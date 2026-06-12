import WelcomeLayout from '@/pages/welcome/layout';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Award,
    Bell,
    BookOpen,
    Calendar,
    CalendarCheck,
    CheckSquare,
    Clock,
    Compass,
    Globe,
    LayoutGrid,
    Leaf,
    Lightbulb,
    Mail,
    MapPin,
    MessageSquare,
    Search,
    Share2,
    Star,
    Trash2,
    UserCheck,
    Users,
    type LucideIcon,
} from 'lucide-react';

/* ─────────────── Types ─────────────── */
interface UpcomingEvent {
    id: number;
    title: string;
    location: string | null;
    event_date: string | null;
    poster_url: string | null;
    category: { name: string } | null;
}

interface HomePageProps extends SharedData {
    upcomingEvents: UpcomingEvent[];
}

/* ─────────────── Helpers ─────────────── */
const CATEGORY_BADGE_MAP: Record<string, string> = {
    Lomba: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100/30',
    Seminar: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-100/30',
    Workshop: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-100/30',
    Penelitian: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-100/30',
    Proyek: 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-100/30',
    Sosial: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-100/30',
    Kompetisi: 'bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400 border border-orange-100/30',
};
const DEFAULT_BADGE = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200/30';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=220&fit=crop&auto=format';

function getBadgeColor(name: string | null | undefined) {
    return name ? (CATEGORY_BADGE_MAP[name] ?? DEFAULT_BADGE) : DEFAULT_BADGE;
}
function formatDate(dateStr: string | null): string {
    if (!dateStr) return '-';
    return new Date(dateStr)
        .toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
        .toUpperCase();
}
function formatFullDate(dateStr: string | null): string {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

/* ─────────────── Static Data ─────────────── */
const fallbackEvents: Array<UpcomingEvent & { _staticDate?: string; _time?: string }> = [
    {
        id: 0,
        title: 'Workshop Robotics untuk Pemula',
        location: 'Lab Teknik Elektro, ITB',
        event_date: null,
        poster_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
        category: { name: 'Workshop' },
        _staticDate: '22 MEI',
        _time: '09.00 – 15.00 WIB',
    },
    {
        id: 0,
        title: 'Seminar Karier di Era Digital',
        location: 'Auditorium FISIP, UGM',
        event_date: null,
        poster_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80',
        category: { name: 'Seminar' },
        _staticDate: '25 MEI',
        _time: '10.00 – 12.00 WIB',
    },
    {
        id: 0,
        title: 'Aksi Bersih Kampus & Talkshow',
        location: 'Kampus UI Depok',
        event_date: null,
        poster_url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
        category: { name: 'Sosial' },
        _staticDate: '30 MEI',
        _time: '07.00 – 11.00 WIB',
    },
    {
        id: 0,
        title: 'Competitive Programming Contest',
        location: 'Online',
        event_date: null,
        poster_url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80',
        category: { name: 'Kompetisi' },
        _staticDate: '05 JUN',
        _time: '13.00 – 17.00 WIB',
    },
];

const collaborations = [
    {
        id: 1,
        icon: Leaf,
        name: 'EcoTrack',
        description: 'Aplikasi pelacak jejak karbon di kampus',
        category: 'Lingkungan',
        members: 12,
        color: 'bg-emerald-500',
        tagColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
    },
    {
        id: 2,
        icon: BookOpen,
        name: 'StudyBuddy',
        description: 'Platform belajar kolaboratif antar mahasiswa',
        category: 'Pendidikan',
        members: 18,
        color: 'bg-blue-600',
        tagColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
    },
    {
        id: 3,
        icon: Globe,
        name: 'Campus Connect',
        description: 'Sistem informasi kegiatan kampus terpadu',
        category: 'Teknologi',
        members: 16,
        color: 'bg-indigo-600',
        tagColor: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400',
    },
    {
        id: 4,
        icon: Trash2,
        name: 'WasteWise',
        description: 'Solusi pengelolaan sampah berbasis digital',
        category: 'Lingkungan',
        members: 10,
        color: 'bg-emerald-600',
        tagColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
    },
    {
        id: 5,
        icon: CalendarCheck,
        name: 'Eventify',
        description: 'Manajemen event mahasiswa yang mudah',
        category: 'Sosial',
        members: 14,
        color: 'bg-orange-500',
        tagColor: 'bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400',
    },
] as Array<{ id: number; icon: LucideIcon; name: string; description: string; category: string; members: number; color: string; tagColor: string }>;

/* ─────────────── Component ─────────────── */
export default function Home() {
    const { auth, upcomingEvents } = usePage<HomePageProps>().props;

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.5, ease: 'easeOut' as const },
    };

    const displayEvents: Array<UpcomingEvent & { _staticDate?: string; _time?: string }> =
        upcomingEvents && upcomingEvents.length > 0 ? upcomingEvents : fallbackEvents;

    return (
        <WelcomeLayout>
            <Head title="Platform Aktivitas & Kolaborasi Mahasiswa" />

            {/* ── 1. Hero ── */}
            <section className="px-4 md:px-[8.5%] pt-14 pb-10 md:py-20 grid lg:grid-cols-12 gap-10 items-center">
                {/* Left copy */}
                <div className="lg:col-span-6 space-y-5 text-left">
                    {/* eyebrow */}
                    <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2563EB] bg-blue-50 dark:bg-blue-950/30 border border-blue-100/40 dark:border-blue-800/40 px-3 py-1.5 rounded-full">
                        <span className="size-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                        Platform Aktivitas &amp; Kolaborasi Mahasiswa
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] dark:text-white leading-[1.12]">
                        Temukan aktivitas kampus.{' '}
                        <span className="text-[#2563EB]">Bangun kolaborasi</span>{' '}
                        tanpa batas.
                    </h1>

                    <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
                        Camplink membantu kamu menemukan event menarik, bergabung dengan komunitas, dan membangun ide serta proyek berdampak.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-1">
                        <Link
                            href={auth.user ? route('kegiatan.index') : route('register')}
                            className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-sm transition-all duration-200 active:scale-[0.98] group shadow-lg shadow-blue-500/20"
                        >
                            <span>Mulai Sekarang</span>
                            <ArrowRight className="size-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                        <a
                            href="#event-mendatang"
                            className="inline-flex items-center justify-center h-11 px-5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/50 font-semibold text-sm transition-all duration-200 bg-white dark:bg-transparent"
                        >
                            <Calendar className="size-4 mr-2 text-slate-400" />
                            Lihat Event
                        </a>
                    </div>
                </div>

                {/* Right: Dashboard Mockup */}
                <div className="lg:col-span-6 flex items-center justify-center relative">
                    <div className="w-full max-w-[500px] rounded-[16px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111625] shadow-2xl flex overflow-hidden aspect-[4/3] select-none">
                        {/* Sidebar */}
                        <div className="w-[110px] bg-slate-50 dark:bg-[#0E121E] border-r border-slate-100 dark:border-slate-800/60 p-3 flex flex-col gap-3">
                            <div className="flex items-center gap-1">
                                <div className="size-5 rounded-md bg-[#2563EB] flex items-center justify-center text-[10px] text-white font-black">C</div>
                                <span className="text-[10px] font-black text-slate-800 dark:text-white">Camplink</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                {[
                                    { icon: LayoutGrid, label: 'Beranda', active: true },
                                    { icon: Calendar, label: 'Events', active: false },
                                    { icon: Users, label: 'Tim', active: false },
                                    { icon: MessageSquare, label: 'Pesan', active: false },
                                    { icon: Star, label: 'Proyek Saya', active: false },
                                    { icon: Bell, label: 'Notifikasi', active: false },
                                ].map(({ icon: Icon, label, active }) => (
                                    <div
                                        key={label}
                                        className={`flex items-center gap-2 p-1.5 rounded-lg text-[8.5px] font-semibold ${active ? 'bg-blue-500/10 text-[#2563EB]' : 'text-slate-400'}`}
                                    >
                                        <Icon className="size-3 shrink-0" />
                                        <span className="truncate">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Content panel */}
                        <div className="flex-1 p-3.5 flex flex-col gap-3 bg-white dark:bg-[#111625] overflow-hidden">
                            {/* Search bar */}
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-2.5">
                                <div className="flex items-center gap-2 w-full max-w-[180px] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full px-2.5 py-1 text-slate-400">
                                    <Search className="size-3 shrink-0" />
                                    <span className="text-[9px]">Cari kegiatan...</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Bell className="size-3.5 text-slate-400" />
                                    <div className="size-5 rounded-full bg-slate-200 dark:bg-slate-700" />
                                </div>
                            </div>

                            {/* Event Mendatang mini */}
                            <div className="space-y-1.5 text-left">
                                <div className="flex justify-between items-center">
                                    <span className="text-[9.5px] font-bold text-slate-800 dark:text-white">Event Mendatang</span>
                                    <span className="text-[8px] text-[#2563EB] cursor-pointer">Lihat semua</span>
                                </div>
                                <div className="grid grid-cols-3 gap-1.5">
                                    {[
                                        { img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=200&q=80', date: '24 MEI', title: 'Seminar Nasional Inovasi Pendidikan', place: 'Aula kampus UI', cat: 'Seminar' },
                                        { img: 'https://images.unsplash.com/photo-1581291518655-9523c932ebcf?auto=format&fit=crop&w=200&q=80', date: '27 MEI', title: 'Workshop UI/UX untuk Pemula', place: 'Online', cat: 'Workshop' },
                                        { img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=200&q=80', date: '02 JUN', title: 'Kampus Sehat Fun Run 5K', place: 'Lapangan Pancasila', cat: 'Olahraga' },
                                    ].map((e, i) => (
                                        <div key={i} className="p-1.5 border border-slate-100 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-[#121829]/30 space-y-1">
                                            <div className="h-9 w-full rounded-md overflow-hidden relative">
                                                <img src={e.img} alt={e.title} className="size-full object-cover" />
                                                <span className="absolute top-0.5 left-0.5 text-[5px] bg-[#2563EB] text-white px-0.5 rounded font-bold">{e.date}</span>
                                            </div>
                                            <p className="text-[7px] font-bold text-slate-800 dark:text-white line-clamp-1 leading-tight">{e.title}</p>
                                            <p className="text-[6px] text-slate-400 leading-none">{e.place}</p>
                                            <span className="inline-block text-[5.5px] px-1 rounded bg-blue-50 dark:bg-slate-900 text-[#2563EB] font-bold">{e.cat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom: Kolaborasi & Proyek */}
                            <div className="grid grid-cols-2 gap-2.5 flex-1 overflow-hidden min-h-0 text-left">
                                {/* Kolaborasi Aktif */}
                                <div className="space-y-1 flex flex-col overflow-hidden">
                                    <div className="flex justify-between items-center shrink-0">
                                        <span className="text-[9px] font-bold text-slate-800 dark:text-white">Kolaborasi Aktif</span>
                                        <span className="text-[7.5px] text-[#2563EB] cursor-pointer">Lihat semua</span>
                                    </div>
                                    <div className="space-y-1 flex-1 flex flex-col justify-between overflow-hidden">
                                        {[
                                            { emoji: '🌱', name: 'Aplikasi Donasi Sampah', role: 'Mencari UI/UX Designer', bg: 'bg-emerald-500' },
                                            { emoji: '🎓', name: 'Platform Belajar Anak', role: 'Mencari Backend Dev', bg: 'bg-blue-600' },
                                            { emoji: '📅', name: 'Marketing Event Kampus', role: 'Mencari Content Creator', bg: 'bg-orange-500' },
                                        ].map((c, i) => (
                                            <div key={i} className="flex items-center justify-between p-1 bg-slate-50 dark:bg-[#0E121E] border border-slate-100 dark:border-slate-800 rounded-lg">
                                                <div className="flex items-center gap-1 min-w-0">
                                                    <div className={`size-4 rounded-md ${c.bg} text-white flex items-center justify-center text-[7px] shrink-0`}>{c.emoji}</div>
                                                    <div className="min-w-0">
                                                        <p className="text-[7px] font-bold text-slate-800 dark:text-slate-200 truncate leading-none">{c.name}</p>
                                                        <span className="text-[6px] text-slate-400 leading-none">{c.role}</span>
                                                    </div>
                                                </div>
                                                <span className="text-[5.5px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded shrink-0">Aktif</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Proyek Populer */}
                                <div className="space-y-1 flex flex-col overflow-hidden">
                                    <div className="flex justify-between items-center shrink-0">
                                        <span className="text-[9px] font-bold text-slate-800 dark:text-white">Proyek Populer</span>
                                        <span className="text-[7.5px] text-[#2563EB] cursor-pointer">Lihat semua</span>
                                    </div>
                                    <div className="space-y-1 flex-1 flex flex-col justify-between overflow-hidden">
                                        {[
                                            { emoji: '🌲', name: 'EcoTrack', desc: 'Aplikasi pelacak jejak...', tag: 'Lingkungan', tagCls: 'text-emerald-600 bg-emerald-50 dark:bg-slate-900 dark:text-emerald-400', bg: 'bg-emerald-600' },
                                            { emoji: '📚', name: 'StudyBuddy', desc: 'Platform belajar kolaboratif...', tag: 'Pendidikan', tagCls: 'text-blue-600 bg-blue-50 dark:bg-slate-900 dark:text-blue-400', bg: 'bg-blue-600' },
                                            { emoji: '🌐', name: 'Campus Connect', desc: 'Sistem informasi kegiatan...', tag: 'Teknologi', tagCls: 'text-purple-700 bg-purple-50 dark:bg-slate-900 dark:text-purple-400', bg: 'bg-indigo-600' },
                                        ].map((p, i) => (
                                            <div key={i} className="flex items-center justify-between p-1 bg-slate-50 dark:bg-[#0E121E] border border-slate-100 dark:border-slate-800 rounded-lg">
                                                <div className="flex items-center gap-1 min-w-0">
                                                    <div className={`size-4 rounded-md ${p.bg} text-white flex items-center justify-center text-[7px] shrink-0`}>{p.emoji}</div>
                                                    <div className="min-w-0">
                                                        <p className="text-[7px] font-bold text-slate-800 dark:text-slate-200 truncate leading-none">{p.name}</p>
                                                        <span className="text-[6px] text-slate-400 leading-none">{p.desc}</span>
                                                    </div>
                                                </div>
                                                <span className={`text-[5.5px] font-bold px-1 rounded shrink-0 ${p.tagCls}`}>{p.tag}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. Stats Bar ── */}
            <section className="px-4 md:px-[8.5%] py-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: Users, value: '48.250+', label: 'Mahasiswa', color: 'text-blue-500' },
                        { icon: Calendar, value: '1.230+', label: 'Event', color: 'text-purple-500' },
                        { icon: Compass, value: '356+', label: 'Ide Kolaborasi', color: 'text-orange-500' },
                        { icon: Award, value: '2.890+', label: 'Kolaborasi Aktif', color: 'text-emerald-500' },
                    ].map(({ icon: Icon, value, label, color }, i) => (
                        <motion.div
                            key={label}
                            {...fadeInUp}
                            transition={{ delay: i * 0.07 }}
                            className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-[#0E121E] shadow-sm"
                        >
                            <div className={`size-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center shrink-0 ${color}`}>
                                <Icon className="size-5" />
                            </div>
                            <div className="text-left min-w-0">
                                <p className="text-lg font-extrabold text-[#0F172A] dark:text-white leading-none">{value}</p>
                                <p className="text-xs text-slate-400 font-medium mt-0.5">{label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── 3. Event Mendatang ── */}
            <section id="event-mendatang" className="px-4 md:px-[8.5%] py-12 space-y-6">
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest">Event Pilihan</span>
                            <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-0.5">Event Mendatang</h2>
                        </div>
                        <Link href={route('kegiatan.index')} className="text-sm font-semibold text-[#2563EB] hover:underline flex items-center gap-1">
                            Lihat semua <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {displayEvents.map((event, index) => {
                        const cat = event.category?.name ?? null;
                        const badge = getBadgeColor(cat);
                        const dateLabel =
                            (event as typeof fallbackEvents[0])._staticDate ?? formatDate(event.event_date);
                        const timeLabel = (event as typeof fallbackEvents[0])._time ?? null;
                        const image = event.poster_url ?? FALLBACK_IMAGE;
                        const isDb = event.id > 0;

                        return (
                            <motion.div
                                key={event.id || index}
                                {...fadeInUp}
                                transition={{ delay: index * 0.07 }}
                                className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-[#0E121E] overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col group text-left"
                            >
                                {/* Poster */}
                                <div className="relative h-40 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    <img src={image} alt={event.title} className="size-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${badge}`}>
                                        {dateLabel}
                                    </span>
                                </div>

                                {/* Body */}
                                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold text-[#0F172A] dark:text-white line-clamp-2 leading-snug group-hover:text-[#2563EB] transition-colors">
                                            {event.title}
                                        </h3>
                                        <div className="flex flex-col gap-1 text-xs text-slate-500 dark:text-slate-400">
                                            <span className="flex items-center gap-2">
                                                <MapPin className="size-3.5 shrink-0 text-slate-400" />
                                                <span className="truncate">{event.location ?? 'Online'}</span>
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Clock className="size-3.5 shrink-0 text-slate-400" />
                                                <span>{timeLabel ?? formatFullDate(event.event_date)}</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-3">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${badge}`}>{cat ?? 'Umum'}</span>
                                        {isDb && (
                                            <Link href={route('login')} className="text-[10px] font-semibold text-[#2563EB] hover:underline flex items-center gap-0.5">
                                                Daftar <ArrowRight className="size-3" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* ── 4. Fitur Platform ── */}
            <section className="px-4 md:px-[8.5%] py-12 space-y-10">
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] dark:text-white">
                        Semua yang kamu butuhkan dalam satu platform
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                    {[
                        { icon: Search, label: 'Cari Event Kampus', desc: 'Temukan berbagai event sesuai minat dan jadwalmu.', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
                        { icon: Lightbulb, label: 'Ajukan Ide / Proyek', desc: 'Ubah ide menjadi proyek nyata bersama kampus.', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400' },
                        { icon: Share2, label: 'Cari Partner Kolaborasi', desc: 'Temukan partner dengan keahlian yang kamu butuhkan.', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' },
                        { icon: Bell, label: 'Pengingat Event', desc: 'Dapatkan pengingat schedule dan update penting.', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
                        { icon: CheckSquare, label: 'Pendaftaran Mudah', desc: 'Daftar event favoritmu dengan cepat dan praktis.', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
                        { icon: Mail, label: 'Notifikasi Aktivitas', desc: 'Pantau update kolaborasi secara real-time.', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
                    ].map(({ icon: Icon, label, desc, color }, i) => (
                        <motion.div
                            key={label}
                            {...fadeInUp}
                            transition={{ delay: i * 0.06 }}
                            className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0E121E] shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                        >
                            <div className={`size-12 rounded-xl flex items-center justify-center ${color}`}>
                                <Icon className="size-5" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xs font-bold text-slate-800 dark:text-white">{label}</h4>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── 5. Cara Kerja ── */}
            <section className="px-4 md:px-[8.5%] py-12 space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl font-extrabold text-[#0F172A] dark:text-white">Cara Kerja</h2>
                </div>

                <div className="flex flex-col lg:flex-row items-stretch gap-4">
                    {[
                        { step: 1, icon: UserCheck, title: 'Buat Akun', desc: 'Daftar gratis menggunakan akun kampusmu dalam beberapa klik.' },
                        { step: 2, icon: Search, title: 'Jelajahi Event', desc: 'Temukan event menarik dan ide kolaborasi sesuai minat dan keahlianmu.' },
                        { step: 3, icon: Users, title: 'Ajukan / Gabung Kolaborasi', desc: 'Ajukan ide atau bergabung dalam kolaborasi untuk mewujudkan proyek bersama.' },
                    ].map(({ step, icon: Icon, title, desc }, i) => (
                        <div key={step} className="flex lg:flex-row items-center gap-4 flex-1">
                            <motion.div
                                {...fadeInUp}
                                transition={{ delay: i * 0.1 }}
                                className="flex-1 flex items-start gap-4 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-[#0E121E] shadow-sm relative"
                            >
                                <span className="absolute -top-3.5 -left-3.5 size-7 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center shadow-md">
                                    {step}
                                </span>
                                <div className="size-12 rounded-xl bg-slate-50 dark:bg-[#111625] border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                                    <Icon className="size-6 text-slate-500 dark:text-slate-400" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-slate-800 dark:text-white">{title}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                                </div>
                            </motion.div>
                            {i < 2 && (
                                <div className="hidden lg:flex items-center text-[#2563EB] dark:text-blue-500 shrink-0 px-1">
                                    <ArrowRight className="size-5" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ── 6. Kolaborasi Pilihan ── */}
            <section id="kolaborasi-pilihan" className="px-4 md:px-[8.5%] py-12 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Kolaborasi Pilihan</h2>
                    <Link href={auth.user ? route('tim.index') : route('register')} className="text-sm font-semibold text-[#2563EB] hover:underline flex items-center gap-1">
                        Lihat semua <ArrowRight className="size-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {collaborations.map((col, i) => (
                        <motion.div
                            key={col.id}
                            {...fadeInUp}
                            transition={{ delay: i * 0.06 }}
                            className="flex flex-col gap-3 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-[#0E121E] shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 text-left"
                        >
                            <div className="flex items-center gap-2.5">
                                <div className={`size-9 rounded-xl ${col.color} text-white flex items-center justify-center shrink-0`}>
                                    <col.icon className="size-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{col.name}</p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-snug line-clamp-1">{col.description}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-1 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${col.tagColor}`}>{col.category}</span>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                    <Users className="size-3" /> {col.members} anggota
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── 7. CTA ── */}
            <section className="px-4 md:px-[8.5%] pb-24 py-6">
                <div className="relative rounded-[24px] overflow-hidden bg-[#2563EB] text-white shadow-2xl">
                    {/* Decorative background circles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -right-20 -top-20 size-80 rounded-full bg-white/5" />
                        <div className="absolute -right-10 bottom-0 size-56 rounded-full bg-white/5" />
                    </div>

                    <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center p-8 md:p-14">
                        {/* Left text */}
                        <div className="space-y-5">
                            <div className="space-y-3">
                                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                                    Siap terhubung dan berkolaborasi?
                                </h2>
                                <p className="text-sm text-blue-100 leading-relaxed max-w-[44ch]">
                                    Bergabunglah dengan mahasiswa dari berbagai kampus terbaik di Indonesia dan wujudkan idemu bersama!
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-white text-[#2563EB] font-bold text-sm shadow-md hover:bg-slate-50 transition-all duration-200 active:scale-[0.98] gap-2"
                                >
                                    Mulai Sekarang
                                    <ArrowRight className="size-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Right image */}
                        <div className="hidden lg:flex items-end justify-end h-full">
                            <img
                                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80"
                                alt="Mahasiswa berkolaborasi"
                                className="h-52 w-auto object-cover rounded-2xl shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </WelcomeLayout>
    );
}
