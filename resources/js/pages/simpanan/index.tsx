import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Bookmark, BookmarkX, Calendar, MapPin, ChevronRight, Star } from 'lucide-react';
import { type SharedData } from '@/types';

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
    status: string;
}

interface BookmarkItem {
    id: number;
    is_priority: boolean;
    activity: Activity;
}

interface PageProps extends SharedData {
    bookmarks: {
        data: BookmarkItem[];
        links: { url: string | null; label: string; active: boolean }[];
        meta?: { current_page: number; last_page: number; total: number };
        current_page: number;
        last_page: number;
        total: number;
    };
}

const categoryColors: Record<string, { bg: string; text: string }> = {
    Lomba: { bg: 'bg-blue-50', text: 'text-blue-700' },
    Seminar: { bg: 'bg-purple-50', text: 'text-purple-700' },
    Workshop: { bg: 'bg-orange-50', text: 'text-orange-700' },
    Penelitian: { bg: 'bg-green-50', text: 'text-green-700' },
    Proyek: { bg: 'bg-rose-50', text: 'text-rose-700' },
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
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(dateStr));
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=220&fit=crop&auto=format';

export default function Simpanan() {
    const { bookmarks } = usePage<PageProps>().props;

    const removeBookmark = (activityId: number) => {
        router.delete(`/simpanan/${activityId}`, {
            preserveScroll: true,
        });
    };

    return (
        <CampLinkLayout>
            <Head title="Simpanan" />

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Bookmark className="size-5 text-[#2F3E8F]" />
                    Kegiatan Tersimpan
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Kegiatan yang kamu simpan untuk dilihat nanti.
                </p>
            </div>

            {bookmarks.data.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white py-20 text-center">
                    <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gray-50">
                        <Bookmark className="size-8 text-gray-300" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">Belum ada kegiatan tersimpan</h3>
                    <p className="mt-1 text-xs text-gray-500 max-w-xs">
                        Simpan kegiatan yang menarik dengan menekan ikon bookmark di halaman detail kegiatan.
                    </p>
                    <Link
                        href="/kegiatan"
                        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#2F3E8F] px-4 py-2 text-sm font-medium text-white hover:bg-[#243070] transition-colors"
                    >
                        Cari Kegiatan
                        <ChevronRight className="size-4" />
                    </Link>
                </div>
            ) : (
                <>
                    <p className="mb-4 text-sm text-gray-500">{bookmarks.total} kegiatan tersimpan</p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {bookmarks.data.map((item) => (
                            <div
                                key={item.id}
                                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
                            >
                                {/* Remove button */}
                                <button
                                    onClick={() => removeBookmark(item.activity.id)}
                                    title="Hapus dari simpanan"
                                    className="absolute right-2 top-2 z-10 flex size-7 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
                                >
                                    <BookmarkX className="size-4" />
                                </button>

                                <Link href={`/kegiatan/${item.activity.id}`}>
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={item.activity.poster_url ?? FALLBACK_IMAGE}
                                            alt={item.activity.title}
                                            className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute left-2 bottom-2">
                                            <CategoryBadge category={item.activity.category?.name ?? 'Umum'} />
                                        </div>
                                    </div>

                                    <div className="p-3">
                                        <h3 className="mb-2 text-xs font-semibold leading-snug text-gray-900 line-clamp-2">
                                            {item.activity.title}
                                        </h3>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <MapPin className="size-3 flex-shrink-0" />
                                                <span className="truncate">{item.activity.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <Calendar className="size-3 flex-shrink-0" />
                                                <span>{formatDate(item.activity.event_date)}</span>
                                            </div>
                                        </div>

                                        {/* Status badge */}
                                        <div className="mt-2">
                                            {item.activity.status === 'active' ? (
                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                                                    Aktif
                                                </span>
                                            ) : item.activity.status === 'completed' ? (
                                                <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                                                    Selesai
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-700">
                                                    {item.activity.status}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {bookmarks.last_page > 1 && (
                        <div className="mt-6 flex justify-center gap-2">
                            {bookmarks.links.map((link, i) => (
                                <button
                                    key={i}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                                        link.active
                                            ? 'bg-[#2F3E8F] text-white'
                                            : link.url
                                            ? 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                                            : 'border border-gray-100 text-gray-300 cursor-not-allowed'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </CampLinkLayout>
    );
}
