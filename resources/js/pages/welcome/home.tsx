import WelcomeLayout from '@/pages/welcome/layout';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Award,
    Bell,
    Calendar,
    Compass,
    Folder,
    GraduationCap,
    LayoutGrid,
    Lightbulb,
    Mail,
    MapPin,
    Search,
    Share2,
    Users,
    Clock,
    UserCheck,
    CheckSquare,
    Leaf,
    Globe,
    Trash2
} from 'lucide-react';

interface UpcomingEvent {
    event_date: string;
    category?: { name: string };
    title: string;
    location?: string;
    poster_url?: string;
}

export default function Home({ upcomingEvents = [] }: { upcomingEvents?: UpcomingEvent[] }) {
    const { auth } = usePage<SharedData>().props;

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    };

    const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=220&fit=crop&auto=format';

    // 4 Default Static Fallback Events
    const defaultEvents = [
        {
            title: 'Workshop Robotics untuk Pemula',
            date: '22 MEI',
            location: 'Lab Teknik Elektro, ITB',
            time: '09.00 - 15.00 WIB',
            category: 'Workshop',
            badgeColor: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100/30',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
        },
        {
            title: 'Seminar Karier di Era Digital',
            date: '25 MEI',
            location: 'Auditorium FISIP, UGM',
            time: '10.00 - 12.00 WIB',
            category: 'Seminar',
            badgeColor: 'bg-purple-50 text-purple-650 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-100/30',
            image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80',
        },
        {
            title: 'Aksi Bersih Kampus & Talkshow',
            date: '30 MEI',
            location: 'Kampus UI Depok',
            time: '07.00 - 11.00 WIB',
            category: 'Sosial',
            badgeColor: 'bg-emerald-50 text-emerald-650 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-100/30',
            image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
        },
        {
            title: 'Competitive Programming Contest',
            date: '05 JUN',
            location: 'Online',
            time: '13.00 - 17.00 WIB',
            category: 'Kompetisi',
            badgeColor: 'bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400 border border-orange-100/30',
            image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80',
        },
    ];

    // Map upcoming events from DB
    const dbMappedEvents = (upcomingEvents || []).map((event: UpcomingEvent) => {
        let formattedDate = '01 JAN';
        if (event.event_date) {
            const date = new Date(event.event_date);
            const months = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'];
            const day = date.getDate().toString().padStart(2, '0');
            const month = months[date.getMonth()];
            formattedDate = `${day} ${month}`;
        }

        const categoryName = event.category?.name || 'Umum';
        let badgeColor = 'bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-400 border border-slate-100/30';
        const lowerName = categoryName.toLowerCase();
        if (lowerName.includes('workshop')) {
            badgeColor = 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100/30';
        } else if (lowerName.includes('seminar')) {
            badgeColor = 'bg-purple-50 text-purple-650 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-100/30';
        } else if (lowerName.includes('sosial') || lowerName.includes('lingkungan')) {
            badgeColor = 'bg-emerald-50 text-emerald-650 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-100/30';
        } else if (lowerName.includes('kompetisi') || lowerName.includes('lomba') || lowerName.includes('kegiatan')) {
            badgeColor = 'bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400 border border-orange-100/30';
        }

        return {
            title: event.title,
            date: formattedDate,
            location: event.location || 'Online',
            time: '09.00 - Selesai',
            category: categoryName,
            badgeColor: badgeColor,
            image: event.poster_url || FALLBACK_IMAGE,
        };
    });

    const featuredEvents = [...dbMappedEvents, ...defaultEvents].slice(0, 4);

    // 5 Kolaborasi Pilihan
    const collabPilihan = [
        {
            name: 'EcoTrack',
            description: 'Aplikasi pelacak jejak karbon untuk kampus',
            members: '12 anggota',
            category: 'Lingkungan',
            bgClass: 'bg-emerald-500 text-white',
            tagColor: 'bg-emerald-50 text-emerald-600 dark:bg-slate-900 dark:text-emerald-400 border border-emerald-100/20',
            icon: Leaf
        },
        {
            name: 'StudyBuddy',
            description: 'Platform belajar kolaboratif untuk mahasiswa',
            members: '18 anggota',
            category: 'Pendidikan',
            bgClass: 'bg-blue-600 text-white',
            tagColor: 'bg-blue-50 text-blue-600 dark:bg-slate-900 dark:text-blue-400 border border-blue-100/20',
            icon: GraduationCap
        },
        {
            name: 'Campus Connect',
            description: 'Sistem informasi kegiatan kampus terintegrasi',
            members: '16 anggota',
            category: 'Teknologi',
            bgClass: 'bg-indigo-600 text-white',
            tagColor: 'bg-purple-50 text-purple-600 dark:bg-slate-900 dark:text-purple-400 border border-purple-100/20',
            icon: Globe
        },
        {
            name: 'WasteWise',
            description: 'Inovasi pengelolaan sampah cerdas',
            members: '10 anggota',
            category: 'Lingkungan',
            bgClass: 'bg-teal-600 text-white',
            tagColor: 'bg-emerald-50 text-emerald-600 dark:bg-slate-900 dark:text-emerald-400 border border-emerald-100/20',
            icon: Trash2
        },
        {
            name: 'Eventify',
            description: 'Manajemen event kampus lebih mudah',
            members: '14 anggota',
            category: 'Sosial',
            bgClass: 'bg-orange-500 text-white',
            tagColor: 'bg-orange-50 text-orange-600 dark:bg-slate-900 dark:text-orange-400 border border-orange-100/20',
            icon: Calendar
        }
    ];

    return (
        <WelcomeLayout>
            <Head title="Tempat Kegiatan Mahasiswa & Kolaborasi Kampus" />

            {/* 1. Hero Section */}
            <section className="relative w-full overflow-hidden bg-linear-to-b from-blue-50/20 via-transparent to-transparent dark:from-blue-950/5 dark:via-transparent dark:to-transparent">
                <div className="max-w-300 mx-auto px-6 pt-16 pb-20 md:py-24 grid lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left: Copy */}
                    <div className="lg:col-span-6 space-y-6 text-left max-w-xl">
                        {/* Tagline */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100/30 dark:border-blue-900/30">
                            <span className="text-xs font-semibold text-[#2563EB] dark:text-blue-400">
                                Platform Aktivitas & Kolaborasi Mahasiswa
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] dark:text-white leading-tight">
                            Temukan aktivitas kampus. Bangun <span className="text-[#2563EB] dark:text-blue-500">kolaborasi</span> tanpa batas.
                        </h1>
                        
                        <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                            Camplink membantu mahasiswa menemukan event menarik, bergabung dengan kolaborasi, dan berkolaborasi mewujudkan ide serta proyek berdampak.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link
                                href={auth.user ? route('kegiatan.index') : route('register')}
                                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-sm transition-all duration-200 active:scale-[0.98] group shadow-lg shadow-blue-500/10"
                            >
                                <span>Mulai Sekarang</span>
                                <ArrowRight className="size-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                            </Link>
                            <a
                                href="#event-mendatang"
                                className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 font-semibold text-sm transition-all duration-200 active:scale-[0.98] bg-white dark:bg-transparent"
                            >
                                <Calendar className="size-4 mr-2 text-slate-400 dark:text-slate-400" />
                                <span>Lihat Event</span>
                            </a>
                        </div>
                    </div>

                    {/* Right: Custom Dashboard Mockup */}
                    <div className="lg:col-span-6 flex items-center justify-center relative w-full pt-6 lg:pt-0">
                        {/* Decorative blur elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-87.5 h-87.5 bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[80px] -z-10" />

                        {/* Main Mockup container */}
                        <div className="w-full max-w-135 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0E121E] shadow-2xl flex overflow-hidden aspect-4/3 relative z-10 select-none">
                            
                            {/* Mock sidebar */}
                            <div className="w-31.25 bg-[#FAFBFD] dark:bg-[#090D15] border-r border-slate-100 dark:border-slate-800/60 p-3 flex flex-col gap-5 text-left shrink-0">
                                <div className="flex items-center gap-1.5 px-1">
                                    <img src="/logo.png" alt="Logo" className="size-5.5 shrink-0 object-contain" />
                                    <span className="text-[10.5px] font-black text-slate-800 dark:text-white">Camplink</span>
                                </div>
                                
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#2563EB]/10 text-[#2563EB] text-[9.5px] font-bold">
                                        <LayoutGrid className="size-3" />
                                        <span>Beranda</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-1.5 rounded-lg text-slate-400 dark:text-slate-500 text-[9.5px] font-semibold">
                                        <Calendar className="size-3" />
                                        <span>Event</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-1.5 rounded-lg text-slate-400 dark:text-slate-500 text-[9.5px] font-semibold">
                                        <Share2 className="size-3" />
                                        <span>Kolaborasi</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-1.5 rounded-lg text-slate-400 dark:text-slate-500 text-[9.5px] font-semibold">
                                        <Folder className="size-3" />
                                        <span>Proyek Saya</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-1.5 rounded-lg text-slate-400 dark:text-slate-500 text-[9.5px] font-semibold">
                                        <Bell className="size-3" />
                                        <span>Notifikasi</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-1.5 rounded-lg text-slate-400 dark:text-slate-500 text-[9.5px] font-semibold">
                                        <Mail className="size-3" />
                                        <span>Pesan</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-1.5 rounded-lg text-slate-400 dark:text-slate-500 text-[9.5px] font-semibold">
                                        <Compass className="size-3" />
                                        <span>Profil</span>
                                    </div>
                                </div>
                            </div>

                            {/* Mock content panel */}
                            <div className="flex-1 p-4 space-y-4.5 flex flex-col bg-white dark:bg-[#0E121E] overflow-hidden">
                                {/* Search & Nav */}
                                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-2.5">
                                    <div className="flex items-center gap-2 w-full max-w-55 bg-slate-50 dark:bg-[#111625] border border-slate-100 dark:border-slate-800 rounded-lg px-2.5 py-1 text-slate-400">
                                        <Search className="size-3" />
                                        <span className="text-[9.5px]">Cari event, kolaborasi, proyek...</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Bell className="size-3.5 text-slate-400 dark:text-slate-500" />
                                        <div className="size-5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative border border-slate-100 dark:border-slate-700">
                                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" className="size-full object-cover" />
                                        </div>
                                    </div>
                                </div>

                                {/* Event Mendatang */}
                                <div className="space-y-2 text-left">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-slate-800 dark:text-white">Event Mendatang</span>
                                        <span className="text-[8.5px] text-[#2563EB] hover:underline cursor-pointer">Lihat semua</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {/* Event 1 */}
                                        <div className="p-1.5 border border-slate-100 dark:border-slate-800/80 rounded-lg bg-[#FAFBFD]/50 dark:bg-[#121829]/30 text-left space-y-1 relative">
                                            <div className="h-10 w-full bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden relative">
                                                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=200&q=80" className="size-full object-cover" />
                                                <span className="absolute top-1 left-1 text-[5px] bg-[#2563EB] text-white px-1 py-0.2 rounded font-bold">24 MEI</span>
                                            </div>
                                            <h5 className="text-[7.5px] font-bold text-slate-800 dark:text-white line-clamp-1 leading-tight">Seminar Nasional Inovasi Pendidikan</h5>
                                            <p className="text-[6.5px] text-slate-400 dark:text-slate-500 leading-none">Aula kampus UI</p>
                                            <span className="inline-block text-[5.5px] px-1 py-0.2 rounded bg-blue-50 dark:bg-slate-900 text-[#2563EB] dark:text-blue-400 font-bold">Seminar</span>
                                        </div>
                                        {/* Event 2 */}
                                        <div className="p-1.5 border border-slate-100 dark:border-slate-800/80 rounded-lg bg-[#FAFBFD]/50 dark:bg-[#121829]/30 text-left space-y-1 relative">
                                            <div className="h-10 w-full bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden relative">
                                                <img src="https://images.unsplash.com/photo-1581291518655-9523c932ebcf?auto=format&fit=crop&w=200&q=80" className="size-full object-cover" />
                                                <span className="absolute top-1 left-1 text-[5px] bg-[#2563EB] text-white px-1 py-0.2 rounded font-bold">27 MEI</span>
                                            </div>
                                            <h5 className="text-[7.5px] font-bold text-slate-800 dark:text-white line-clamp-1 leading-tight">Workshop UI/UX untuk Pemula</h5>
                                            <p className="text-[6.5px] text-slate-400 dark:text-slate-500 leading-none">Online</p>
                                            <span className="inline-block text-[5.5px] px-1 py-0.2 rounded bg-amber-50 dark:bg-slate-900 text-amber-600 dark:text-amber-400 font-bold">Workshop</span>
                                        </div>
                                        {/* Event 3 */}
                                        <div className="p-1.5 border border-slate-100 dark:border-slate-800/80 rounded-lg bg-[#FAFBFD]/50 dark:bg-[#121829]/30 text-left space-y-1 relative">
                                            <div className="h-10 w-full bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden relative">
                                                <img src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=200&q=80" className="size-full object-cover" />
                                                <span className="absolute top-1 left-1 text-[5px] bg-[#2563EB] text-white px-1 py-0.2 rounded font-bold">02 JUN</span>
                                            </div>
                                            <h5 className="text-[7.5px] font-bold text-slate-800 dark:text-white line-clamp-1 leading-tight">Kampus Sehat Fun Run 5K</h5>
                                            <p className="text-[6.5px] text-slate-450 dark:text-slate-500 leading-none">Lapangan Pancasila</p>
                                            <span className="inline-block text-[5.5px] px-1 py-0.2 rounded bg-emerald-50 dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 font-bold">Olahraga</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Grid: Kolaborasi & Proyek */}
                                <div className="grid grid-cols-2 gap-3 flex-1 overflow-hidden min-h-0 text-left">
                                    
                                    {/* Kolaborasi Aktif */}
                                    <div className="space-y-1.5 flex flex-col overflow-hidden">
                                        <div className="flex justify-between items-center shrink-0">
                                            <span className="text-[9.5px] font-bold text-slate-800 dark:text-white">Kolaborasi Aktif</span>
                                            <span className="text-[8px] text-[#2563EB] hover:underline cursor-pointer">Lihat semua</span>
                                        </div>
                                        <div className="space-y-1.5 overflow-hidden flex-1 flex flex-col justify-between">
                                            <div className="flex items-center justify-between p-1 bg-slate-50 dark:bg-[#111625] border border-slate-100 dark:border-slate-800 rounded-lg">
                                                <div className="flex items-center gap-1.5 min-w-0">
                                                    <div className="size-5 rounded-md bg-emerald-500 text-white flex items-center justify-center text-[8px] font-bold shrink-0">🌱</div>
                                                    <div className="min-w-0">
                                                        <p className="text-[7.5px] font-bold text-slate-800 dark:text-slate-350 truncate leading-none">Aplikasi Donasi Sampah</p>
                                                        <span className="text-[6.5px] text-slate-450 dark:text-slate-500 leading-none">Mencari UI/UX Designer</span>
                                                    </div>
                                                </div>
                                                <span className="text-[6px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-100/20 shrink-0">Aktif</span>
                                            </div>
                                            <div className="flex items-center justify-between p-1 bg-slate-50 dark:bg-[#111625] border border-slate-100 dark:border-slate-800 rounded-lg">
                                                <div className="flex items-center gap-1.5 min-w-0">
                                                    <div className="size-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold shrink-0">🎓</div>
                                                    <div className="min-w-0">
                                                        <p className="text-[7.5px] font-bold text-slate-800 dark:text-slate-350 truncate leading-none">Platform Belajar Anak</p>
                                                        <span className="text-[6.5px] text-slate-450 dark:text-slate-500 leading-none">Mencari Backend Developer</span>
                                                    </div>
                                                </div>
                                                <span className="text-[6px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-100/20 shrink-0">Aktif</span>
                                            </div>
                                            <div className="flex items-center justify-between p-1 bg-slate-50 dark:bg-[#111625] border border-slate-100 dark:border-slate-800 rounded-lg">
                                                <div className="flex items-center gap-1.5 min-w-0">
                                                    <div className="size-5 rounded-md bg-orange-500 text-white flex items-center justify-center text-[8px] font-bold shrink-0">📅</div>
                                                    <div className="min-w-0">
                                                        <p className="text-[7.5px] font-bold text-slate-800 dark:text-slate-350 truncate leading-none">Marketing Event Kampus</p>
                                                        <span className="text-[6.5px] text-slate-450 dark:text-slate-500 leading-none">Mencari Content Creator</span>
                                                    </div>
                                                </div>
                                                <span className="text-[6px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-100/20 shrink-0">Aktif</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Proyek Populer */}
                                    <div className="space-y-1.5 flex flex-col overflow-hidden">
                                        <div className="flex justify-between items-center shrink-0">
                                            <span className="text-[9.5px] font-bold text-slate-800 dark:text-white">Proyek Populer</span>
                                            <span className="text-[8px] text-[#2563EB] hover:underline cursor-pointer">Lihat semua</span>
                                        </div>
                                        <div className="space-y-1.5 overflow-hidden flex-1 flex flex-col justify-between">
                                            <div className="flex items-center justify-between p-1 bg-slate-50 dark:bg-[#111625] border border-slate-100 dark:border-slate-800 rounded-lg">
                                                <div className="flex items-center gap-1.5 min-w-0">
                                                    <div className="size-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[8px] font-bold shrink-0">🌲</div>
                                                    <div className="min-w-0">
                                                        <p className="text-[7.5px] font-bold text-slate-800 dark:text-slate-350 truncate leading-none">EcoTrack</p>
                                                        <span className="text-[6.5px] text-slate-400 dark:text-slate-500 leading-none">Aplikasi pelacak jejak...</span>
                                                    </div>
                                                </div>
                                                <span className="text-[5.5px] font-bold bg-emerald-50 dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 px-1 py-0.2 rounded shrink-0">Lingkungan</span>
                                            </div>
                                            <div className="flex items-center justify-between p-1 bg-slate-50 dark:bg-[#111625] border border-slate-100 dark:border-slate-800 rounded-lg">
                                                <div className="flex items-center gap-1.5 min-w-0">
                                                    <div className="size-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold shrink-0">📚</div>
                                                    <div className="min-w-0">
                                                        <p className="text-[7.5px] font-bold text-slate-800 dark:text-slate-350 truncate leading-none">StudyBuddy</p>
                                                        <span className="text-[6.5px] text-slate-400 dark:text-slate-500 leading-none">Platform belajar kolaboratif...</span>
                                                    </div>
                                                </div>
                                                <span className="text-[5.5px] font-bold bg-blue-50 dark:bg-slate-900 text-blue-600 dark:text-blue-400 px-1 py-0.2 rounded shrink-0">Pendidikan</span>
                                            </div>
                                            <div className="flex items-center justify-between p-1 bg-slate-50 dark:bg-[#111625] border border-slate-100 dark:border-slate-800 rounded-lg">
                                                <div className="flex items-center gap-1.5 min-w-0">
                                                    <div className="size-5 rounded-md bg-indigo-600 text-white flex items-center justify-center text-[8px] shrink-0">🌐</div>
                                                    <div className="min-w-0">
                                                        <p className="text-[7.5px] font-bold text-slate-800 dark:text-slate-350 truncate leading-none">Campus Connect</p>
                                                        <span className="text-[6.5px] text-slate-400 dark:text-slate-500 leading-none">Sistem informasi kegiatan...</span>
                                                    </div>
                                                </div>
                                                <span className="text-[5.5px] font-bold bg-purple-50 dark:bg-slate-900 text-purple-650 dark:text-purple-400 px-1 py-0.2 rounded shrink-0">Teknologi</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Stats Block Row */}
            <section className="max-w-300 mx-auto px-6 py-6 pb-14">
                <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-[#0E121E] p-6 py-8 shadow-sm">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                        {/* Stats 1: Mahasiswa */}
                        <div className="flex items-center justify-center gap-4 text-left">
                            <div className="size-12 rounded-xl bg-blue-500/10 dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 flex items-center justify-center shrink-0">
                                <Users className="size-6" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">48.250+</p>
                                <p className="text-xs font-semibold text-slate-400 dark:text-slate-400">Mahasiswa</p>
                            </div>
                        </div>

                        {/* Stats 2: Event */}
                        <div className="flex items-center justify-center gap-4 text-left">
                            <div className="size-12 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                <Calendar className="size-6" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">1.230+</p>
                                <p className="text-xs font-semibold text-slate-400 dark:text-slate-400">Event</p>
                            </div>
                        </div>

                        {/* Stats 3: Ide Kolaborasi */}
                        <div className="flex items-center justify-center gap-4 text-left">
                            <div className="size-12 rounded-xl bg-purple-500/10 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                                <Lightbulb className="size-6" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">356+</p>
                                <p className="text-xs font-semibold text-slate-400 dark:text-slate-400">Ide Kolaborasi</p>
                            </div>
                        </div>

                        {/* Stats 4: Kolaborasi Aktif */}
                        <div className="flex items-center justify-center gap-4 text-left">
                            <div className="size-12 rounded-xl bg-orange-500/10 dark:bg-orange-950/40 text-orange-655 dark:text-orange-400 flex items-center justify-center shrink-0">
                                <Award className="size-6" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">2.890+</p>
                                <p className="text-xs font-semibold text-slate-400 dark:text-slate-400">Kolaborasi Aktif</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Event Mendatang Section */}
            <section id="event-mendatang" className="max-w-300 mx-auto px-6 py-12 pb-16 space-y-8 scroll-mt-20">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 text-left">
                    <div className="space-y-1">
                        <span className="text-xs font-bold text-[#2563EB] dark:text-blue-500 uppercase tracking-widest">Event Pilihan</span>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white">Event Mendatang</h2>
                    </div>
                    <Link href={route('kegiatan.index')} className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 shrink-0">
                        <span>Lihat semua</span>
                        <ArrowRight className="size-3.5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredEvents.map((event, index) => (
                        <motion.div
                            key={index}
                            {...fadeInUp}
                            transition={{ delay: index * 0.08 }}
                            className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-[#0E121E] overflow-hidden shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-355 flex flex-col h-full group text-left"
                        >
                            {/* Card Image */}
                            <div className="h-44 w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden shrink-0">
                                <img src={event.image} alt={event.title} className="size-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                                <div className="absolute top-3 left-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-lg px-2.5 py-1 text-center flex flex-col justify-center min-w-13.5">
                                    <span className="text-[10px] font-black text-[#2563EB] dark:text-blue-400 leading-none">
                                        {event.date.split(' ')[0]}
                                    </span>
                                    <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 leading-none">
                                        {event.date.split(' ')[1]}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Card content */}
                            <div className="p-4.5 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-3">
                                    <h3 className="text-sm font-bold text-[#0F172A] dark:text-white line-clamp-2 leading-snug group-hover:text-[#2563EB] dark:group-hover:text-blue-500 transition-colors">
                                        {event.title}
                                    </h3>
                                    
                                    <div className="space-y-1.5 text-slate-500 dark:text-slate-400 text-xs flex flex-col gap-0.5">
                                        <span className="flex items-center gap-2">
                                            <MapPin className="size-3.5 text-slate-400 dark:text-slate-500" />
                                            <span className="truncate">{event.location}</span>
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Clock className="size-3.5 text-slate-400 dark:text-slate-500" />
                                            <span>{event.time}</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-3.5">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${event.badgeColor}`}>
                                        {event.category}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4. Features Section */}
            <section className="max-w-300 mx-auto px-6 py-12 pb-16 space-y-12">
                <div className="text-center space-y-2 max-w-xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] dark:text-white">
                        Semua yang kamu butuhkan dalam satu platform
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Feature 1 */}
                    <motion.div 
                        {...fadeInUp} 
                        className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0E121E] shadow-xs text-left"
                    >
                        <div className="size-10.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                            <Search className="size-5" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-white">Cari Event Kampus</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Temukan berbagai event menarik sesuai minat dan jadwalmu.
                            </p>
                        </div>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div 
                        {...fadeInUp} 
                        transition={{ delay: 0.05 }} 
                        className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0E121E] shadow-xs text-left"
                    >
                        <div className="size-10.5 rounded-lg bg-purple-500/10 text-purple-650 dark:text-purple-450 flex items-center justify-center shrink-0">
                            <Lightbulb className="size-5" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-white">Ajukan Ide / Proyek</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Ubah ide menjadi proyek nyata dan dapatkan dukungan dari kampus.
                            </p>
                        </div>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div 
                        {...fadeInUp} 
                        transition={{ delay: 0.1 }} 
                        className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0E121E] shadow-xs text-left"
                    >
                        <div className="size-10.5 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                            <Share2 className="size-5" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-white">Cari Partner Kolaborasi</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Temukan partner dengan keahlian yang kamu butuhkan untuk berkolaborasi.
                            </p>
                        </div>
                    </motion.div>

                    {/* Feature 4 */}
                    <motion.div 
                        {...fadeInUp} 
                        transition={{ delay: 0.15 }} 
                        className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0E121E] shadow-xs text-left"
                    >
                        <div className="size-10.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                            <Bell className="size-5" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-white">Pengingat Event</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Dapatkan pengingat schedule dan update penting event.
                            </p>
                        </div>
                    </motion.div>

                    {/* Feature 5 */}
                    <motion.div 
                        {...fadeInUp} 
                        transition={{ delay: 0.2 }} 
                        className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0E121E] shadow-xs text-left"
                    >
                        <div className="size-10.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <CheckSquare className="size-5" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-white">Pendaftaran Mudah</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Daftar event favoritmu dengan cepat dan praktis.
                            </p>
                        </div>
                    </motion.div>

                    {/* Feature 6 */}
                    <motion.div 
                        {...fadeInUp} 
                        transition={{ delay: 0.25 }} 
                        className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0E121E] shadow-xs text-left"
                    >
                        <div className="size-10.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                            <Mail className="size-5" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-white">Notifikasi Aktivitas</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Pantau update kolaborasi dan aktivitas penting secara real-time.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 5. Cara Kerja Section */}
            <section id="cara-kerja" className="max-w-300 mx-auto px-6 py-12 pb-16 space-y-12 scroll-mt-20">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] dark:text-white">Cara Kerja</h2>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 xl:gap-12 text-left">
                    {/* Step 1 */}
                    <motion.div 
                        {...fadeInUp} 
                        className="flex-1 w-full flex items-center gap-4 p-5.5 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-[#0E121E] shadow-xs relative"
                    >
                        <span className="absolute -top-3.5 -left-3.5 size-7 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center shadow-md">
                            1
                        </span>
                        <div className="size-12 rounded-xl bg-slate-50 dark:bg-[#111625] border border-slate-200 flex items-center justify-center shrink-0">
                            <UserCheck className="size-6 text-slate-500 dark:text-slate-400" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-white">Buat Akun</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Daftar gratis menggunakan email atau akun kampusmu dalam hitungan detik.
                            </p>
                        </div>
                    </motion.div>

                    {/* Arrow 1 */}
                    <div className="hidden lg:flex items-center text-[#2563EB] dark:text-blue-500 shrink-0">
                        <ArrowRight className="size-6" />
                    </div>

                    {/* Step 2 */}
                    <motion.div 
                        {...fadeInUp} 
                        transition={{ delay: 0.1 }}
                        className="flex-1 w-full flex items-center gap-4 p-5.5 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-[#0E121E] shadow-xs relative"
                    >
                        <span className="absolute -top-3.5 -left-3.5 size-7 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center shadow-md">
                            2
                        </span>
                        <div className="size-12 rounded-xl bg-slate-50 dark:bg-[#111625] border border-slate-200 flex items-center justify-center shrink-0">
                            <Search className="size-6 text-slate-500 dark:text-slate-400" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-white">Jelajahi Event</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Temukan event menarik dan ide kolaborasi sesuai minat dan keahlianmu.
                            </p>
                        </div>
                    </motion.div>

                    {/* Arrow 2 */}
                    <div className="hidden lg:flex items-center text-[#2563EB] dark:text-blue-500 shrink-0">
                        <ArrowRight className="size-6" />
                    </div>

                    {/* Step 3 */}
                    <motion.div 
                        {...fadeInUp} 
                        transition={{ delay: 0.2 }}
                        className="flex-1 w-full flex items-center gap-4 p-5.5 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-[#0E121E] shadow-xs relative"
                    >
                        <span className="absolute -top-3.5 -left-3.5 size-7 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center shadow-md">
                            3
                        </span>
                        <div className="size-12 rounded-xl bg-slate-50 dark:bg-[#111625] border border-slate-200 flex items-center justify-center shrink-0">
                            <Users className="size-6 text-slate-500 dark:text-slate-400" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-white">Ajukan / Gabung Kolaborasi</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                Ajukan ide atau bergabung dalam kolaborasi untuk mewujudkan proyek bersama.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 6. Kolaborasi Pilihan Section */}
            <section id="kolaborasi-pilihan" className="max-w-300 mx-auto px-6 py-12 pb-16 space-y-8 scroll-mt-20">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 text-left">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] dark:text-white">Kolaborasi Pilihan</h2>
                    <Link href={route('home')} className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 shrink-0">
                        <span>Lihat semua</span>
                        <ArrowRight className="size-3.5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                    {collabPilihan.map((col, index) => {
                        const IconComponent = col.icon;
                        return (
                            <motion.div
                                key={index}
                                {...fadeInUp}
                                transition={{ delay: index * 0.05 }}
                                className="rounded-2xl border border-slate-200/50 dark:border-slate-800 bg-white dark:bg-[#0E121E] p-4.5 shadow-xs hover:-translate-y-1 hover:shadow-sm transition-all duration-300 flex flex-col justify-between gap-3 text-left"
                            >
                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-3 items-start">
                                        <div className={`size-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 shadow-inner ${col.bgClass}`}>
                                            <IconComponent className="size-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate">{col.name}</h4>
                                            <p className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-2 mt-0.5 leading-snug">{col.description}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                                    <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded ${col.tagColor}`}>
                                        {col.category}
                                    </span>
                                    <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                        <Users className="size-3 text-slate-400 dark:text-slate-500" />
                                        {col.members}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* 7. Call To Action (CTA) Banner */}
            <section className="max-w-300 mx-auto px-6 py-10 pb-20">
                <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-blue-900 text-white p-8 md:p-14 lg:p-16 shadow-2xl flex flex-col lg:flex-row items-center gap-10 lg:gap-14 text-left">
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />

                    {/* Left text column */}
                    <div className="flex-1 space-y-6 relative z-10">
                        <div className="space-y-3">
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight max-w-lg">
                                Siap terhubung dan berkolaborasi?
                            </h2>
                            <p className="text-sm md:text-base text-blue-100 leading-relaxed max-w-md">
                                Bergabunglah dengan ribuan mahasiswa lainnya di Camplink dan wujudkan ide terbaikmu sekarang!
                            </p>
                        </div>

                        <div className="pt-2">
                            <Link
                                href={auth.user ? route('kegiatan.index') : route('register')}
                                className="inline-flex items-center justify-center h-12 pl-6 pr-2 rounded-xl bg-white hover:bg-slate-50 text-[#2563EB] font-bold text-sm shadow-md transition-all duration-200 active:scale-[0.98] group"
                            >
                                <span className="mr-4">Mulai Sekarang</span>
                                <span className="size-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center transition-transform duration-250 group-hover:translate-x-0.5">
                                    <ArrowRight className="size-4" />
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Right image column */}
                    <div className="flex-1 w-full max-w-105 relative z-10 shrink-0 select-none">
                        <div className="rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl aspect-4/3 bg-blue-900 relative">
                            <img 
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                                alt="Kolaborasi Mahasiswa" 
                                className="size-full object-cover" 
                            />
                        </div>
                    </div>
                </div>
            </section>
        </WelcomeLayout>
    );
}
