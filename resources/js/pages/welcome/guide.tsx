import BorderBeam from '@/components/magicui/border-beam';
import WelcomeLayout from '@/pages/welcome/layout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Award,
    BookOpen,
    HelpCircle,
    UserCheck,
    Users,
} from 'lucide-react';

export default function Guide() {
    const fadeInUp = {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    };

    const steps = [
        {
            num: '01',
            icon: UserCheck,
            title: 'Daftar & Aktivasi Akun',
            desc: 'Daftarkan diri Anda dengan menggunakan alamat email kampus STT-NF. Lengkapi kode verifikasi yang dikirimkan untuk mengaktifkan akun Anda secara aman.',
        },
        {
            num: '02',
            icon: BookOpen,
            title: 'Lengkapi Profil Portofolio',
            desc: 'Isi profil Anda seperti layaknya resume digital professional: riwayat pendidikan, minat keahlian, pengalaman berorganisasi, serta sertifikat eksternal.',
        },
        {
            num: '03',
            icon: Users,
            title: 'Ajukan atau Daftar Kegiatan',
            desc: 'Cari kegiatan yang cocok di katalog, lalu klik gabung tim. Atau, kirimkan pengajuan hak inisiator jika Anda ingin menerbitkan dan memimpin kegiatan sendiri.',
        },
        {
            num: '04',
            icon: Award,
            title: 'Selesai & Dapatkan Sertifikat',
            desc: 'Setelah program usai, inisiator akan mempublikasikan sertifikat partisipasi resmi terverifikasi yang secara otomatis tersimpan di portofolio profil Anda.',
        },
    ];

    return (
        <WelcomeLayout>
            <Head title="Panduan Pengguna" />

            {/* Header / Intro */}
            <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center space-y-4 z-10 relative">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2F3E8F]/10 dark:bg-blue-500/10 text-[#2F3E8F] dark:text-blue-400 border border-[#2F3E8F]/20 dark:border-blue-500/20">
                    <HelpCircle className="size-3.5" />
                    <span>Langkah Mudah</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                    Panduan Penggunaan CampLink
                </h1>
                <p className="text-sm text-gray-600 dark:text-slate-400 max-w-[60ch] mx-auto leading-relaxed">
                    Pelajari bagaimana langkah-langkah bergabung dan memaksimalkan setiap modul kolaborasi di CampLink.
                </p>
            </section>

            {/* Guide Step Columns */}
            <section className="max-w-7xl mx-auto px-6 py-12 z-10 relative">
                <div className="grid md:grid-cols-2 gap-8">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            {...fadeInUp}
                            transition={{ delay: idx * 0.1 }}
                            className="rounded-[24px] bg-white/40 dark:bg-[#111625]/45 border border-white/20 dark:border-slate-800/80 backdrop-blur-md p-8 flex gap-6 relative items-start hover:-translate-y-1 transition-all duration-300 select-none"
                        >
                            <BorderBeam duration={12} size={150} colorFrom="#2F3E8F" colorTo="#3b82f6" delay={idx * 2} />
                            
                            <div className="text-4xl font-black text-[#2F3E8F]/20 dark:text-blue-500/20 shrink-0">
                                {step.num}
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-[#2F3E8F]/10 dark:bg-blue-500/10 text-[#2F3E8F] dark:text-blue-400">
                                        <step.icon className="size-4" />
                                    </div>
                                    <h3 className="text-base font-extrabold text-gray-900 dark:text-white">{step.title}</h3>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* FAQ Area */}
            <section className="bg-white/20 dark:bg-[#111625]/10 border-y border-gray-200/40 dark:border-slate-800/40 py-20 z-10 relative">
                <div className="max-w-4xl mx-auto px-6 space-y-12">
                    <motion.div {...fadeInUp} className="text-center space-y-2">
                        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">Pertanyaan Sering Diajukan</h3>
                        <p className="text-xs text-gray-500 dark:text-slate-500">Hal-hal yang sering dipertanyakan mengenai fitur CampLink.</p>
                    </motion.div>

                    <div className="space-y-4">
                        <motion.div {...fadeInUp} className="p-6 rounded-[24px] bg-white/40 dark:bg-[#111625]/40 border border-white/20 dark:border-slate-800/80 backdrop-blur-md space-y-2">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Apakah pendaftaran CampLink gratis?</h4>
                            <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">
                                Ya, CampLink sepenuhnya gratis bagi seluruh mahasiswa aktif dan organisasi kemahasiswaan di lingkungan kampus STT Terpadu Nurul Fikri.
                            </p>
                        </motion.div>

                        <motion.div {...fadeInUp} className="p-6 rounded-[24px] bg-white/40 dark:bg-[#111625]/40 border border-white/20 dark:border-slate-800/80 backdrop-blur-md space-y-2">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Bagaimana cara menjadi inisiator kegiatan?</h4>
                            <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">
                                Anda dapat mengajukan request peran inisiator kegiatan melalui modal form pengajuan di pojok kiri bawah menu dasbor Anda. Pengajuan Anda akan ditinjau dan divalidasi oleh Admin kampus.
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
                        Mulai Perjalanan Akademik Anda
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed max-w-[50ch] mx-auto">
                        Buat akun menggunakan email STT-NF dan mulailah membangun portofolio berharga sekarang.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 pt-2">
                        <Link
                            href={route('register')}
                            className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-[#2F3E8F] dark:bg-blue-600 text-white font-bold text-sm shadow-md transition-all duration-200 active:scale-[0.98] group"
                        >
                            <span>Mulai Sekarang</span>
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
