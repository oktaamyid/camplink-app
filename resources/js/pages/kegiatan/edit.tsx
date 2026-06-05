import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { ArrowLeft, Upload, ChevronDown } from 'lucide-react';

interface Category {
    id: number;
    name: string;
}

interface Activity {
    id: number;
    title: string;
    description: string;
    category_id: number;
    location: string | null;
    event_date: string | null;
    deadline_date: string | null;
    poster_url: string | null;
    requirements: string | null;
    max_participants: number | null;
    contact_person: string | null;
    is_online: boolean;
    meeting_link: string | null;
    event_time: string | null;
}

interface Props {
    activity: Activity;
    categories: Category[];
}

const locations = ['Online', 'Auditorium Kampus', 'Lab Komputer', 'Fakultas Teknik', 'Lainnya'];

export default function EditKegiatan({ activity, categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: activity.title || '',
        category_id: String(activity.category_id) || '',
        description: activity.description || '',
        event_date: activity.event_date || '',
        location: activity.location || '',
        deadline_date: activity.deadline_date || '',
        poster: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('kegiatan.update', activity.id));
    };

    return (
        <CampLinkLayout>
            <Head title="Edit Kegiatan" />

            <div className="mb-4">
                <Link
                    href={`/kegiatan/${activity.id}`}
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Kembali ke Detail
                </Link>
            </div>

            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900">Edit Kegiatan</h1>
                <p className="mt-1 text-sm text-gray-500">Perbarui informasi kegiatan Anda</p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-3xl">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Title */}
                    <div className="md:col-span-1">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Judul Kegiatan
                        </label>
                        <input
                            type="text"
                            placeholder="Masukkan judul kegiatan"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className={`w-full rounded-lg border ${errors.title ? 'border-red-500' : 'border-gray-200'} px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F]`}
                        />
                        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                    </div>

                    {/* Category */}
                    <div className="md:col-span-1">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Kategori
                        </label>
                        <div className="relative">
                            <select
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className={`w-full appearance-none rounded-lg border ${errors.category_id ? 'border-red-500' : 'border-gray-200'} px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F]`}
                            >
                                <option value="">Pilih kategori</option>
                                {categories?.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                        </div>
                        {errors.category_id && <p className="mt-1 text-xs text-red-500">{errors.category_id}</p>}
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Deskripsi
                        </label>
                        <textarea
                            placeholder="Jelaskan kegiatan Anda secara detail..."
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={5}
                            className={`w-full rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-200'} px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F] resize-none`}
                        />
                        {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                    </div>

                    {/* Date */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Tanggal Pelaksanaan
                        </label>
                        <input
                            type="date"
                            value={data.event_date}
                            onChange={(e) => setData('event_date', e.target.value)}
                            className={`w-full rounded-lg border ${errors.event_date ? 'border-red-500' : 'border-gray-200'} px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F]`}
                        />
                        {errors.event_date && <p className="mt-1 text-xs text-red-500">{errors.event_date}</p>}
                    </div>

                    {/* Location */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Lokasi
                        </label>
                        <div className="relative">
                            <select
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className={`w-full appearance-none rounded-lg border ${errors.location ? 'border-red-500' : 'border-gray-200'} px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F]`}
                            >
                                <option value="">Pilih lokasi</option>
                                {locations.map((loc) => (
                                    <option key={loc} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                        </div>
                        {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
                    </div>

                    {/* Deadline */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Deadline Pendaftaran
                        </label>
                        <input
                            type="date"
                            value={data.deadline_date}
                            onChange={(e) => setData('deadline_date', e.target.value)}
                            className={`w-full rounded-lg border ${errors.deadline_date ? 'border-red-500' : 'border-gray-200'} px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F]`}
                        />
                        {errors.deadline_date && <p className="mt-1 text-xs text-red-500">{errors.deadline_date}</p>}
                    </div>

                    {/* Poster Upload */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Poster / Gambar
                        </label>
                        {activity.poster_url && !data.poster && (
                            <div className="mb-2 overflow-hidden rounded-lg border border-gray-200">
                                <img src={activity.poster_url} alt="Current poster" className="h-28 w-full object-cover" />
                            </div>
                        )}
                        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-6 hover:border-[#2F3E8F] hover:bg-[#EEF1FA] transition-colors">
                            <Upload className="size-5 text-gray-400" />
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-600">
                                    {data.poster ? data.poster.name : 'Upload Gambar Baru'}
                                </p>
                                <p className="text-xs text-gray-400">JPG, PNG, maksimal 2MB</p>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={(e) => setData('poster', e.target.files?.[0] || null)}
                            />
                        </label>
                        {errors.poster && <p className="mt-1 text-xs text-red-500">{errors.poster}</p>}
                    </div>
                </div>

                {/* Submit */}
                <div className="mt-6 flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-[#2F3E8F] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#243070] transition-colors disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                    <Link
                        href={`/kegiatan/${activity.id}`}
                        className="rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Batal
                    </Link>
                </div>
            </form>
        </CampLinkLayout>
    );
}
