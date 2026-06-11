import { type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Save, User, GraduationCap, MapPin, ArrowLeft, Globe, Github, Linkedin, Instagram } from 'lucide-react';

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
        website_url: (auth.user.website_url as string) || '',
        github_url: (auth.user.github_url as string) || '',
        linkedin_url: (auth.user.linkedin_url as string) || '',
        instagram_url: (auth.user.instagram_url as string) || '',
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

            <div className="mb-4">
                <Link
                    href="/profil"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Kembali
                </Link>
            </div>

            <div className='mb-6'>
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

                {/* Tautan Sosial */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <Globe className="size-4 text-[#2F3E8F]" />
                            Tautan Sosial
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="website_url" className="flex items-center gap-1">
                                    <Globe className="size-3 text-gray-400" /> Website / Portfolio
                                </Label>
                                <Input
                                    id="website_url"
                                    type="url"
                                    value={data.website_url}
                                    onChange={(e) => setData('website_url', e.target.value)}
                                    placeholder="https://example.com"
                                />
                                <InputError message={errors.website_url} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="github_url" className="flex items-center gap-1">
                                    <Github className="size-3 text-gray-400" /> GitHub
                                </Label>
                                <Input
                                    id="github_url"
                                    type="url"
                                    value={data.github_url}
                                    onChange={(e) => setData('github_url', e.target.value)}
                                    placeholder="https://github.com/username"
                                />
                                <InputError message={errors.github_url} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="linkedin_url" className="flex items-center gap-1">
                                    <Linkedin className="size-3 text-gray-400" /> LinkedIn
                                </Label>
                                <Input
                                    id="linkedin_url"
                                    type="url"
                                    value={data.linkedin_url}
                                    onChange={(e) => setData('linkedin_url', e.target.value)}
                                    placeholder="https://linkedin.com/in/username"
                                />
                                <InputError message={errors.linkedin_url} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="instagram_url" className="flex items-center gap-1">
                                    <Instagram className="size-3 text-gray-400" /> Instagram
                                </Label>
                                <Input
                                    id="instagram_url"
                                    type="url"
                                    value={data.instagram_url}
                                    onChange={(e) => setData('instagram_url', e.target.value)}
                                    placeholder="https://instagram.com/username"
                                />
                                <InputError message={errors.instagram_url} />
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
        </CampLinkLayout>
    );
}
