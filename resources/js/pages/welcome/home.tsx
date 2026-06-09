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
    LayoutGrid,
    Lightbulb,
    MapPin,
    MessageSquare,
    Search,
    Star,
    Users,
} from 'lucide-react';

export default function Home() {
    const { auth } = usePage<SharedData>().props;

    const fadeInUp = {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    };

    // 4 Featured Events
    const featuredEvents = [
        {
            title: 'Seminar Nasional Inovasi & Teknologi',
            date: '25 Mei 2024 • 09.00 WIB',
            location: 'Aula Rektorat',
            category: 'Seminar',
            badge: 'Upcoming',
            badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/30',
            peserta: '120+ peserta',
            image: 'https://picsum.photos/seed/seminar/640/360',
        },
        {
            title: 'Campus Career Expo 2024',
            date: '30 Mei 2024 • 10.00 WIB',
            location: 'Gedung Serbaguna',
            category: 'Karier',
            badge: 'Open',
            badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/30',
            peserta: '80+ peserta',
            image: 'https://picsum.photos/seed/career/640/360',
        },
        {
            title: 'Workshop Desain UI/UX',
            date: '3 Juni 2024 • 13.00 WIB',
            location: 'Lab Komputer',
            category: 'Workshop',
            badge: 'Limited Seat',
            badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/30',
            peserta: '24+ peserta',
            image: 'https://picsum.photos/seed/uiux/640/360',
        },
        {
            title: 'Lomba Karya Tulis Mahasiswa',
            date: '10 Juni 2024 • 09.00 WIB',
            location: 'Online',
            category: 'Kompetisi',
            badge: 'New',
            badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400 border border-orange-200/30',
            peserta: '60+ peserta',
            image: 'https://picsum.photos/seed/lomba/640/360',
        },
    ];

    // Testimonials
    const testimonials = [
        { name: 'Dinda A.', role: 'Anggota Komunitas', quote: '“Camplink membantuku menemukan komunitas yang sesuai dengan minatku. Sekarang aku jadi lebih aktif di kampus!”' },
        { name: 'Rizky Pratama', role: 'Koordinator Event', quote: '“Event kami jadi lebih dikenal banyak mahasiswa berkat Camplink. Pendaftaran juga jauh lebih mudah.”' },
        { name: 'Salsa B.', role: 'Mahasiswa', quote: '“Aku berhasil menemukan teman satu tim untuk lomba UI/UX dan kami berhasil meraih juara 1!”' },
    ];

    // Activity Feed Logs
    const activityLogs = [
        { title: 'Workshop Desain UI/UX mendapat 24 pendaftar baru', time: '2 jam yang lalu', type: 'registration' },
        { title: 'Komunitas Kewirausahaan Mahasiswa membuat postingan baru', time: '5 jam yang lalu', type: 'post' },
        { title: 'Rizky bergabung di proyek Aplikasi Edukasi Kampus', time: '1 hari yang lalu', type: 'join' },
    ];

    return (
        <WelcomeLayout>
            <Head title="Tempat Kegiatan Mahasiswa & Kolaborasi Kampus" />

            {/* 1. Hero Section */}
            <section className="max-w-[1200px] mx-auto px-6 pt-16 pb-20 md:py-24 grid lg:grid-cols-12 gap-12 items-center">
                
                {/* Left: Copy */}
                <div className="lg:col-span-6 space-y-6 text-left max-w-xl">
                    <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] dark:text-white leading-tight">
                        Tempat Kegiatan<br />
                        <span className="text-[#2563EB]">Mahasiswa &</span><br />
                        Kolaborasi Kampus
                    </h1>
                    
                    <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                        Camplink membantu kamu menemukan kegiatan kampus, bergabung dengan komunitas, dan berkolaborasi dalam proyek yang berdampak.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <Link
                            href={auth.user ? route('kegiatan.index') : route('register')}
                            className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-sm transition-all duration-200 active:scale-[0.98] group"
                        >
                            <span>Jelajahi Kegiatan</span>
                            <ArrowRight className="size-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href={auth.user ? route('tim.index') : route('login')}
                            className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-[#2563EB]/40 dark:border-blue-500/40 hover:bg-blue-50/50 dark:hover:bg-slate-900/50 text-[#2563EB] dark:text-blue-400 font-semibold text-sm transition-all duration-200 active:scale-[0.98] bg-transparent"
                        >
                            Mulai Kolaborasi
                        </Link>
                    </div>
                </div>

                {/* Right: Dashboard Mockup using custom premium glassmorphism styling */}
                <div className="lg:col-span-6 flex items-center justify-center relative w-full">
                    {/* Main Mockup container */}
                    <div className="w-full max-w-[500px] rounded-[16px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111625] shadow-2xl flex overflow-hidden aspect-[4/3] relative z-10 select-none">
                        
                        {/* Mock sidebar */}
                        <div className="w-[120px] bg-slate-50 dark:bg-[#0E121E] border-r border-slate-100 dark:border-slate-800/60 p-3 flex flex-col gap-4 text-left">
                            <div className="flex items-center gap-1">
                                <div className="size-5 rounded-md bg-[#2563EB] flex items-center justify-center text-[10px] text-white font-black">C</div>
                                <span className="text-[10px] font-black text-slate-800 dark:text-white">Camplink</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-blue-500/10 text-[#2563EB] text-[9px] font-bold">
                                    <LayoutGrid className="size-3" />
                                    <span>Beranda</span>
                                </div>
                                <div className="flex items-center gap-2 p-1.5 rounded-lg text-slate-400 text-[9px] font-semibold">
                                    <Calendar className="size-3" />
                                    <span>Events</span>
                                </div>
                                <div className="flex items-center gap-2 p-1.5 rounded-lg text-slate-400 text-[9px] font-semibold">
                                    <Users className="size-3" />
                                    <span>Tim</span>
                                </div>
                                <div className="flex items-center gap-2 p-1.5 rounded-lg text-slate-400 text-[9px] font-semibold">
                                    <MessageSquare className="size-3" />
                                    <span>Pesan</span>
                                </div>
                            </div>
                        </div>

                        {/* Mock content panel */}
                        <div className="flex-1 p-4 space-y-4 flex flex-col bg-white dark:bg-[#111625] overflow-hidden">
                            {/* Search bar inside mockup */}
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-3">
                                <div className="flex items-center gap-2 w-full max-w-[200px] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full px-2.5 py-1 text-slate-400">
                                    <Search className="size-3" />
                                    <span className="text-[9px]">Cari kegiatan...</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Bell className="size-3.5 text-slate-400" />
                                    <div className="size-5 rounded-full bg-slate-200 overflow-hidden" />
                                </div>
                            </div>

                            {/* "Event untukmu" cards */}
                            <div className="space-y-2 text-left">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-slate-800 dark:text-white">Event untukmu</span>
                                    <span className="text-[8px] text-[#2563EB] hover:underline cursor-pointer">Lihat semua</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="p-2 border border-slate-100 dark:border-slate-800/80 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 text-left space-y-1.5">
                                        <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden relative">
                                            <img src="https://picsum.photos/seed/seminar/160/90" className="size-full object-cover" />
                                        </div>
                                        <h5 className="text-[9px] font-extrabold text-slate-800 dark:text-white line-clamp-1 leading-tight">Seminar Inovasi Teknologi</h5>
                                        <p className="text-[8px] text-slate-400 leading-none">25 Mei 2024</p>
                                    </div>
                                    <div className="p-2 border border-slate-100 dark:border-slate-800/80 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 text-left space-y-1.5">
                                        <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden relative">
                                            <img src="https://picsum.photos/seed/career/160/90" className="size-full object-cover" />
                                        </div>
                                        <h5 className="text-[9px] font-extrabold text-slate-800 dark:text-white line-clamp-1 leading-tight">Campus Career Expo 2024</h5>
                                        <p className="text-[8px] text-slate-400 leading-none">30 Mei 2024</p>
                                    </div>
                                </div>
                            </div>

                            {/* "Pesan & Tim" mockup */}
                            <div className="space-y-1.5 text-left">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-slate-800 dark:text-white">Pesan & Tim Terbaru</span>
                                    <span className="text-[8px] text-[#2563EB] hover:underline cursor-pointer">Lihat semua</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex items-center gap-1.5 p-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-lg">
                                        <span className="text-[10px]">💬</span>
                                        <div className="min-w-0">
                                            <p className="text-[8px] font-bold text-slate-700 dark:text-slate-300 truncate">Rizky (Pesan)</p>
                                            <p className="text-[6px] text-slate-400 dark:text-slate-500 leading-none">Ada revisi...</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 p-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-lg">
                                        <span className="text-[10px]">👥</span>
                                        <div className="min-w-0">
                                            <p className="text-[8px] font-bold text-slate-700 dark:text-slate-300 truncate">Tim UI/UX</p>
                                            <p className="text-[6px] text-slate-400 dark:text-slate-500 leading-none">3 Anggota Aktif</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Event Kampus Unggulan */}
            <section className="max-w-[1200px] mx-auto px-6 py-16 space-y-8">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Event Kampus Unggulan</h2>
                    <Link href={route('kegiatan.index')} className="text-sm font-semibold text-[#2563EB] hover:underline flex items-center gap-1">
                        <span>Lihat semua event</span>
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredEvents.map((event, index) => (
                        <motion.div
                            key={index}
                            {...fadeInUp}
                            transition={{ delay: index * 0.1 }}
                            className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111625] overflow-hidden shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="h-44 w-full bg-slate-100 dark:bg-slate-800 relative">
                                <img src={event.image} alt={event.title} className="size-full object-cover" />
                                <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${event.badgeColor}`}>
                                    {event.badge}
                                </span>
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between space-y-4 text-left">
                                <div className="space-y-2">
                                    <h3 className="text-sm font-bold text-[#0F172A] dark:text-white line-clamp-2 leading-snug">
                                        {event.title}
                                    </h3>
                                    <div className="space-y-1 text-slate-500 dark:text-slate-400 text-xs flex flex-col gap-0.5">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="size-3.5" />
                                            {event.date}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="size-3.5" />
                                            {event.location}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-3">
                                    <span className="text-[10px] font-bold bg-blue-50 dark:bg-slate-900 text-[#2563EB] dark:text-blue-400 px-2 py-0.5 rounded border border-blue-100/50 dark:border-blue-900/40">
                                        {event.category}
                                    </span>
                                    <span className="text-xs text-slate-400">{event.peserta}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 3. Kolaborasi Tanpa Batas */}
            <section className="max-w-[1200px] mx-auto px-6 py-16 space-y-12">
                <div className="text-center space-y-2 max-w-xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Kolaborasi Tanpa Batas</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        Camplink memudahkanmu terhubung dengan mahasiswa lain untuk mewujudkan ide dan proyek bersama.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Item 1 */}
                    <motion.div 
                        {...fadeInUp} 
                        className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111625] shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                    >
                        <div className="size-16 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                            <Users className="size-7" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white">Temukan Partner</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-[200px] mx-auto">
                            Cari teman dengan minat dan keahlian yang sesuai dengan proyekmu.
                        </p>
                    </motion.div>

                    {/* Item 2 */}
                    <motion.div 
                        {...fadeInUp} 
                        transition={{ delay: 0.1 }} 
                        className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111625] shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                    >
                        <div className="size-16 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                            <Lightbulb className="size-7" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white">Bagikan Ide</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-[200px] mx-auto">
                            Sampaikan ide cemerlangmu dan dapatkan masukan dari komunitas.
                        </p>
                    </motion.div>

                    {/* Item 3 */}
                    <motion.div 
                        {...fadeInUp} 
                        transition={{ delay: 0.2 }} 
                        className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111625] shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                    >
                        <div className="size-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <Folder className="size-7" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white">Bergabung di Proyek</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-[200px] mx-auto">
                            Temukan proyek menarik dan kontribusi sesuai kemampuanmu.
                        </p>
                    </motion.div>

                    {/* Item 4 */}
                    <motion.div 
                        {...fadeInUp} 
                        transition={{ delay: 0.3 }} 
                        className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111625] shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                    >
                        <div className="size-16 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                            <MessageSquare className="size-7" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white">Diskusi & Update</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-[200px] mx-auto">
                            Komunikasi mudah dengan fitur chat, forum, dan update kegiatan.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 4. Statistik Platform */}
            <section className="max-w-[1200px] mx-auto px-6 py-10">
                <div className="rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111625] p-8 shadow-xs overflow-hidden">
                    <div className="grid lg:grid-cols-12 gap-8 items-center">
                        {/* Left: Quick Stats Grid */}
                        <div className="lg:col-span-5 grid grid-cols-2 gap-6">
                            <div className="flex flex-col items-start p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800/60 text-left">
                                <div className="flex items-center gap-2">
                                    <Users className="size-5 text-[#2563EB] dark:text-blue-400 animate-pulse" />
                                    <span className="text-xl font-extrabold text-[#0F172A] dark:text-white">25.000+</span>
                                </div>
                                <span className="text-xs text-slate-400 font-semibold mt-1">Mahasiswa Aktif</span>
                            </div>
                            
                            <div className="flex flex-col items-start p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800/60 text-left">
                                <div className="flex items-center gap-2">
                                    <Calendar className="size-5 text-[#2563EB] dark:text-blue-400" />
                                    <span className="text-xl font-extrabold text-[#0F172A] dark:text-white">1.200+</span>
                                </div>
                                <span className="text-xs text-slate-400 font-semibold mt-1">Event Terselenggara</span>
                            </div>

                            <div className="flex flex-col items-start p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800/60 text-left">
                                <div className="flex items-center gap-2">
                                    <Compass className="size-5 text-[#2563EB] dark:text-blue-400" />
                                    <span className="text-xl font-extrabold text-[#0F172A] dark:text-white">350+</span>
                                </div>
                                <span className="text-xs text-slate-400 font-semibold mt-1">Komunitas Aktif</span>
                            </div>

                            <div className="flex flex-col items-start p-4 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800/60 text-left">
                                <div className="flex items-center gap-2">
                                    <Award className="size-5 text-[#2563EB] dark:text-blue-400" />
                                    <span className="text-xl font-extrabold text-[#0F172A] dark:text-white">3.500+</span>
                                </div>
                                <span className="text-xs text-slate-400 font-semibold mt-1">Kolaborasi Terbentuk</span>
                            </div>
                        </div>

                        {/* Right: Beautiful SVG Line Chart */}
                        <div className="lg:col-span-7 space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-bold text-slate-850 dark:text-slate-200 uppercase tracking-wider text-left">Tren Kolaborasi (6 Bulan Terakhir)</h3>
                                <span className="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold bg-blue-50 dark:bg-slate-900 text-[#2563EB] dark:text-blue-400 border border-blue-100/30">
                                    +12.4% Bulan Ini
                                </span>
                            </div>
                            <div className="h-[180px] w-full relative">
                                <svg viewBox="0 0 500 180" className="w-full h-full overflow-visible">
                                    <defs>
                                        <linearGradient id="home-chart-grad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#2563EB" stopOpacity={0.2} />
                                            <stop offset="100%" stopColor="#2563EB" stopOpacity={0.0} />
                                        </linearGradient>
                                    </defs>
                                    
                                    {/* Grid Lines */}
                                    {[0, 0.33, 0.66, 1].map((ratio, idx) => {
                                        const y = 20 + ratio * 120;
                                        return (
                                            <line 
                                                key={idx}
                                                x1={20} 
                                                y1={y} 
                                                x2={480} 
                                                y2={y} 
                                                stroke="currentColor" 
                                                className="text-slate-100 dark:text-slate-850"
                                                strokeWidth={1} 
                                                strokeDasharray="4 4" 
                                            />
                                        );
                                    })}

                                    {/* Area Fill */}
                                    <path 
                                        d="M 20 140 L 100 115 L 180 95 L 260 70 L 340 45 L 420 30 L 480 25 L 480 140 Z" 
                                        fill="url(#home-chart-grad)" 
                                    />

                                    {/* Stroke Line */}
                                    <path 
                                        d="M 20 140 L 100 115 L 180 95 L 260 70 L 340 45 L 420 30 L 480 25" 
                                        fill="none" 
                                        stroke="#2563EB" 
                                        strokeWidth={3} 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                    />

                                    {/* Data Nodes & Text Tooltips */}
                                    {[
                                        { x: 20, y: 140, val: "500", m: "Jan" },
                                        { x: 100, y: 115, val: "1.100", m: "Feb" },
                                        { x: 180, y: 95, val: "1.700", m: "Mar" },
                                        { x: 260, y: 70, val: "2.300", m: "Apr" },
                                        { x: 340, y: 45, val: "2.900", m: "Mei" },
                                        { x: 420, y: 30, val: "3.200", m: "Jun" },
                                        { x: 480, y: 25, val: "3.500", m: "Sekarang" }
                                    ].map((pt, idx) => (
                                        <g key={idx} className="group/dot cursor-pointer">
                                            <circle 
                                                cx={pt.x} 
                                                cy={pt.y} 
                                                r={4.5} 
                                                fill="#2563EB" 
                                                stroke="white" 
                                                strokeWidth={2}
                                                className="transition-all duration-200 group-hover/dot:r-6 group-hover/dot:stroke-[3px]"
                                            />
                                            {/* Tooltip on Hover */}
                                            <g className="opacity-0 group-hover/dot:opacity-100 transition-opacity duration-200 pointer-events-none">
                                                <rect 
                                                    x={pt.x - 25} 
                                                    y={pt.y - 30} 
                                                    width={50} 
                                                    height={20} 
                                                    rx={6} 
                                                    fill="#0F172A" 
                                                />
                                                <text 
                                                    x={pt.x} 
                                                    y={pt.y - 17} 
                                                    textAnchor="middle" 
                                                    fill="white" 
                                                    className="text-[9px] font-bold"
                                                >
                                                    {pt.val}
                                                </text>
                                            </g>
                                            {/* X label */}
                                            <text 
                                                x={pt.x} 
                                                y={165} 
                                                textAnchor="middle" 
                                                className="text-[9px] fill-slate-400 dark:fill-slate-500 font-bold"
                                            >
                                                {pt.m}
                                            </text>
                                        </g>
                                    ))}
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Testimoni & Aktivitas Terbaru */}
            <section className="max-w-[1200px] mx-auto px-6 py-16 grid lg:grid-cols-12 gap-12">
                
                {/* Left: Testimonials */}
                <div className="lg:col-span-8 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white text-left border-b border-slate-100 dark:border-slate-800 pb-3">Apa Kata Mereka?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((test, index) => (
                            <motion.div
                                key={index}
                                {...fadeInUp}
                                transition={{ delay: index * 0.1 }}
                                className="rounded-[16px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111625] p-5 shadow-xs text-left flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
                            >
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                                    {test.quote}
                                </p>
                                <div className="space-y-2 pt-2 border-t border-slate-55 dark:border-slate-800/40">
                                    <div className="flex items-center gap-0.5 text-amber-500">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} className="size-3.5 fill-current animate-bounce" style={{ animationDelay: `${i * 100}ms`, animationDuration: '3s' }} />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-bold text-xs text-[#2563EB] shrink-0">
                                            {test.name[0]}
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <h4 className="text-xs font-bold text-slate-850 dark:text-slate-200 leading-none">{test.name}</h4>
                                            <span className="text-[10px] text-slate-400 mt-1">{test.role}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right: Real-time Activity Feed */}
                <div className="lg:col-span-4 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white text-left border-b border-slate-100 dark:border-slate-800 pb-3">Aktivitas Terbaru</h2>
                    <div className="rounded-[16px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111625] p-5 shadow-xs space-y-4">
                        {activityLogs.map((log, index) => (
                            <div key={index} className="flex gap-3 items-start text-left border-b border-slate-55 dark:border-slate-850 last:border-b-0 pb-3 last:pb-0">
                                <div className="p-2 rounded-xl bg-blue-500/10 text-[#2563EB] dark:bg-blue-950/40 dark:text-blue-400 shrink-0">
                                    {log.type === 'registration' && <Award className="size-4" />}
                                    {log.type === 'post' && <MessageSquare className="size-4" />}
                                    {log.type === 'join' && <Users className="size-4" />}
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-xs font-bold text-slate-850 dark:text-slate-200 leading-snug">{log.title}</p>
                                    <p className="text-[10px] text-slate-400">{log.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Call To Action (CTA) */}
            <section className="max-w-[1200px] mx-auto px-6 py-12 pb-24 text-center">
                <div className="relative rounded-[24px] overflow-hidden bg-[#2563EB] text-white p-8 md:p-14 space-y-6 shadow-xl text-center flex flex-col items-center">
                    <div className="max-w-2xl space-y-3">
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                            Bergabunglah dengan Camplink Sekarang!
                        </h2>
                        <p className="text-sm text-blue-100 leading-relaxed max-w-[50ch] mx-auto">
                            Temukan kegiatan seru, komunitas inspiratif, dan wujudkan kolaborasi terbaik di kampusmu.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 pt-2">
                        <Link
                            href={route('register')}
                            className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-white text-[#2563EB] font-bold text-sm shadow-md hover:bg-slate-50 transition-all duration-200 active:scale-[0.98]"
                        >
                            Daftar Gratis
                        </Link>
                        <Link
                            href={route('login')}
                            className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-white text-white font-bold text-sm hover:bg-white/10 transition-all duration-200 active:scale-[0.98]"
                        >
                            Jelajahi Camplink
                        </Link>
                    </div>
                </div>
            </section>
        </WelcomeLayout>
    );
}
