/* eslint-disable react-hooks/exhaustive-deps */
import CampLinkLayout from '@/layouts/camplink-layout';
import { InisiatorRequestModal } from '@/components/inisiator-request-modal';
import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { 
    MapPin, 
    Calendar as CalendarIcon, 
    Bookmark, 
    Search, 
    LayoutGrid, 
    List, 
    ChevronLeft, 
    ChevronRight,
    Plus
} from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';

const categoryColors: Record<string, { bg: string; text: string }> = {
    Lomba: { bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-700 dark:text-blue-400' },
    Seminar: { bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-700 dark:text-purple-400' },
    Workshop: { bg: 'bg-orange-50 dark:bg-orange-950/40', text: 'text-orange-700 dark:text-orange-400' },
    Penelitian: { bg: 'bg-green-50 dark:bg-green-950/40', text: 'text-green-700 dark:text-green-400' },
    Proyek: { bg: 'bg-rose-50 dark:bg-rose-950/40', text: 'text-rose-700 dark:text-rose-400' },
};

const timeFilters = ['Semua', 'Minggu Ini', 'Bulan Ini', '3 Bulan Ke Depan'];
const sortOptions = ['Terbaru', 'Terlama', 'Deadline Terdekat'];

// Types
interface Category {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
}

interface Activity {
    id: number;
    title: string;
    category_id: number;
    category: Category;
    creator: User;
    location: string;
    event_date: string | null;
    deadline_date: string | null;
    description: string;
    poster_url: string | null;
    is_bookmarked?: boolean;
    status: string;
}

interface PaginationData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    links: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */;
}

interface Filters {
    search?: string;
    categories?: string[];
    time?: string;
    sort?: string;
    view?: 'card' | 'table' | 'calendar';
    tab?: 'all' | 'saved' | 'mine';
}

interface Props {
    activities: PaginationData<Activity> | Activity[]; // Can be array in calendar mode
    categories: Category[];
    filters: Filters;
}

function CategoryBadge({ category }: { category: string }) {
    const colors = categoryColors[category] ?? { bg: 'bg-gray-100', text: 'text-gray-600' };
    return (
        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${colors.bg} ${colors.text}`}>
            {category}
        </span>
    );
}

const formatDate = (dateString: string | null, short = false) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: short ? 'short' : 'long',
        year: 'numeric',
    });
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=220&fit=crop&auto=format';

export default function Kegiatan({ activities, categories, filters = {} }: Props) {
    const { auth } = usePage<SharedData>().props;
    
    // View state
    const [viewMode, setViewMode] = useState<'card' | 'table' | 'calendar'>(filters.view || 'card');
    const [activeTab, setActiveTab] = useState<'all' | 'saved' | 'mine'>(filters.tab || 'all');
    
    // Filter states
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

    const updateFilters = (overrides: Partial<Filters> = {}) => {
        router.get(
            '/kegiatan',
            {
                search: searchQuery,
                categories: selectedCategories,
                time: selectedTime,
                sort: sortBy,
                view: viewMode,
                tab: activeTab,
                ...overrides
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    // apply filters when state changes (debounced for search)
    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => updateFilters(), 300);

        return () => {
            if (searchTimeout.current) clearTimeout(searchTimeout.current);
        };
    }, [searchQuery, selectedCategories, selectedTime, sortBy, viewMode, activeTab]);

    // Calendar state
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const daysInMonth = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        
        const days = [];
        // Pad previous month
        for (let i = 0; i < firstDay; i++) days.push(null);
        // Current month days
        for (let i = 1; i <= lastDate; i++) days.push(new Date(year, month, i));
        
        return days;
    }, [currentMonth]);

    const changeMonth = (offset: number) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1);
        setCurrentMonth(newDate);
    };

    // Normalize activities data based on view mode (paginated vs array)
    const activitiesList = Array.isArray(activities) ? activities : activities.data;
    const pagination = Array.isArray(activities) ? null : activities;

    const toggleBookmark = (id: number) => {
        router.post(route('kegiatan.bookmark.toggle', id), {}, { preserveScroll: true });
    };

    return (
        <CampLinkLayout>
            <Head title="Kegiatan" />

            {/* Sub-Header with Tabs and Actions */}
            <div className="mb-6 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Eksplorasi Kegiatan</h1>
                        <p className="mt-1 text-sm text-gray-500">Temukan dan kelola agenda kegiatan kampus STT-NF.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {auth.user?.role === 'mahasiswa' ? (
                            <InisiatorRequestModal />
                        ) : (
                            <Link 
                                href="/kegiatan/buat"
                                className="inline-flex items-center gap-2 rounded-xl bg-[#2F3E8F] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#243070] transition-all"
                            >
                                <Plus className="size-4" />
                                Buat Kegiatan
                            </Link>
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200">
                    {/* Tabs */}
                    <div className="flex -mb-px">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${
                                activeTab === 'all' 
                                ? 'border-[#2F3E8F] text-[#2F3E8F]' 
                                : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200'
                            }`}
                        >
                            Semua Kegiatan
                        </button>
                        {auth.user && (
                            <button
                                onClick={() => setActiveTab('saved')}
                                className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
                                    activeTab === 'saved' 
                                    ? 'border-[#2F3E8F] text-[#2F3E8F]' 
                                    : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200'
                                }`}
                            >
                                <Bookmark className={`size-4 ${activeTab === 'saved' ? 'fill-[#2F3E8F]' : ''}`} />
                                Tersimpan
                            </button>
                        )}
                        {(auth.user?.role === 'inisiator' || auth.user?.role === 'admin') && (
                            <button
                                onClick={() => setActiveTab('mine')}
                                className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
                                    activeTab === 'mine' 
                                    ? 'border-[#2F3E8F] text-[#2F3E8F]' 
                                    : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200'
                                }`}
                            >
                                <List className="size-4" />
                                Kegiatan Saya
                            </button>
                        )}
                    </div>

                    {/* View Switcher */}
                    <div className="flex items-center bg-gray-100 p-1 rounded-xl mb-2 sm:mb-0">
                        <button
                            onClick={() => setViewMode('card')}
                            className={`p-1.5 rounded-lg transition-all ${viewMode === 'card' ? 'bg-white shadow-sm text-[#2F3E8F]' : 'text-gray-400 hover:text-gray-600'}`}
                            title="Grid View"
                        >
                            <LayoutGrid className="size-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-1.5 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white shadow-sm text-[#2F3E8F]' : 'text-gray-400 hover:text-gray-600'}`}
                            title="Table View"
                        >
                            <List className="size-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('calendar')}
                            className={`p-1.5 rounded-lg transition-all ${viewMode === 'calendar' ? 'bg-white shadow-sm text-[#2F3E8F]' : 'text-gray-400 hover:text-gray-600'}`}
                            title="Calendar View"
                        >
                            <CalendarIcon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters - Hide or adapt in Calendar Mode? User said "gabung saja" so keep filters */}
                <aside className="w-full lg:w-64 shrink-0 space-y-8">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari judul..."
                            className="block w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-3 text-sm focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F]"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">Kategori</p>
                        <div className="space-y-3">
                            {categories.map((cat) => (
                                <label key={cat.id} className="flex cursor-pointer items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(cat.id.toString())}
                                                onChange={() => toggleCategory(cat.id.toString())}
                                                className="peer size-4 rounded-md border-gray-300 text-[#2F3E8F] focus:ring-[#2F3E8F]"
                                            />
                                        </div>
                                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors font-medium">{cat.name}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Time Filter */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">Waktu</p>
                        <div className="space-y-3">
                            {timeFilters.map((time) => (
                                <label key={time} className="flex cursor-pointer items-center gap-3 group">
                                    <input
                                        type="radio"
                                        name="time"
                                        checked={selectedTime === time}
                                        onChange={() => setSelectedTime(time)}
                                        className="size-4 border-gray-300 text-[#2F3E8F] focus:ring-[#2F3E8F]"
                                    />
                                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors font-medium">{time}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">
                    {viewMode === 'card' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    Menampilkan <span className="font-bold text-gray-900">{pagination?.total || 0}</span> hasil
                                </p>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 focus:border-[#2F3E8F] focus:outline-none shadow-sm"
                                >
                                    {sortOptions.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {activitiesList.map((event) => (
                                    <div key={event.id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-lg hover:border-[#2F3E8F]/20">
                                        <Link href={`/kegiatan/${event.id}`} className="block h-44 overflow-hidden relative">
                                            <img
                                                src={event.poster_url ?? FALLBACK_IMAGE}
                                                alt={event.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                                <span className="text-white text-xs font-medium">Lihat Detail</span>
                                            </div>
                                            <div className="absolute top-3 left-3">
                                                <CategoryBadge category={event.category?.name ?? 'Umum'} />
                                            </div>
                                        </Link>
                                        <div className="flex flex-col p-4 flex-1">
                                            <div className="flex justify-between items-start gap-2 mb-2">
                                                <Link href={`/kegiatan/${event.id}`} className="hover:text-[#2F3E8F] transition-colors">
                                                    <h3 className="font-bold text-gray-900 line-clamp-1 leading-snug">{event.title}</h3>
                                                </Link>
                                                {auth.user && (
                                                    <button 
                                                        onClick={() => toggleBookmark(event.id)}
                                                        className={`shrink-0 transition-all ${event.is_bookmarked ? 'text-[#2F3E8F]' : 'text-gray-300 hover:text-[#2F3E8F]'}`}
                                                    >
                                                        <Bookmark className={`size-5 ${event.is_bookmarked ? 'fill-current' : ''}`} />
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-1">{event.description}</p>
                                            <div className="space-y-2 border-t border-gray-50 pt-3 text-[11px] font-medium text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <CalendarIcon className="size-3.5 text-gray-400" />
                                                    {formatDate(event.event_date)}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="size-3.5 text-gray-400" />
                                                    <span className="truncate">{event.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Pagination Placeholder */}
                            {pagination && pagination.last_page > 1 && (
                                <div className="mt-8 flex justify-center gap-1">
                                    {/* Simple pagination logic could go here */}
                                    <p className="text-xs text-gray-400">Halaman {pagination.current_page} dari {pagination.last_page}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {viewMode === 'table' && (
                        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4">Kegiatan</th>
                                        <th className="px-6 py-4">Kategori</th>
                                        <th className="px-6 py-4">Tanggal</th>
                                        <th className="px-6 py-4">Lokasi</th>
                                        <th className="px-6 py-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {activitiesList.map((event) => (
                                        <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={event.poster_url ?? FALLBACK_IMAGE} className="size-10 rounded-lg object-cover shrink-0" />
                                                    <div>
                                                        <Link href={`/kegiatan/${event.id}`} className="font-bold text-gray-900 hover:text-[#2F3E8F] transition-colors line-clamp-1">{event.title}</Link>
                                                        <p className="text-[10px] text-gray-400">Oleh {event.creator?.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <CategoryBadge category={event.category?.name ?? 'Umum'} />
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 text-xs whitespace-nowrap">
                                                {formatDate(event.event_date, true)}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 text-xs truncate max-w-[150px]">
                                                {event.location}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    {auth.user && (
                                                        <button 
                                                            onClick={() => toggleBookmark(event.id)}
                                                            className={`p-1.5 rounded-lg transition-all ${event.is_bookmarked ? 'bg-[#EEF1FA] text-[#2F3E8F]' : 'text-gray-300 hover:text-[#2F3E8F] hover:bg-gray-50'}`}
                                                        >
                                                            <Bookmark className={`size-4 ${event.is_bookmarked ? 'fill-current' : ''}`} />
                                                        </button>
                                                    )}
                                                    <Link href={`/kegiatan/${event.id}`} className="p-1.5 rounded-lg text-[#2F3E8F] hover:bg-[#EEF1FA] transition-all">
                                                        <ChevronRight className="size-4" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {viewMode === 'calendar' && (
                        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900">
                                    {currentMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                                </h2>
                                <div className="flex gap-2">
                                    <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><ChevronLeft className="size-4" /></button>
                                    <button onClick={() => setCurrentMonth(new Date())} className="px-3 py-1 text-xs font-bold text-[#2F3E8F] bg-[#EEF1FA] rounded-lg">Hari Ini</button>
                                    <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><ChevronRight className="size-4" /></button>
                                </div>
                            </div>
                            <div className="grid grid-cols-7 text-center border-b border-gray-50">
                                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => (
                                    <div key={d} className="py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{d}</div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 grid-rows-5 bg-gray-50/50">
                                {daysInMonth.map((day, i) => {
                                    if (!day) return <div key={`pad-${i}`} className="h-24 sm:h-32 border-r border-b border-gray-100 bg-gray-50/30" />;
                                    
                                    const dateStr = day.toISOString().split('T')[0];
                                    const dayEvents = activitiesList.filter(e => e.event_date?.startsWith(dateStr));
                                    const isToday = new Date().toDateString() === day.toDateString();

                                    return (
                                        <div key={dateStr} className={`h-24 sm:h-32 border-r border-b border-gray-100 bg-white p-2 flex flex-col gap-1 overflow-hidden hover:bg-gray-50 transition-colors`}>
                                            <span className={`text-[11px] font-bold ${isToday ? 'bg-[#2F3E8F] text-white size-6 flex items-center justify-center rounded-full' : 'text-gray-400'}`}>
                                                {day.getDate()}
                                            </span>
                                            <div className="flex flex-col gap-1 mt-1 overflow-y-auto custom-scrollbar">
                                                {dayEvents.map(e => (
                                                    <Link 
                                                        key={e.id} 
                                                        href={`/kegiatan/${e.id}`}
                                                        className="px-1.5 py-0.5 rounded bg-[#EEF1FA] dark:bg-slate-800 text-[9px] font-bold text-[#2F3E8F] dark:text-indigo-400 truncate hover:bg-[#2F3E8F] dark:hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                                        title={e.title}
                                                    >
                                                        {e.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {activitiesList.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                            <Search className="size-12 text-gray-100 mb-4" />
                            <h3 className="text-lg font-bold text-gray-900">Tidak ada kegiatan</h3>
                            <p className="text-sm text-gray-500 mt-1 px-6 text-center max-w-sm">Coba sesuaikan filter atau kata kunci pencarian Anda untuk menemukan kegiatan yang sesuai.</p>
                            <button 
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategories([]);
                                    setSelectedTime('Semua');
                                }}
                                className="mt-6 text-sm font-bold text-[#2F3E8F] hover:underline"
                            >
                                Reset Semua Filter
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </CampLinkLayout>
    );
}
