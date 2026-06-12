import BorderBeam from '@/components/magicui/border-beam';
import WelcomeLayout from '@/pages/welcome/layout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Activity,
    ArrowRight,
    Award,
    CheckCircle2,
    Filter,
    Layers,
    Search,
    Shield,
    Users,
} from 'lucide-react';

export default function Features() {
    const fadeInUp = {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6, ease: 'easeOut' as const },
    };

    return (
        <WelcomeLayout>
            <Head title="Fitur Layanan" />

            {/* Header / Intro */}
            <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center space-y-4 z-10 relative">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2F3E8F]/10 dark:bg-blue-500/10 text-[#2F3E8F] dark:text-blue-400 border border-[#2F3E8F]/20 dark:border-blue-500/20">
                    <Layers className="size-3.5" />
                    <span>Layanan Inti</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                    Eksplorasi Fitur CampLink
                </h1>
                <p className="text-sm text-gray-600 dark:text-slate-400 max-w-[60ch] mx-auto leading-relaxed">
                    Setiap modul dirancang untuk memudahkan mahasiswa berkolaborasi secara sehat, memperluas jejaring, dan mendokumentasikan pencapaian mereka.
                </p>
            </section>

            {/* Feature 1: The Matchmaker Board (Visual Left, Text Right) */}
            <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-12 items-center z-10 relative">
                <motion.div {...fadeInUp} className="lg:col-span-6 order-2 lg:order-1">
                    {/* Visual Mock of Collaboration Board */}
                    <div className="rounded-[24px] bg-white/40 dark:bg-[#111625]/45 border border-white/20 dark:border-slate-800/80 backdrop-blur-md p-6 space-y-4 relative">
                        <BorderBeam duration={15} size={200} colorFrom="#2F3E8F" colorTo="#3b82f6" />
                        <div className="flex items-center justify-between border-b border-gray-200/50 dark:border-slate-800/50 pb-3">
                            <h4 className="text-xs font-bold text-gray-900 dark:text-white">Papan Pencarian Tim</h4>
                            <span className="text-[10px] font-semibold text-gray-500 dark:text-slate-500">Mencari Partner</span>
                        </div>
                        <div className="space-y-3">
                            <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-gray-200/50 dark:border-slate-800/60 flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-gray-900 dark:text-white">Mobile UI Designer</p>
                                    <p className="text-[10px] text-gray-500 dark:text-slate-500">Proyek Mandiri (App Kasir)</p>
                                </div>
                                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#2F3E8F]/10 dark:bg-blue-950 text-[#2F3E8F] dark:text-blue-400">1 Slot</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/40 border border-gray-200/50 dark:border-slate-800/60 flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-gray-900 dark:text-white">Fullstack Laravel Dev</p>
                                    <p className="text-[10px] text-gray-500 dark:text-slate-500">Kompetisi Hackfest</p>
                                </div>
                                <span className="text-[10px] font-bold px-2 py-1 rounded bg-emerald-500/10 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">Penuh</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div {...fadeInUp} className="lg:col-span-6 order-1 lg:order-2 space-y-4">
                    <div className="size-10 rounded-xl bg-[#2F3E8F]/10 dark:bg-blue-500/10 text-[#2F3E8F] dark:text-blue-400 flex items-center justify-center">
                        <Users className="size-5" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">Papan Kolaborasi Tim</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                        Tinggalkan cara lama merekrut anggota tim lewat obrolan spam. Di CampLink, Anda bisa mempublikasikan tim kegiatan Anda, menentukan kriteria keahlian spesifik yang dicari, dan melacak status pelamar secara real-time dari satu dasbor yang rapi.
                    </p>
                </motion.div>
            </section>

            {/* Feature 2: Multi-Filter Activities Hub (Stacked Center Layout) */}
            <section className="bg-white/20 dark:bg-[#111625]/10 border-y border-gray-200/40 dark:border-slate-800/40 py-20 z-10 relative">
                <div className="max-w-7xl mx-auto px-6 space-y-12">
                    <motion.div {...fadeInUp} className="text-center space-y-4 max-w-xl mx-auto">
                        <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                            <Activity className="size-5" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">Katalog Kegiatan Kampus</h3>
                        <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                            Akses terpusat ke seluruh agenda kemahasiswaan STT-NF. Diatur dengan kategori khusus dan filter presisi.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <motion.div
                            {...fadeInUp}
                            transition={{ delay: 0.1 }}
                            className="rounded-[24px] bg-white/40 dark:bg-[#111625]/45 border border-white/20 dark:border-slate-800/80 backdrop-blur-md p-6 space-y-3"
                        >
                            <Filter className="size-5 text-[#2F3E8F] dark:text-blue-400" />
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Pencarian Fleksibel</h4>
                            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                                Cari kegiatan berdasarkan judul, kategori (Seminar, Workshop, Lomba, Riset), nama penyelenggara, atau waktu penyelenggaraan.
                            </p>
                        </motion.div>

                        <motion.div
                            {...fadeInUp}
                            transition={{ delay: 0.2 }}
                            className="rounded-[24px] bg-white/40 dark:bg-[#111625]/45 border border-white/20 dark:border-slate-800/80 backdrop-blur-md p-6 space-y-3"
                        >
                            <Search className="size-5 text-[#2F3E8F] dark:text-blue-400" />
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Detail Terperinci</h4>
                            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                                Ketahui persyaratan pendaftaran, batas waktu, kuota peserta, deskripsi lengkap acara, dan detail inisiator dengan mudah.
                            </p>
                        </motion.div>

                        <motion.div
                            {...fadeInUp}
                            transition={{ delay: 0.3 }}
                            className="rounded-[24px] bg-white/40 dark:bg-[#111625]/45 border border-white/20 dark:border-slate-800/80 backdrop-blur-md p-6 space-y-3"
                        >
                            <Shield className="size-5 text-[#2F3E8F] dark:text-blue-400" />
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Verifikasi Acara</h4>
                            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                                Setiap kegiatan kemahasiswaan ditandai dengan badge khusus untuk menandakan status validasi resmi dari Admin kampus.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Feature 3: Credentials and E-Signs (Text Left, Visual Right) */}
            <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-12 items-center z-10 relative">
                <motion.div {...fadeInUp} className="lg:col-span-6 space-y-4">
                    <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <Award className="size-5" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">Sertifikat Digital & E-Sign</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                        Setelah berhasil merampungkan program, inisiator dapat menerbitkan sertifikat digital resmi secara massal melalui panel dashboard. Sertifikat ini akan dibubuhi tanda tangan elektronik terverifikasi dan langsung tersemat di halaman profil portofolio Anda.
                    </p>
                </motion.div>

                <motion.div {...fadeInUp} className="lg:col-span-6">
                    {/* Mock Glassmorphic Certificate Display */}
                    <div className="rounded-[24px] bg-white/40 dark:bg-[#111625]/45 border border-white/20 dark:border-slate-800/80 backdrop-blur-md p-8 space-y-6 relative">
                        <BorderBeam duration={12} size={250} colorFrom="#2F3E8F" colorTo="#3b82f6" />
                        <div className="text-center space-y-1">
                            <p className="text-[10px] font-bold text-[#2F3E8F] dark:text-blue-400 tracking-widest uppercase">Sertifikat Penghargaan</p>
                            <h4 className="text-base font-extrabold text-gray-900 dark:text-white leading-tight">CampLink Digital Credentials</h4>
                        </div>
                        <div className="h-[1px] bg-gray-200/50 dark:bg-slate-800/60" />
                        <div className="space-y-2 text-center text-xs">
                            <p className="text-gray-500 dark:text-slate-500">Diberikan kepada mahasiswa berprestasi atas partisipasinya.</p>
                            <p className="font-extrabold text-gray-900 dark:text-white">Peserta Terbaik Seminar UI/UX 2026</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200/50 dark:border-slate-800/60 pt-4">
                            <div className="text-left">
                                <p className="text-[9px] text-gray-400 dark:text-slate-500">Oleh: BEM STT-NF</p>
                                <p className="text-[10px] font-bold text-gray-800 dark:text-slate-300">Agus Setiawan</p>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="size-3.5" />
                                <span>E-Signed</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Bottom Call to Action */}
            <section className="max-w-5xl mx-auto px-6 py-12 pb-24 text-center z-10 relative">
                <motion.div
                    {...fadeInUp}
                    className="relative rounded-[32px] overflow-hidden bg-white/40 dark:bg-[#111625]/90 border border-white/20 dark:border-slate-800/80 backdrop-blur-lg shadow-xl p-8 md:p-14 space-y-6"
                >
                    <BorderBeam duration={15} size={250} colorFrom="#2F3E8F" colorTo="#3b82f6" />
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Rasakan Kemudahan Kolaborasi Kampus
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed max-w-[50ch] mx-auto">
                        Daftar sekarang dan nikmati seluruh ekosistem kegiatan mahasiswa STT-NF.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 pt-2">
                        <Link
                            href={route('register')}
                            className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[#2F3E8F] dark:bg-blue-600 text-white font-bold text-sm shadow-md transition-all duration-200 active:scale-[0.98] group"
                        >
                            <span>Daftar Akun</span>
                            <ArrowRight className="size-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href={route('login')}
                            className="inline-flex items-center justify-center h-11 px-6 rounded-xl border border-gray-200 hover:bg-gray-50/50 dark:border-slate-800 dark:hover:bg-slate-900/50 text-gray-700 dark:text-slate-300 font-bold text-sm transition-all duration-200 active:scale-[0.98]"
                        >
                            Masuk Akun
                        </Link>
                    </div>
                </motion.div>
            </section>
        </WelcomeLayout>
    );
}
