import { type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Save, User, GraduationCap, MapPin } from 'lucide-react';

import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CampLinkLayout from '@/layouts/camplink-layout';

export default function Profile() {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        bio: (auth.user.bio as string) || '',
        university: (auth.user.university as string) || '',
        major: (auth.user.major as string) || '',
        semester: (auth.user.semester as string) || '',
        location: (auth.user.location as string) || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <CampLinkLayout>
            <Head title="Edit Profil" />

            <div className="max-w-3xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Profil</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Perbarui informasi profil Anda dan bagaimana orang lain melihat Anda di platform.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Informasi Dasar */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <User className="size-4 text-[#2F3E8F]" />
                                Informasi Dasar
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Lengkap</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="bio">Bio Singkat</Label>
                                    <Textarea
                                        id="bio"
                                        rows={3}
                                        className="resize-none"
                                        value={data.bio}
                                        onChange={(e) => setData('bio', e.target.value)}
                                        placeholder="Ceritakan sedikit tentang diri Anda..."
                                    />
                                    <InputError message={errors.bio} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Akademik & Lokasi */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <GraduationCap className="size-4 text-[#2F3E8F]" />
                                Akademik & Lokasi
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="university">Universitas / Instansi</Label>
                                    <Input
                                        id="university"
                                        type="text"
                                        value={data.university}
                                        onChange={(e) => setData('university', e.target.value)}
                                        placeholder="Contoh: STT Terpadu Nurul Fikri"
                                    />
                                    <InputError message={errors.university} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="major">Jurusan</Label>
                                    <Input
                                        id="major"
                                        type="text"
                                        value={data.major}
                                        onChange={(e) => setData('major', e.target.value)}
                                    />
                                    <InputError message={errors.major} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="semester">Semester</Label>
                                    <Input
                                        id="semester"
                                        type="text"
                                        value={data.semester}
                                        onChange={(e) => setData('semester', e.target.value)}
                                        placeholder="Contoh: Semester 6"
                                    />
                                    <InputError message={errors.semester} />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="location" className="flex items-center gap-1">
                                        <MapPin className="size-3 text-gray-400" /> Lokasi
                                    </Label>
                                    <Input
                                        id="location"
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="Contoh: Jakarta, Indonesia"
                                    />
                                    <InputError message={errors.location} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center justify-end gap-4 pt-2">
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out duration-300"
                            enterFrom="opacity-0 translate-y-1"
                            leave="transition ease-in-out duration-300"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <p className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                                Profil berhasil disimpan!
                            </p>
                        </Transition>

                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-[#2F3E8F] text-white hover:bg-[#2F3E8F]/90"
                        >
                            <Save />
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </div>
        </CampLinkLayout>
    );
}
