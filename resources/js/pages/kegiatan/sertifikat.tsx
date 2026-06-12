import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Upload, FileText, CheckCircle2 } from 'lucide-react';
import { useState, FormEventHandler } from 'react';

interface Certificate {
    id: number;
    file_url: string;
    certificate_code: string;
}

interface Participant {
    user_id: number;
    name: string;
    email: string;
    certificate: Certificate | null;
}

interface Props {
    activity: {
        id: number;
        title: string;
    };
    participants: Participant[];
}

export default function KelolaSertifikat({ activity, participants }: Props) {
    const { data, setData, post, processing, errors } = useForm<{ certificates: Record<number, File | null> }>({
        certificates: {},
    });

    const formErrors = errors as Record<string, string | undefined>;

    const [selectedFileNames, setSelectedFileNames] = useState<Record<number, string>>({});

    const handleFileChange = (userId: number, file: File | null) => {
        setData('certificates', {
            ...data.certificates,
            [userId]: file,
        });

        if (file) {
            setSelectedFileNames({
                ...selectedFileNames,
                [userId]: file.name,
            });
        } else {
            const newNames = { ...selectedFileNames };
            delete newNames[userId];
            setSelectedFileNames(newNames);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        
        // Convert to format Inertia expects for array of files
        post(`/kegiatan/${activity.id}/sertifikat`, {
            forceFormData: true,
            onSuccess: () => {
                setData('certificates', {});
                setSelectedFileNames({});
            }
        });
    };

    const getInitials = (name: string) => {
        return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
    };

    return (
        <CampLinkLayout>
            <Head title={`Kelola Sertifikat - ${activity.title}`} />

            <div className="mb-4">
                <Link
                    href={`/kegiatan/${activity.id}`}
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Kembali ke Detail Kegiatan
                </Link>
            </div>

            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kelola Sertifikat</h1>
                    <p className="mt-1 text-sm text-gray-500">Unggah sertifikat digital untuk peserta {activity.title}</p>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={processing || Object.keys(data.certificates).length === 0}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2F3E8F] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#243070] transition-all disabled:opacity-50"
                >
                    <Upload className="size-4" />
                    {processing ? 'Mengunggah...' : 'Simpan Semua'}
                </button>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4">Peserta</th>
                            <th className="px-6 py-4">Status Sertifikat</th>
                            <th className="px-6 py-4">Aksi / Upload Baru</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {participants.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">Belum ada peserta terdaftar.</td>
                            </tr>
                        ) : (
                            participants.map((participant) => (
                                <tr key={participant.user_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Link href={route('profil.index', participant.user_id)} className="flex size-10 items-center justify-center rounded-full bg-[#EEF1FA] text-[#2F3E8F] font-bold text-xs hover:opacity-90 transition-opacity">
                                                {getInitials(participant.name)}
                                            </Link>
                                            <div>
                                                <Link href={route('profil.index', participant.user_id)} className="font-bold text-gray-900 hover:underline block">{participant.name}</Link>
                                                <p className="text-xs text-gray-500">{participant.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {participant.certificate ? (
                                            <div className="flex flex-col gap-1">
                                                <span className="inline-flex items-center gap-1 w-max rounded-full bg-green-50 border border-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                                                    <CheckCircle2 className="size-3.5" /> Sudah Ada
                                                </span>
                                                <a href={participant.certificate.file_url} target="_blank" className="text-[10px] text-[#2F3E8F] hover:underline flex items-center gap-1">
                                                    <FileText className="size-3" /> Lihat File
                                                </a>
                                            </div>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
                                                Belum Ada
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <label className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-3 transition-colors ${
                                            selectedFileNames[participant.user_id] 
                                            ? 'border-indigo-300 bg-indigo-50 hover:bg-indigo-100' 
                                            : 'border-gray-200 bg-gray-50 hover:border-[#2F3E8F] hover:bg-[#EEF1FA]'
                                        }`}>
                                            <Upload className={`size-4 ${selectedFileNames[participant.user_id] ? 'text-indigo-600' : 'text-gray-400'}`} />
                                            <span className={`text-xs font-medium truncate max-w-[200px] ${selectedFileNames[participant.user_id] ? 'text-indigo-700' : 'text-gray-600'}`}>
                                                {selectedFileNames[participant.user_id] || 'Pilih File (PDF/JPG/PNG)'}
                                            </span>
                                            <input 
                                                type="file" 
                                                accept=".pdf,image/*"
                                                className="sr-only" 
                                                onChange={(e) => handleFileChange(participant.user_id, e.target.files?.[0] || null)}
                                            />
                                        </label>
                                        {formErrors[`certificates.${participant.user_id}`] && (
                                            <p className="mt-1 text-xs text-red-500">{formErrors[`certificates.${participant.user_id}`]}</p>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-6 flex justify-end">
                <p className="text-xs text-gray-500 bg-white p-3 rounded-lg border border-gray-200">
                    <span className="font-bold">Tips:</span> Anda dapat memilih file sertifikat untuk banyak peserta sekaligus sebelum mengklik tombol "Simpan Semua". File akan ditimpa jika peserta sudah memiliki sertifikat sebelumnya.
                </p>
            </div>
        </CampLinkLayout>
    );
}
