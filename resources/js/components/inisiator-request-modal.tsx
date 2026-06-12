import { useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CheckCircle2, AlertCircle, FileText, CreditCard, Clock, Plus } from 'lucide-react';
import { SharedData } from '@/types';
import { useState } from 'react';

export function InisiatorRequestModal() {
    const { auth } = usePage<SharedData>().props;
    const [open, setOpen] = useState(false);
    
    type InisiatorRequest = {
        status: 'pending' | 'approved' | 'rejected';
        admin_notes?: string;
        proposal_path: string;
        ktm_path: string;
    };
    
    const existingRequest = auth.user?.inisiator_request as InisiatorRequest | undefined;
    const alreadyHasRole = auth.user?.role === 'inisiator' || auth.user?.role === 'admin';

    const { setData, post, processing, errors, reset } = useForm({
        proposal: null as File | null,
        ktm: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('inisiator.request.store'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    if (alreadyHasRole) return null;

    const buttonText = existingRequest ? 'Progres Pengajuan' : 'Ajukan Jadi Inisiator';
    const buttonIcon = existingRequest ? <Clock className="size-4" /> : <Plus className="size-4" />;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="inline-flex items-center gap-2 rounded-xl bg-[#2F3E8F] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#243070] transition-all cursor-pointer">
                    {buttonIcon}
                    {buttonText}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#2F3E8F]">
                        {existingRequest ? 'Status Pengajuan Inisiator' : 'Jadi Inisiator Kegiatan'}
                    </DialogTitle>
                    <DialogDescription>
                        {existingRequest 
                            ? 'Pantau status pengajuan Anda untuk menjadi inisiator kegiatan.' 
                            : 'Ingin membuat kegiatan sendiri? Ajukan diri Anda sebagai Inisiator dengan melampirkan dokumen pendukung.'}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    {existingRequest ? (
                        <div className="space-y-6">
                            {existingRequest.status === 'pending' && (
                                <Alert className="bg-amber-50 border-amber-200">
                                    <Clock className="h-4 w-4 text-amber-600" />
                                    <AlertTitle className="text-amber-800">Sedang Diproses</AlertTitle>
                                    <AlertDescription className="text-amber-700">
                                        Permohonan Anda sedang ditinjau oleh tim admin. Kami akan memberitahu Anda segera setelah ada keputusan.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {existingRequest.status === 'approved' && (
                                <Alert className="bg-green-50 border-green-200">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <AlertTitle className="text-green-800">Disetujui</AlertTitle>
                                    <AlertDescription className="text-green-700">
                                        Selamat! Pengajuan Anda telah disetujui. Anda sekarang dapat membuat kegiatan baru.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {existingRequest.status === 'rejected' && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Ditolak</AlertTitle>
                                    <AlertDescription>
                                        Maaf, pengajuan Anda ditolak. {existingRequest.admin_notes && `Catatan admin: ${existingRequest.admin_notes}`}
                                        <div className="mt-4">
                                            <p className="text-sm mb-2">Anda dapat mengajukan kembali dengan dokumen yang lebih lengkap.</p>
                                        </div>
                                    </AlertDescription>
                                </Alert>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 border rounded-lg flex items-center gap-3">
                                    <FileText className="w-8 h-8 text-blue-500" />
                                    <div>
                                        <p className="text-xs text-gray-500">Proposal</p>
                                        <a href={existingRequest.proposal_path} target="_blank" className="text-sm font-medium text-blue-600 hover:underline">Lihat Dokumen</a>
                                    </div>
                                </div>
                                <div className="p-4 border rounded-lg flex items-center gap-3">
                                    <CreditCard className="w-8 h-8 text-blue-500" />
                                    <div>
                                        <p className="text-xs text-gray-500">KTM</p>
                                        <a href={existingRequest.ktm_path} target="_blank" className="text-sm font-medium text-blue-600 hover:underline">Lihat Gambar</a>
                                    </div>
                                </div>
                            </div>

                            {existingRequest.status === 'rejected' && (
                                <div className="mt-6 pt-6 border-t">
                                    <h3 className="font-semibold mb-4">Ajukan Ulang</h3>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="proposal">Proposal Kegiatan (PDF/DOC)</Label>
                                            <Input 
                                                id="proposal" 
                                                type="file" 
                                                onChange={e => setData('proposal', e.target.files?.[0] || null)}
                                            />
                                            {errors.proposal && <p className="text-sm text-red-500">{errors.proposal}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="ktm">Kartu Tanda Mahasiswa (KTM)</Label>
                                            <Input 
                                                id="ktm" 
                                                type="file" 
                                                accept="image/*"
                                                onChange={e => setData('ktm', e.target.files?.[0] || null)}
                                            />
                                            {errors.ktm && <p className="text-sm text-red-500">{errors.ktm}</p>}
                                        </div>

                                        <Button type="submit" disabled={processing} className="w-full bg-[#2F3E8F] hover:bg-[#1e2a6a]">
                                            {processing ? 'Mengirim...' : 'Kirim Ulang Pengajuan'}
                                        </Button>
                                    </form>
                                </div>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="proposal">Proposal Kegiatan (PDF/DOC)</Label>
                                <div className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-gray-400" />
                                    <Input 
                                        id="proposal" 
                                        type="file" 
                                        onChange={e => setData('proposal', e.target.files?.[0] || null)}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 italic">* Unggah draft proposal kegiatan yang ingin Anda buat.</p>
                                {errors.proposal && <p className="text-sm text-red-500">{errors.proposal}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ktm">Kartu Tanda Mahasiswa (KTM)</Label>
                                <div className="flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-gray-400" />
                                    <Input 
                                        id="ktm" 
                                        type="file" 
                                        accept="image/*"
                                        onChange={e => setData('ktm', e.target.files?.[0] || null)}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 italic">* Digunakan untuk memverifikasi identitas mahasiswa Anda.</p>
                                {errors.ktm && <p className="text-sm text-red-500">{errors.ktm}</p>}
                            </div>

                            <Button type="submit" disabled={processing} className="w-full bg-[#2F3E8F] hover:bg-[#1e2a6a]">
                                {processing ? 'Mengirim...' : 'Kirim Pengajuan'}
                            </Button>
                        </form>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
