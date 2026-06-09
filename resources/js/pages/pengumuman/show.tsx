import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, ArrowLeft, Share2, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

interface Props {
    announcement: Announcement;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1434031211128-a3911116ac3f?w=1200&h=600&fit=crop&auto=format';

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export default function AnnouncementShow({ announcement }: Props) {
    return (
        <CampLinkLayout>
            <Head title={announcement.title} />

            <div className="max-w-4xl mx-auto">
                <Link 
                    href="/pengumuman"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#2F3E8F] transition-colors mb-6 group"
                >
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                    Kembali ke Pengumuman
                </Link>

                <article className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                    {/* Header Image */}
                    <div className="relative aspect-[21/9] overflow-hidden">
                        <img 
                            src={announcement.thumbnail_url ?? FALLBACK_IMAGE} 
                            alt={announcement.title}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="p-6 md:p-10">
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8">
                            <div className="flex items-center gap-2">
                                <div className="size-8 rounded-full bg-[#FDEBEC] flex items-center justify-center text-[#9F2F2D] font-bold text-xs">
                                    {announcement.creator?.name?.charAt(0) || 'A'}
                                </div>
                                <span className="font-semibold text-gray-900">{announcement.creator?.name || 'Admin'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="size-4 text-[#2F3E8F]" />
                                {formatDate(announcement.created_at)}
                            </div>
                            
                            <div className="ml-auto flex items-center gap-2">
                                <Button variant="outline" size="icon" className="rounded-full size-9 hover:bg-[#F8F9FB] hover:text-[#2F3E8F]">
                                    <Share2 className="size-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full size-9 hover:bg-[#F8F9FB] hover:text-[#2F3E8F]">
                                    <Printer className="size-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Content */}
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
                            {announcement.title}
                        </h1>

                        <div 
                            className="prose prose-blue max-w-none text-gray-700 leading-relaxed announcement-content"
                            dangerouslySetInnerHTML={{ __html: announcement.content }}
                        />
                    </div>
                </article>

                {/* Related or CTA footer could go here */}
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .announcement-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 1rem;
                    margin: 2rem auto;
                    display: block;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
                }
                .announcement-content p {
                    margin-bottom: 1.5rem;
                }
                .announcement-content h2 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: #111;
                }
                .announcement-content h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                    color: #111;
                }
                .announcement-content ul, .announcement-content ol {
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem;
                }
                .announcement-content li {
                    margin-bottom: 0.5rem;
                }
            ` }} />
        </CampLinkLayout>
    );
}
