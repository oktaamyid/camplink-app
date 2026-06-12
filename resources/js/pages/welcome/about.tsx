import BorderBeam from '@/components/magicui/border-beam';
import WelcomeLayout from '@/pages/welcome/layout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Award,
    Compass,
    GraduationCap,
    Heart,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';

export default function About() {
    const fadeInUp = {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6, ease: 'easeOut' as const },
    };

    return (
        <WelcomeLayout>
            <Head title="Tentang CampLink" />

            {/* Header / Vision */}
            <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center space-y-4 z-10 relative">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2F3E8F]/10 dark:bg-blue-500/10 text-[#2F3E8F] dark:text-blue-400 border border-[#2F3E8F]/20 dark:border-blue-500/20">
                    <Heart className="size-3.5" />
                    <span>Cerita Kami</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                    Menghubungkan Potensi Mahasiswa
                </h1>
                <p className="text-sm text-gray-600 dark:text-slate-400 max-w-[60ch] mx-auto leading-relaxed">
                    CampLink lahir sebagai wadah kolaboratif digital untuk mengatasi keterbatasan akses informasi kegiatan kemahasiswaan dan mempermudah pembentukan tim di STT-NF.
                </p>
            </section>

            {/* Core Mission Story */}
            <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-12 items-center z-10 relative">
                <motion.div {...fadeInUp} className="lg:col-span-7 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
                        Mengapa Kami Membangun CampLink?
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                        Kami percaya bahwa pengalaman berorganisasi, berkompetisi, dan berkolaborasi dalam proyek riil merupakan fondasi utama bagi mahasiswa untuk siap bersaing di industri professional. 
                        Namun, proses koordinasi yang manual seringkali menghambat potensi tersebut. 
                    </p>
                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                        Melalui CampLink, seluruh mahasiswa STT-NF dari berbagai program studi dapat berkumpul secara virtual, saling menawarkan keahlian, dan bahu-membahu melahirkan karya-karya inovatif baru.
                    </p>
                </motion.div>

                {/* Glassmorphic values box */}
                <motion.div {...fadeInUp} className="lg:col-span-5 w-full">
                    <div className="rounded-[24px] bg-white/40 dark:bg-[#111625]/45 border border-white/20 dark:border-slate-800/80 backdrop-blur-md p-8 space-y-6 relative">
                        <BorderBeam duration={12} size={250} colorFrom="#2F3E8F" colorTo="#3b82f6" />
                        <div className="flex gap-4 items-start">
                            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                                <ShieldCheck className="size-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Ekosistem Terpercaya</h4>
                                <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                                    Diawasi dan diverifikasi secara berkala oleh Admin Kemahasiswaan kampus STT-NF.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                                <Sparkles className="size-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Fokus Masa Depan</h4>
                                <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                                    Setiap riwayat pendaftaran dan sertifikat terkonversi menjadi portofolio portabel siap kerja.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Story Telling Section: The Student Growth Path (Bento Grid Style) */}
            <section className="bg-white/20 dark:bg-[#111625]/10 border-y border-gray-200/40 dark:border-slate-800/40 py-20 z-10 relative">
                <div className="max-w-7xl mx-auto px-6 space-y-16">
                    <motion.div {...fadeInUp} className="text-center space-y-3 max-w-xl mx-auto">
                        <p className="text-[10px] font-bold text-[#2F3E8F] dark:text-blue-400 tracking-[0.2em] uppercase">Alur Pertumbuhan</p>
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Proses Peningkatan Keahlian
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-slate-400">
                            Bagaimana CampLink memandu karir kemahasiswaan Anda sejak awal masuk hingga lulus.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Stage 1 */}
                        <motion.div
                            {...fadeInUp}
                            transition={{ delay: 0.1 }}
                            className="rounded-[24px] bg-white/40 dark:bg-[#111625]/45 border border-white/20 dark:border-slate-800/80 backdrop-blur-md p-6 space-y-4 hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                                <Compass className="size-5" />
                            </div>
                            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Eksplorasi Awal</h3>
                            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                                Mahasiswa baru menjelajahi berbagai macam pilihan unit kegiatan, komunitas, dan agenda seminar untuk mencari minat utamanya.
                            </p>
                        </motion.div>

                        {/* Stage 2 */}
                        <motion.div
                            {...fadeInUp}
                            transition={{ delay: 0.2 }}
                            className="rounded-[24px] bg-white/40 dark:bg-[#111625]/45 border border-white/20 dark:border-slate-800/80 backdrop-blur-md p-6 space-y-4 hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                                <GraduationCap className="size-5" />
                            </div>
                            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Partisipasi Aktif</h3>
                            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                                Terjun langsung dalam kompetisi, kepanitiaan organisasi, atau riset terstruktur bersama mahasiswa lain guna mempraktikkan teori.
                            </p>
                        </motion.div>

                        {/* Stage 3 */}
                        <motion.div
                            {...fadeInUp}
                            transition={{ delay: 0.3 }}
                            className="rounded-[24px] bg-white/40 dark:bg-[#111625]/45 border border-white/20 dark:border-slate-800/80 backdrop-blur-md p-6 space-y-4 hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                                <Award className="size-5" />
                            </div>
                            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Validasi Karir</h3>
                            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                                Memanen hasil jerih payah berupa portofolio digital yang siap dipamerkan di industri karir atau untuk studi tingkat lanjut.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Bottom Call to Action */}
            <section className="max-w-5xl mx-auto px-6 py-12 pb-24 text-center z-10 relative">
                <motion.div
                    {...fadeInUp}
                    className="relative rounded-[32px] overflow-hidden bg-white/40 dark:bg-[#111625]/90 border border-white/20 dark:border-slate-800/80 backdrop-blur-lg shadow-xl p-8 md:p-14 space-y-6"
                >
                    <BorderBeam duration={15} size={250} colorFrom="#2F3E8F" colorTo="#3b82f6" />
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Mari Terkoneksi Hari Ini
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed max-w-[50ch] mx-auto">
                        Bergabunglah dengan ratusan mahasiswa STT-NF yang telah aktif berkolaborasi di CampLink.
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
