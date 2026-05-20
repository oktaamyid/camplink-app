import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, MapPin, Calendar, Clock, Mail, CheckCircle2, Users } from 'lucide-react';

const event = {
    id: 1,
    title: 'National Business Plan Competition 2024',
    category: 'Lomba',
    organizer: 'BEM Universitas',
    isVerified: true,
    date: '30 Mei 2024',
    location: 'Online',
    deadline: '20 Mei 2024',
    description:
        'Kompetisi rencana bisnis tingkat nasional untuk mahasiswa seluruh Indonesia. Wujudkan ide bisnis inovatif kamu dan menangkan total hadiah puluhan juta rupiah!',
    categoryLabel: 'Lomba',
    field: 'Bisnis, Kewirausahaan',
    prize: 'Total hadiah Rp 50.000.000',
    contact: 'bem@universitas.ac.id',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop&auto=format',
    team: {
        required: '3 - 5 anggota',
        positions: ['Ketua Tim', 'Marketing', 'Finance', 'IT / Developer', 'Desain Grafis'],
        quota: 5,
        filled: 2,
    },
};

function CategoryBadge({ category }: { category: string }) {
    const map: Record<string, { bg: string; text: string }> = {
        Lomba: { bg: 'bg-blue-50', text: 'text-blue-700' },
        Seminar: { bg: 'bg-purple-50', text: 'text-purple-700' },
        Workshop: { bg: 'bg-orange-50', text: 'text-orange-700' },
        Penelitian: { bg: 'bg-green-50', text: 'text-green-700' },
        Proyek: { bg: 'bg-rose-50', text: 'text-rose-700' },
    };
    const colors = map[category] ?? { bg: 'bg-gray-100', text: 'text-gray-600' };
    return (
        <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}>
            {category}
        </span>
    );
}

export default function KegiatanDetail() {
    return (
        <CampLinkLayout>
            <Head title={event.title} />

            <div className="mb-4">
                <Link
                    href="/kegiatan"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Kembali
                </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header */}
                    <div>
                        <div className="mb-3 flex items-start justify-between gap-4">
                            <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
                        </div>
                        <div className="mb-4">
                            <CategoryBadge category={event.category} />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>Diselenggarakan oleh</span>
                            <span className="font-semibold text-gray-900">{event.organizer}</span>
                            {event.isVerified && (
                                <CheckCircle2 className="size-4 text-blue-500" />
                            )}
                        </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-6 rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="size-4 text-gray-400" />
                            <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="size-4 text-gray-400" />
                            <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="size-4 text-gray-400" />
                            <span>Pendaftaran hingga {event.deadline}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h2 className="mb-3 text-sm font-semibold text-gray-900">Deskripsi</h2>
                        <p className="text-sm leading-relaxed text-gray-600">{event.description}</p>
                    </div>

                    {/* Details */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4">
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Kategori</h3>
                            <p className="text-sm text-gray-900">{event.categoryLabel}</p>
                        </div>
                        <div className="border-t border-gray-100" />
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Bidang</h3>
                            <p className="text-sm text-gray-900">{event.field}</p>
                        </div>
                        <div className="border-t border-gray-100" />
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Hadiah</h3>
                            <p className="text-sm font-semibold text-gray-900">{event.prize}</p>
                        </div>
                        <div className="border-t border-gray-100" />
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Kontak</h3>
                            <a href={`mailto:${event.contact}`} className="flex items-center gap-1.5 text-sm text-[#2F3E8F] hover:underline">
                                <Mail className="size-3.5" />
                                {event.contact}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-4">
                    {/* Event Image */}
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                        <img src={event.image} alt={event.title} className="w-full h-44 object-cover" />
                    </div>

                    {/* Team Info */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h2 className="mb-4 text-sm font-semibold text-gray-900">Informasi Tim</h2>
                        <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
                            <Users className="size-4 text-gray-400" />
                            <span>Dibutuhkan {event.team.required}</span>
                        </div>
                        <div className="mb-4">
                            <p className="mb-2 text-xs font-medium text-gray-500">Posisi yang dibutuhkan:</p>
                            <div className="space-y-1.5">
                                {event.team.positions.map((pos) => (
                                    <div key={pos} className="flex items-center gap-2 text-sm text-gray-700">
                                        <CheckCircle2 className="size-3.5 text-[#2F3E8F]" />
                                        {pos}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="w-full rounded-lg bg-[#2F3E8F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#243070] transition-colors">
                            Daftar Sekarang
                        </button>
                    </div>

                    {/* Organizer */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h2 className="mb-3 text-sm font-semibold text-gray-900">Pembuat Kegiatan</h2>
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-[#2F3E8F]">
                                <span className="text-sm font-semibold text-white">BU</span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{event.organizer}</p>
                                <p className="text-xs text-gray-500">Organisasi Mahasiswa</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CampLinkLayout>
    );
}
