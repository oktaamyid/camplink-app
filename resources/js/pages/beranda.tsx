import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link } from '@inertiajs/react';
import { MapPin, Calendar, ChevronRight, Bookmark, Clock } from 'lucide-react';

const categoryColors: Record<string, { bg: string; text: string }> = {
    Lomba: { bg: 'bg-blue-50', text: 'text-blue-700' },
    Seminar: { bg: 'bg-purple-50', text: 'text-purple-700' },
    Workshop: { bg: 'bg-orange-50', text: 'text-orange-700' },
    Penelitian: { bg: 'bg-green-50', text: 'text-green-700' },
    Proyek: { bg: 'bg-rose-50', text: 'text-rose-700' },
};

const recommendedEvents = [
    {
        id: 1,
        title: 'National Business Plan Competition 2024',
        category: 'Lomba',
        location: 'Online',
        date: '30 Mei 2024',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=220&fit=crop&auto=format',
    },
    {
        id: 2,
        title: 'Seminar AI & Masa Depan Teknologi',
        category: 'Seminar',
        location: 'Auditorium Kampus',
        date: '25 Mei 2024',
        image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=220&fit=crop&auto=format',
    },
    {
        id: 3,
        title: 'Workshop UI/UX Design',
        category: 'Workshop',
        location: 'Lab Komputer',
        date: '28 Mei 2024',
        image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=220&fit=crop&auto=format',
    },
    {
        id: 4,
        title: 'Open Recruitment Asisten Penelitian',
        category: 'Penelitian',
        location: 'Fakultas Teknik',
        date: '31 Mei 2024',
        image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=400&h=220&fit=crop&auto=format',
    },
];

const recentEvents = [
    {
        id: 5,
        title: 'Web Development Bootcamp',
        category: 'Workshop',
        date: '24 Mei 2024',
        location: 'Online',
    },
    {
        id: 6,
        title: 'LKTI Nasional 2024',
        category: 'Lomba',
        date: '23 Mei 2024',
        location: 'Online',
    },
    {
        id: 7,
        title: 'Kuliah Tamu: Cyber Security',
        category: 'Seminar',
        date: '22 Mei 2024',
        location: 'Auditorium Kampus',
    },
];

function CategoryBadge({ category }: { category: string }) {
    const colors = categoryColors[category] ?? { bg: 'bg-gray-100', text: 'text-gray-600' };
    return (
        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
            {category}
        </span>
    );
}

export default function Beranda() {
    return (
        <CampLinkLayout>
            <Head title="Beranda" />

            {/* Welcome section */}
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900">
                    Hai, Raffa! 👋
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Temukan kegiatan menarik dan bangun kolaborasi bersama mahasiswa lainnya.
                </p>
            </div>

            {/* Recommended Events */}
            <section className="mb-8">
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-gray-900">Rekomendasi Kegiatan</h2>
                    <Link href="/kegiatan" className="flex items-center gap-1 text-xs font-medium text-[#2F3E8F] hover:underline">
                        Lihat semua
                        <ChevronRight className="size-3" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {recommendedEvents.map((event) => (
                        <Link
                            key={event.id}
                            href={`/kegiatan/${event.id}`}
                            className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="h-28 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute left-2 top-2">
                                    <CategoryBadge category={event.category} />
                                </div>
                            </div>
                            <div className="p-3">
                                <h3 className="mb-2 text-xs font-semibold leading-snug text-gray-900 line-clamp-2">
                                    {event.title}
                                </h3>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <MapPin className="size-3 flex-shrink-0" />
                                        <span>{event.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Calendar className="size-3 flex-shrink-0" />
                                        <span>{event.date}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Recent Events */}
            <section>
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-gray-900">Kegiatan Terbaru</h2>
                    <Link href="/kegiatan" className="flex items-center gap-1 text-xs font-medium text-[#2F3E8F] hover:underline">
                        Lihat semua
                        <ChevronRight className="size-3" />
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                    {recentEvents.map((event, index) => (
                        <Link
                            key={event.id}
                            href={`/kegiatan/${event.id}`}
                            className={`flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50 transition-colors ${
                                index !== recentEvents.length - 1 ? 'border-b border-gray-100' : ''
                            }`}
                        >
                            <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                                <Clock className="size-4 text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                            </div>
                            <CategoryBadge category={event.category} />
                            <span className="text-xs text-gray-400 flex-shrink-0">{event.date}</span>
                            <span className="text-xs text-gray-400 flex-shrink-0 hidden md:block">{event.location}</span>
                            <button
                                className="flex-shrink-0 rounded p-1 hover:bg-gray-100 transition-colors"
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                <Bookmark className="size-4 text-gray-400" />
                            </button>
                        </Link>
                    ))}
                </div>
            </section>
        </CampLinkLayout>
    );
}
