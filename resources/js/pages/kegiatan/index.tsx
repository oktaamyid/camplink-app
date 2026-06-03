import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link, router } from '@inertiajs/react';
import { MapPin, Calendar, Bookmark, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const categoryColors: Record<string, { bg: string; text: string }> = {
    Lomba: { bg: 'bg-blue-50', text: 'text-blue-700' },
    Seminar: { bg: 'bg-purple-50', text: 'text-purple-700' },
    Workshop: { bg: 'bg-orange-50', text: 'text-orange-700' },
    Penelitian: { bg: 'bg-green-50', text: 'text-green-700' },
    Proyek: { bg: 'bg-rose-50', text: 'text-rose-700' },
};

const timeFilters = ['Semua', 'Minggu Ini', 'Bulan Ini', '3 Bulan Ke Depan'];
const sortOptions = ['Terbaru', 'Terlama', 'Deadline Terdekat'];

// Types
interface Category {
    id: number;
    name: string;
}

interface Activity {
    id: number;
    title: string;
    category_id: number;
    category: Category;
    location: string;
    event_date: string | null;
    description: string;
    poster_url: string | null;
}

interface PaginationData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Filters {
    search?: string;
    categories?: string[];
    time?: string;
    sort?: string;
}

interface Props {
    activities: PaginationData<Activity>;
    categories: Category[];
    filters: Filters;
}

function CategoryBadge({ category }: { category: string }) {
    const colors = categoryColors[category] ?? { bg: 'bg-gray-100', text: 'text-gray-600' };
    return (
        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
            {category}
        </span>
    );
}

const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=220&fit=crop&auto=format';

export default function Kegiatan({ activities, categories, filters = {} }: Props) {
    // states match filters provided by server, ensuring categories is always an array
    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        Array.isArray(filters.categories) 
            ? filters.categories 
            : (typeof filters.categories === 'string' ? [filters.categories] : [])
    );
    const [selectedTime, setSelectedTime] = useState(typeof filters.time === 'string' ? filters.time : 'Semua');
    const [sortBy, setSortBy] = useState(typeof filters.sort === 'string' ? filters.sort : 'Terbaru');
    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    const isInitialRender = useRef(true);
    const searchTimeout = useRef<NodeJS.Timeout>(null);

    const toggleCategory = (catId: string) => {
        setSelectedCategories((prev) =>
            prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId]
        );
    };

    // apply filters when state changes using Inertia router
    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        // debounce the search query
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(() => {
            router.get(
                '/kegiatan',
                {
                    search: searchQuery,
                    categories: selectedCategories,
                    time: selectedTime,
                    sort: sortBy,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 300);

        return () => {
            if (searchTimeout.current) clearTimeout(searchTimeout.current);
        };
    }, [searchQuery, selectedCategories, selectedTime, sortBy]);

    return (
        <CampLinkLayout>
            <Head title="Kegiatan" />

            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Kegiatan</h1>
                    <p className="mt-1 text-sm text-gray-500">Temukan berbagai kegiatan yang tersedia</p>
                </div>
                
                <div className="relative w-full md:w-72">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="size-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari kegiatan..."
                        className="block w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3 text-sm placeholder:text-gray-400 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F]"
                    />
                </div>
            </div>

            <div className="flex gap-6">
                {/* Sidebar Filters */}
                <aside className="w-44 shrink-0">
                    <div className="sticky top-0 space-y-6">
                        {/* Category Filter */}
                        <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Kategori</p>
                            <div className="space-y-2">
                                {categories.map((cat) => (
                                    <label key={cat.id} className="flex cursor-pointer items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat.id.toString())}
                                            onChange={() => toggleCategory(cat.id.toString())}
                                            className="size-3.5 rounded border-gray-300 text-[#2F3E8F] accent-[#2F3E8F]"
                                        />
                                        <span className="text-sm text-gray-700">{cat.name}</span>
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
                            <span className="font-medium text-gray-900">{activities.total}</span> kegiatan ditemukan
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Urutkan:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 focus:border-[#2F3E8F] focus:outline-none"
                            >
                                {sortOptions.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Event Cards */}
                    <div className="space-y-3">
                        {activities.data.map((event) => (
                            <Link
                                key={event.id}
                                href={`/kegiatan/${event.id}`}
                                className="flex items-start gap-4 overflow-hidden rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
                            >
                                <img
                                    src={event.poster_url ?? FALLBACK_IMAGE}
                                    alt={event.title}
                                    className="h-20 w-32 shrink-0 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="mb-1 flex items-start justify-between gap-2">
                                        <h3 className="text-sm font-semibold text-gray-900">{event.title}</h3>
                                        <CategoryBadge category={event.category?.name ?? 'Umum'} />
                                    </div>
                                    <div className="mb-2 flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="size-3" />
                                            {event.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="size-3" />
                                            {formatDate(event.event_date)}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-2">{event.description}</p>
                                </div>
                                <button
                                    className="shrink-0 rounded-lg p-1.5 hover:bg-gray-100 transition-colors"
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
