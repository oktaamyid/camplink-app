import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link } from '@inertiajs/react';
import { MapPin, Calendar, Bookmark, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const categoryColors: Record<string, { bg: string; text: string }> = {
    Lomba: { bg: 'bg-blue-50', text: 'text-blue-700' },
    Seminar: { bg: 'bg-purple-50', text: 'text-purple-700' },
    Workshop: { bg: 'bg-orange-50', text: 'text-orange-700' },
    Penelitian: { bg: 'bg-green-50', text: 'text-green-700' },
    Proyek: { bg: 'bg-rose-50', text: 'text-rose-700' },
};

const allEvents = [
    {
        id: 1,
        title: 'Seminar AI & Masa Depan Teknologi',
        category: 'Seminar',
        location: 'Auditorium Kampus',
        date: '25 Mei 2024',
        description: 'Membahas perkembangan AI dan dampaknya di berbagai industri.',
        image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=300&h=180&fit=crop&auto=format',
    },
    {
        id: 2,
        title: 'Workshop UI/UX Design',
        category: 'Workshop',
        location: 'Lab Komputer',
        date: '28 Mei 2024',
        description: 'Belajar mendesain antarmuka yang menarik dan user-friendly.',
        image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=300&h=180&fit=crop&auto=format',
    },
    {
        id: 3,
        title: 'National Business Plan Competition 2024',
        category: 'Lomba',
        location: 'Online',
        date: '30 Mei 2024',
        description: 'Kompetisi rencana bisnis tingkat nasional untuk mahasiswa seluruh Indonesia.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=180&fit=crop&auto=format',
    },
    {
        id: 4,
        title: 'Open Recruitment Asisten Penelitian',
        category: 'Penelitian',
        location: 'Fakultas Teknik',
        date: '31 Mei 2024',
        description: 'Rekrutmen asisten untuk penelitian dosen fakultas teknik.',
        image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=300&h=180&fit=crop&auto=format',
    },
    {
        id: 5,
        title: 'Web Development Bootcamp',
        category: 'Workshop',
        location: 'Online',
        date: '24 Mei 2024',
        description: 'Bootcamp intensif belajar web development dari dasar hingga mahir.',
        image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=300&h=180&fit=crop&auto=format',
    },
    {
        id: 6,
        title: 'LKTI Nasional 2024',
        category: 'Lomba',
        location: 'Online',
        date: '23 Mei 2024',
        description: 'Lomba karya tulis ilmiah tingkat nasional untuk mahasiswa aktif.',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=180&fit=crop&auto=format',
    },
    {
        id: 7,
        title: 'Kuliah Tamu: Cyber Security',
        category: 'Seminar',
        location: 'Auditorium Kampus',
        date: '22 Mei 2024',
        description: 'Kuliah tamu bersama pakar keamanan siber dari industri terkemuka.',
        image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=300&h=180&fit=crop&auto=format',
    },
    {
        id: 8,
        title: 'Proyek Pengembangan Aplikasi Desa',
        category: 'Proyek',
        location: 'Fakultas Ilmu Komputer',
        date: '1 Juni 2024',
        description: 'Proyek pengembangan aplikasi digital untuk pengelolaan desa.',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=180&fit=crop&auto=format',
    },
];

const categories = ['Seminar', 'Workshop', 'Lomba', 'Penelitian', 'Proyek'];
const timeFilters = ['Semua', 'Minggu Ini', 'Bulan Ini', '3 Bulan Ke Depan'];
const sortOptions = ['Terbaru', 'Terlama', 'Deadline Terdekat'];

function CategoryBadge({ category }: { category: string }) {
    const colors = categoryColors[category] ?? { bg: 'bg-gray-100', text: 'text-gray-600' };
    return (
        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
            {category}
        </span>
    );
}

export default function Kegiatan() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState('Semua');
    const [sortBy, setSortBy] = useState('Terbaru');

    const toggleCategory = (cat: string) => {
        setSelectedCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
        );
    };

    const filteredEvents = allEvents.filter((event) => {
        if (selectedCategories.length > 0 && !selectedCategories.includes(event.category)) {
            return false;
        }
        return true;
    });

    return (
        <CampLinkLayout>
            <Head title="Kegiatan" />

            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900">Kegiatan</h1>
                <p className="mt-1 text-sm text-gray-500">Temukan berbagai kegiatan yang tersedia</p>
            </div>

            <div className="flex gap-6">
                {/* Sidebar Filters */}
                <aside className="w-44 flex-shrink-0">
                    <div className="sticky top-0 space-y-6">
                        {/* Category Filter */}
                        <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Kategori</p>
                            <div className="space-y-2">
                                {categories.map((cat) => (
                                    <label key={cat} className="flex cursor-pointer items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat)}
                                            onChange={() => toggleCategory(cat)}
                                            className="size-3.5 rounded border-gray-300 text-[#2F3E8F] accent-[#2F3E8F]"
                                        />
                                        <span className="text-sm text-gray-700">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Time Filter */}
                        <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Waktu</p>
                            <div className="space-y-2">
                                {timeFilters.map((time) => (
                                    <label key={time} className="flex cursor-pointer items-center gap-2">
                                        <input
                                            type="radio"
                                            name="time"
                                            checked={selectedTime === time}
                                            onChange={() => setSelectedTime(time)}
                                            className="size-3.5 border-gray-300 text-[#2F3E8F] accent-[#2F3E8F]"
                                        />
                                        <span className="text-sm text-gray-700">{time}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Events List */}
                <div className="flex-1">
                    {/* Sort bar */}
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">{filteredEvents.length}</span> kegiatan ditemukan
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Urutkan:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 focus:border-[#2F3E8F] focus:outline-none"
                            >
                                {sortOptions.map((opt) => (
                                    <option key={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Event Cards */}
                    <div className="space-y-3">
                        {filteredEvents.map((event) => (
                            <Link
                                key={event.id}
                                href={`/kegiatan/${event.id}`}
                                className="flex items-start gap-4 overflow-hidden rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
                            >
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="h-20 w-32 flex-shrink-0 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="mb-1 flex items-start justify-between gap-2">
                                        <h3 className="text-sm font-semibold text-gray-900">{event.title}</h3>
                                        <CategoryBadge category={event.category} />
                                    </div>
                                    <div className="mb-2 flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="size-3" />
                                            {event.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="size-3" />
                                            {event.date}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-2">{event.description}</p>
                                </div>
                                <button
                                    className="flex-shrink-0 rounded-lg p-1.5 hover:bg-gray-100 transition-colors"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <Bookmark className="size-4 text-gray-400" />
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </CampLinkLayout>
    );
}
