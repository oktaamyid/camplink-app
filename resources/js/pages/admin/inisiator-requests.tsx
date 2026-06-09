import { Head, router } from '@inertiajs/react';
import CampLinkLayout from '@/layouts/camplink-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { FileText, Eye, CheckCircle, XCircle } from 'lucide-react';

interface InisiatorRequest {
    id: number;
    user_id: number;
    proposal_path: string;
    ktm_path: string;
    status: 'pending' | 'approved' | 'rejected';
    admin_notes: string | null;
    created_at: string;
    user: {
        id: number;
        name: string;
        email: string;
        university: string;
    };
}

interface Props {
    requests: InisiatorRequest[];
}

export default function AdminInisiatorRequests({ requests }: Props) {
    const [selectedRequest, setSelectedRequest] = useState<InisiatorRequest | null>(null);
    const [adminNotes, setAdminNotes] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleUpdateStatus = (id: number, status: 'approved' | 'rejected') => {
        router.patch(route('admin.inisiator-requests.update', id), {
            status,
            admin_notes: adminNotes,
        }, {
            onSuccess: () => {
                setIsDialogOpen(false);
                setAdminNotes('');
                setSelectedRequest(null);
            }
        });
    };

    return (
        <CampLinkLayout>
            <Head title="Kelola Permohonan Inisiator" />

            <div className="p-4 md:p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Permohonan Inisiator</h1>
                    <p className="text-gray-500">Tinjau dan kelola pengajuan role inisiator dari mahasiswa.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Pengajuan</CardTitle>
                        <CardDescription>Menampilkan semua pengajuan inisiator yang masuk.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold">Mahasiswa</th>
                                        <th className="px-6 py-3 font-semibold">Universitas</th>
                                        <th className="px-6 py-3 font-semibold">Tanggal</th>
                                        <th className="px-6 py-3 font-semibold">Status</th>
                                        <th className="px-6 py-3 font-semibold">Dokumen</th>
                                        <th className="px-6 py-3 font-semibold text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {requests.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="text-center py-8 text-gray-500">
                                                Tidak ada permohonan yang ditemukan.
                                            </td>
                                        </tr>
                                    ) : (
                                        requests.map((req) => (
                                            <tr key={req.id} className="bg-white hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-900">{req.user.name}</div>
                                                    <div className="text-xs text-gray-500">{req.user.email}</div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-900">{req.user.university}</td>
                                                <td className="px-6 py-4 text-gray-900">{new Date(req.created_at).toLocaleDateString('id-ID')}</td>
                                                <td className="px-6 py-4">
                                                    <Badge variant={
                                                        req.status === 'approved' ? 'default' : 
                                                        req.status === 'rejected' ? 'destructive' : 'outline'
                                                    }>
                                                        {req.status === 'approved' ? 'Disetujui' : 
                                                         req.status === 'rejected' ? 'Ditolak' : 'Pending'}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <a href={req.proposal_path} target="_blank" title="Lihat Proposal">
                                                            <FileText className="w-4 h-4 text-blue-600 hover:text-blue-800" />
                                                        </a>
                                                        <a href={req.ktm_path} target="_blank" title="Lihat KTM">
                                                            <Eye className="w-4 h-4 text-blue-600 hover:text-blue-800" />
                                                        </a>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {req.status === 'pending' && (
                                                        <Dialog open={isDialogOpen && selectedRequest?.id === req.id} onOpenChange={(open) => {
                                                            setIsDialogOpen(open);
                                                            if (open) setSelectedRequest(req);
                                                        }}>
                                                            <DialogTrigger asChild>
                                                                <Button variant="outline" size="sm">Tinjau</Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>Tinjau Permohonan: {req.user.name}</DialogTitle>
                                                                    <DialogDescription>
                                                                        Silakan periksa dokumen dan berikan keputusan.
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                
                                                                <div className="grid gap-4 py-4">
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <div className="space-y-2">
                                                                            <Label>Proposal</Label>
                                                                            <Button variant="outline" className="w-full justify-start" asChild>
                                                                                <a href={req.proposal_path} target="_blank">
                                                                                    <FileText className="mr-2 h-4 w-4" /> Buka Proposal
                                                                                </a>
                                                                            </Button>
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <Label>KTM</Label>
                                                                            <Button variant="outline" className="w-full justify-start" asChild>
                                                                                <a href={req.ktm_path} target="_blank">
                                                                                    <Eye className="mr-2 h-4 w-4" /> Buka KTM
                                                                                </a>
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div className="space-y-2">
                                                                        <Label htmlFor="notes">Catatan Admin (Opsional)</Label>
                                                                        <Textarea 
                                                                            id="notes" 
                                                                            placeholder="Alasan penolakan atau catatan tambahan..."
                                                                            value={adminNotes}
                                                                            onChange={(e) => setAdminNotes(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                
                                                                <DialogFooter className="flex gap-2 sm:justify-between">
                                                                    <Button 
                                                                        variant="destructive" 
                                                                        onClick={() => handleUpdateStatus(req.id, 'rejected')}
                                                                    >
                                                                        <XCircle className="mr-2 h-4 w-4" /> Tolak
                                                                    </Button>
                                                                    <Button 
                                                                        className="bg-green-600 hover:bg-green-700 text-white"
                                                                        onClick={() => handleUpdateStatus(req.id, 'approved')}
                                                                    >
                                                                        <CheckCircle className="mr-2 h-4 w-4" /> Setujui
                                                                    </Button>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </CampLinkLayout>
    );
}
