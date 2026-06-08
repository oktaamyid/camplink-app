import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { MapPin, Calendar, ChevronRight, Bookmark, Clock } from 'lucide-react';
import { SharedData } from '@/types';

interface Category {
    id: number;
    name: string;
}

interface Activity {
    id: number;
    title: string;
    category: Category;
    location: string;
    event_date: string;
    poster_url: string | null;
}

interface BerandaProps extends SharedData {
    recommendedEvents: Activity[];
    recentEvents: Activity[];
}

const categoryColors: Record<string, { bg: string; text: string }> = {
    Lomba: { bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-700 dark:text-blue-400' },
    Seminar: { bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-700 dark:text-purple-400' },
    Workshop: { bg: 'bg-orange-50 dark:bg-orange-950/40', text: 'text-orange-700 dark:text-orange-400' },
    Penelitian: { bg: 'bg-green-50 dark:bg-green-950/40', text: 'text-green-700 dark:text-green-400' },
    Proyek: { bg: 'bg-rose-50 dark:bg-rose-950/40', text: 'text-rose-700 dark:text-rose-400' },
};

function CategoryBadge({ category }: { category: string }) {
    const colors = categoryColors[category] ?? { bg: 'bg-gray-100', text: 'text-gray-600' };
    return (
        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
            {category}
        </span>
    );
}

function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(d);
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=220&fit=crop&auto=format';

export default function Beranda({ recommendedEvents, recentEvents }: BerandaProps) {
    const { auth } = usePage<BerandaProps>().props;

    return (
        <CampLinkLayout>
            <Head title="Beranda" />

            {/* Welcome section */}
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                    Hai, {auth?.user?.name || 'Mahasiswa'}! 👋
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                    Temukan kegiatan menarik dan bangun kolaborasi bersama mahasiswa lainnya.
                </p>
            </div>

            {/* Recommended Events */}
            <section className="mb-8">
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-slate-100">Rekomendasi Kegiatan</h2>
                    <Link href="/kegiatan" className="flex items-center gap-1 text-xs font-medium text-[#2F3E8F] dark:text-indigo-400 hover:underline">
                        Lihat semua
                        <ChevronRight className="size-3" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {recommendedEvents.map((event) => (
                        <Link
                            key={event.id}
                            href={`/kegiatan/${event.id}`}
                            className="group overflow-hidden rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#111625] transition-shadow hover:shadow-md"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={event.poster_url ?? FALLBACK_IMAGE}
                                    alt={event.title}
                                    className="h-28 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute left-2 top-2">
                                    <CategoryBadge category={event.category.name} />
                                </div>
                            </div>
                            <div className="p-3">
                                <h3 className="mb-2 text-xs font-semibold leading-snug text-gray-900 dark:text-slate-100 line-clamp-2">
                                    {event.title}
                                </h3>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400">
                                        <MapPin className="size-3 flex-shrink-0" />
                                        <span>{event.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400">
                                        <Calendar className="size-3 flex-shrink-0" />
                                        <span>{formatDate(event.event_date)}</span>
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
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-slate-100">Kegiatan Terbaru</h2>
                    <Link href="/kegiatan" className="flex items-center gap-1 text-xs font-medium text-[#2F3E8F] dark:text-indigo-400 hover:underline">
                        Lihat semua
                        <ChevronRight className="size-3" />
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#111625]">
                    {recentEvents.map((event, index) => (
                        <Link
                            key={event.id}
                            href={`/kegiatan/${event.id}`}
                            className={`flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors ${
                                index !== recentEvents.length - 1 ? 'border-b border-gray-100 dark:border-slate-800/60' : ''
                            }`}
                        >
                            <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-800">
                                <Clock className="size-4 text-gray-400 dark:text-slate-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-slate-200 truncate">{event.title}</p>
                            </div>
                            <CategoryBadge category={event.category.name} />
                            <span className="text-xs text-gray-400 dark:text-slate-500 flex-shrink-0">{formatDate(event.event_date)}</span>
                            <span className="text-xs text-gray-400 dark:text-slate-500 flex-shrink-0 hidden md:block">{event.location}</span>
                            <button
                                className="flex-shrink-0 rounded p-1 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                <Bookmark className="size-4 text-gray-400 dark:text-slate-500" />
                            </button>
                        </Link>
                    ))}
                </div>
            </section>
        </CampLinkLayout>
    );
}
