import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Upload, Bold, Italic, Underline, List, ListOrdered, AlignLeft, Link2, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const categories = ['Seminar', 'Workshop', 'Lomba', 'Penelitian', 'Proyek'];
const locations = ['Online', 'Auditorium Kampus', 'Lab Komputer', 'Fakultas Teknik', 'Lainnya'];

export default function BuatKegiatan() {
    const [form, setForm] = useState({
        title: '',
        category: '',
        description: '',
        date: '',
        location: '',
        deadline: '',
        poster: null as File | null,
    });

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Frontend only - no actual submission
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
                            value={form.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F]"
                        />
                    </div>

                    {/* Category */}
                    <div className="md:col-span-1">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Kategori
                        </label>
                        <div className="relative">
                            <select
                                value={form.category}
                                onChange={(e) => handleChange('category', e.target.value)}
                                className="w-full appearance-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F]"
                            >
                                <option value="">Pilih kategori</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Deskripsi
                        </label>
                        {/* Simple toolbar */}
                        <div className="flex items-center gap-0.5 rounded-t-lg border border-b-0 border-gray-200 bg-gray-50 px-2 py-1.5">
                            {[Bold, Italic, Underline, List, ListOrdered, AlignLeft, Link2].map((Icon, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    className="flex size-7 items-center justify-center rounded hover:bg-gray-200 text-gray-600 transition-colors"
                                >
                                    <Icon className="size-3.5" />
                                </button>
                            ))}
                        </div>
                        <textarea
                            placeholder="Jelaskan kegiatan Anda secara detail..."
                            value={form.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            rows={5}
                            className="w-full rounded-b-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F] resize-none"
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Tanggal Pelaksanaan
                        </label>
                        <input
                            type="date"
                            value={form.date}
                            onChange={(e) => handleChange('date', e.target.value)}
                            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F]"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Lokasi
                        </label>
                        <div className="relative">
                            <select
                                value={form.location}
                                onChange={(e) => handleChange('location', e.target.value)}
                                className="w-full appearance-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F]"
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
                    </div>

                    {/* Deadline */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Deadline Pendaftaran
                        </label>
                        <input
                            type="date"
                            value={form.deadline}
                            onChange={(e) => handleChange('deadline', e.target.value)}
                            className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 focus:border-[#2F3E8F] focus:outline-none focus:ring-1 focus:ring-[#2F3E8F]"
                        />
                    </div>

                    {/* Poster Upload */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Poster / Gambar
                        </label>
                        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-6 hover:border-[#2F3E8F] hover:bg-[#EEF1FA] transition-colors">
                            <Upload className="size-5 text-gray-400" />
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-600">Upload Gambar</p>
                                <p className="text-xs text-gray-400">JPG, PNG, maksimal 2MB</p>
                            </div>
                            <input type="file" accept="image/*" className="sr-only" />
                        </label>
                    </div>
                </div>

                {/* Submit */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="rounded-lg bg-[#2F3E8F] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#243070] transition-colors"
                    >
                        Simpan Kegiatan
                    </button>
                </div>
            </form>
        </CampLinkLayout>
    );
}
