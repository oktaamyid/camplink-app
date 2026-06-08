import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link } from '@inertiajs/react';
import { Megaphone, Calendar, User, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Announcement {
    id: number;
    title: string;
    thumbnail_url: string | null;
    content: string;
    created_at: string;
    creator: {
        id: number;
        name: string;
    };
}

interface PaginationData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Props {
    announcements: PaginationData<Announcement>;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1434031211128-a3911116ac3f?w=800&h=450&fit=crop&auto=format';

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export default function AnnouncementIndex({ announcements }: Props) {
    return (
        <CampLinkLayout>
            <Head title="Pengumuman" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Pengumuman</h1>
                <p className="mt-1 text-sm text-gray-500">Informasi terbaru seputar kegiatan dan perkembangan kampus.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {announcements.data.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center bg-white rounded-3xl border border-dashed border-gray-300">
                        <Megaphone className="size-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900">Belum ada pengumuman</h3>
                        <p className="text-sm text-gray-500">Nantikan informasi menarik dari kami segera!</p>
                    </div>
                ) : (
                    announcements.data.map((announcement) => (
                        <Link 
                            key={announcement.id} 
                            href={`/pengumuman/${announcement.id}`}
                            className="group block"
                        >
                            <Card className="h-full overflow-hidden border-gray-200 transition-all hover:shadow-lg rounded-2xl">
                                <div className="relative aspect-video overflow-hidden">
                                    <img 
                                        src={announcement.thumbnail_url ?? FALLBACK_IMAGE} 
                                        alt={announcement.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <CardHeader className="p-4 pb-2">
                                    <CardTitle className="line-clamp-2 text-lg font-bold leading-tight text-gray-900 group-hover:text-[#2F3E8F] transition-colors">
                                        {announcement.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="size-3.5" />
                                            {formatDate(announcement.created_at)}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <User className="size-3.5" />
                                            {announcement.creator?.name || 'Admin'}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                        <span className="text-sm font-semibold text-[#2F3E8F]">Baca Selengkapnya</span>
                                        <ChevronRight className="size-4 text-[#2F3E8F] transition-transform group-hover:translate-x-1" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                )}
            </div>

            {/* Pagination placeholder if needed */}
            {announcements.last_page > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                    {/* Simplified pagination for now */}
                    <p className="text-sm text-gray-500">
                        Halaman {announcements.current_page} dari {announcements.last_page}
                    </p>
                </div>
            )}
        </CampLinkLayout>
    );
}
