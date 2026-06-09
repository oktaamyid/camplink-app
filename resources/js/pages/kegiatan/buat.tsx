import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Upload,  ChevronDown, Users, UserCheck } from 'lucide-react';

interface Category {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
}

const locations = ['Auditorium Kampus', 'Lab Komputer', 'Fakultas Teknik', 'Aula STT-NF', 'Lainnya'];

export default function BuatKegiatan({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category_id: '',
        description: '',
        requirements: '',
        event_date: '',
        location: '',
        is_online: false,
        meeting_link: '',
        deadline_date: '',
        quota: '',
        contact: '',
        poster: null as File | null,
        is_team_based: false,
        has_participants: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('kegiatan.store'));
    };

    return (
        <CampLinkLayout>
            <Head title="Buat Kegiatan" />

            <div className="mb-4">
                <Link
                    href="/kegiatan"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Kembali
                </Link>
            </div>

            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900">Buat Kegiatan Baru</h1>
                <p className="mt-1 text-sm text-gray-500">Bagikan kegiatan Anda kepada mahasiswa lainnya</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Title */}
                    <div className="md:col-span-2">
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

                    {/* Category & Is Team Based */}
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

                    <div className="md:col-span-1 flex flex-col justify-center gap-3 pt-6">
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.is_team_based}
                                onChange={(e) => setData('is_team_based', e.target.checked)}
                                className="size-4 rounded border-gray-300 text-[#2F3E8F] focus:ring-[#2F3E8F]"
                            />
                            <div className="flex items-center gap-1.5">
                                <Users className="size-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">Buka Rekrutmen Tim</span>
                            </div>
                        </label>
                        
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.has_participants}
                                onChange={(e) => setData('has_participants', e.target.checked)}
                                className="size-4 rounded border-gray-300 text-[#2F3E8F] focus:ring-[#2F3E8F]"
                            />
                            <div className="flex items-center gap-1.5">
                                <UserCheck className="size-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">Terima Peserta Umum</span>
                            </div>
                        </label>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-1">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Deskripsi
                        </label>
                        <textarea
                            placeholder="Jelaskan kegiatan Anda secara detail..."
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={6}
                            className={`w-full rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-200'} px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F] resize-none`}
                        />
                        {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                    </div>

                    {/* Requirements */}
                    <div className="md:col-span-1">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Persyaratan
                        </label>
                        <textarea
                            placeholder="Masukkan persyaratan peserta (opsional)..."
                            value={data.requirements}
                            onChange={(e) => setData('requirements', e.target.value)}
                            rows={6}
                            className={`w-full rounded-lg border ${errors.requirements ? 'border-red-500' : 'border-gray-200'} px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F] resize-none`}
                        />
                        {errors.requirements && <p className="mt-1 text-xs text-red-500">{errors.requirements}</p>}
                    </div>

                    {/* Date & Deadline */}
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

                    {/* Location & Is Online */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Lokasi / Tempat
                        </label>
                        <div className="relative">
                            <select
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                disabled={data.is_online}
                                className={`w-full appearance-none rounded-lg border ${errors.location ? 'border-red-500' : 'border-gray-200'} px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F] disabled:bg-gray-100 disabled:text-gray-400`}
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
                        
                        <div className="mt-2">
                            <label className="flex cursor-pointer items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.is_online}
                                    onChange={(e) => {
                                        setData('is_online', e.target.checked);
                                        if (e.target.checked) setData('location', 'Online');
                                    }}
                                    className="size-4 rounded border-gray-300 text-[#2F3E8F] focus:ring-[#2F3E8F]"
                                />
                                <span className="text-sm text-gray-700">Kegiatan Online (Daring)</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Link Meeting (Jika Online)
                        </label>
                        <input
                            type="url"
                            placeholder="https://zoom.us/j/..."
                            value={data.meeting_link}
                            onChange={(e) => setData('meeting_link', e.target.value)}
                            disabled={!data.is_online}
                            className={`w-full rounded-lg border ${errors.meeting_link ? 'border-red-500' : 'border-gray-200'} px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F] disabled:bg-gray-100 disabled:text-gray-400`}
                        />
                        {errors.meeting_link && <p className="mt-1 text-xs text-red-500">{errors.meeting_link}</p>}
                    </div>

                    {/* Quota & Contact */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Kuota Peserta
                        </label>
                        <input
                            type="number"
                            placeholder="Contoh: 50"
                            value={data.quota}
                            onChange={(e) => setData('quota', e.target.value)}
                            className={`w-full rounded-lg border ${errors.quota ? 'border-red-500' : 'border-gray-200'} px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F]`}
                        />
                        {errors.quota && <p className="mt-1 text-xs text-red-500">{errors.quota}</p>}
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Kontak Narahubung
                        </label>
                        <input
                            type="text"
                            placeholder="WhatsApp: 0812..."
                            value={data.contact}
                            onChange={(e) => setData('contact', e.target.value)}
                            className={`w-full rounded-lg border ${errors.contact ? 'border-red-500' : 'border-gray-200'} px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F]`}
                        />
                        {errors.contact && <p className="mt-1 text-xs text-red-500">{errors.contact}</p>}
                    </div>

                    {/* Poster Upload */}
                    <div className="md:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Poster / Gambar Kegiatan
                        </label>
                        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-8 hover:border-[#2F3E8F] hover:bg-[#EEF1FA] transition-colors">
                            <Upload className="size-6 text-gray-400" />
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-600">
                                    {data.poster ? data.poster.name : 'Klik untuk upload poster'}
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
                <div className="mt-8">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full sm:w-auto rounded-lg bg-[#2F3E8F] px-8 py-3 text-sm font-semibold text-white hover:bg-[#243070] transition-colors disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Terbitkan Kegiatan'}
                    </button>
                </div>
            </form>
        </CampLinkLayout>
    );
}
