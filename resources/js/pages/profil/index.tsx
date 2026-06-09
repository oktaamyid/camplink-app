/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CampLinkLayout from '@/layouts/camplink-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit3, MapPin, Mail, Globe, Github, Linkedin, Instagram, Plus, Bookmark, X, Check, Briefcase, GraduationCap, Award, Trash2, Calendar, MessageSquare, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const categoryColors: Record<string, { bg: string; text: string }> = {
    Lomba: { bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-700 dark:text-blue-400' },
    Seminar: { bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-700 dark:text-purple-400' },
    Workshop: { bg: 'bg-orange-50 dark:bg-orange-950/40', text: 'text-orange-700 dark:text-orange-400' },
    Penelitian: { bg: 'bg-green-50 dark:bg-green-950/40', text: 'text-green-700 dark:text-green-400' },
    Proyek: { bg: 'bg-rose-50 dark:bg-rose-950/40', text: 'text-rose-700 dark:text-rose-400' },
};

export default function Profil({ profileData }: { profileData: any }) {
    const { auth } = usePage().props as any;
    
    const profile = {
        id: profileData.id,
        name: profileData.name,
        role: profileData.role === 'mahasiswa' ? 'Mahasiswa' : (profileData.role === 'inisiator' ? 'Inisiator' : 'Admin'),
        university: profileData.university,
        major: profileData.major,
        semester: profileData.semester,
        location: profileData.location,
        email: profileData.email,
        bio: profileData.bio,
        skills: profileData.skills || [],
        interests: profileData.interests || [],
        stats: profileData.stats,
        events: profileData.events,
        experience: profileData.experience || [],
        education: profileData.education || [],
        external_certificates: profileData.external_certificates || [],
    };

    const isOwnProfile = !profile.id || auth?.user?.id === profile.id;

    const [isEditingSkills, setIsEditingSkills] = useState(false);
    const [skillsInput, setSkillsInput] = useState(profile.skills.join(', '));
    const [isEditingInterests, setIsEditingInterests] = useState(false);
    const [interestsInput, setInterestsInput] = useState(profile.interests.join(', '));

    // Experience state
    const [showExpDialog, setShowExpDialog] = useState(false);
    const [expIndex, setExpIndex] = useState<number | null>(null);
    const [expTitle, setExpTitle] = useState('');
    const [expCompany, setExpCompany] = useState('');
    const [expDuration, setExpDuration] = useState('');
    const [expDescription, setExpDescription] = useState('');

    // Education state
    const [showEduDialog, setShowEduDialog] = useState(false);
    const [eduIndex, setEduIndex] = useState<number | null>(null);
    const [eduSchool, setEduSchool] = useState('');
    const [eduDegree, setEduDegree] = useState('');
    const [eduField, setEduField] = useState('');
    const [eduDuration, setEduDuration] = useState('');

    // External Certificates state
    const [showCertDialog, setShowCertDialog] = useState(false);
    const [certIndex, setCertIndex] = useState<number | null>(null);
    const [certName, setCertName] = useState('');
    const [certIssuer, setCertIssuer] = useState('');
    const [certDate, setCertDate] = useState('');
    const [certId, setCertId] = useState('');
    const [certUrl, setCertUrl] = useState('');

    const saveSkills = () => {
        router.patch(route('profile.update'), { skills: skillsInput }, { preserveScroll: true, onSuccess: () => setIsEditingSkills(false) });
    };

    const saveInterests = () => {
        router.patch(route('profile.update'), { interests: interestsInput }, { preserveScroll: true, onSuccess: () => setIsEditingInterests(false) });
    };

    // Modal Helpers
    const openExpModal = (index: number | null = null) => {
        if (index !== null) {
            const item = profile.experience[index];
            setExpTitle(item.title || '');
            setExpCompany(item.company || '');
            setExpDuration(item.duration || '');
            setExpDescription(item.description || '');
            setExpIndex(index);
        } else {
            setExpTitle('');
            setExpCompany('');
            setExpDuration('');
            setExpDescription('');
            setExpIndex(null);
        }
        setShowExpDialog(true);
    };

    const handleSaveExperience = () => {
        const updated = [...profile.experience];
        const item = { title: expTitle, company: expCompany, duration: expDuration, description: expDescription };
        if (expIndex !== null) {
            updated[expIndex] = item;
        } else {
            updated.push(item);
        }
        router.patch(route('profile.update'), { experience: updated }, {
            preserveScroll: true,
            onSuccess: () => setShowExpDialog(false)
        });
    };

    const handleDeleteExperience = (idx: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus pengalaman ini?')) return;
        const updated = profile.experience.filter((_: any, i: number) => i !== idx);
        router.patch(route('profile.update'), { experience: updated }, { preserveScroll: true });
    };

    const openEduModal = (index: number | null = null) => {
        if (index !== null) {
            const item = profile.education[index];
            setEduSchool(item.school || '');
            setEduDegree(item.degree || '');
            setEduField(item.field_of_study || '');
            setEduDuration(item.duration || '');
            setEduIndex(index);
        } else {
            setEduSchool('');
            setEduDegree('');
            setEduField('');
            setEduDuration('');
            setEduIndex(null);
        }
        setShowEduDialog(true);
    };

    const handleSaveEducation = () => {
        const updated = [...profile.education];
        const item = { school: eduSchool, degree: eduDegree, field_of_study: eduField, duration: eduDuration };
        if (eduIndex !== null) {
            updated[eduIndex] = item;
        } else {
            updated.push(item);
        }
        router.patch(route('profile.update'), { education: updated }, {
            preserveScroll: true,
            onSuccess: () => setShowEduDialog(false)
        });
    };

    const handleDeleteEducation = (idx: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus pendidikan ini?')) return;
        const updated = profile.education.filter((_: any, i: number) => i !== idx);
        router.patch(route('profile.update'), { education: updated }, { preserveScroll: true });
    };

    const openCertModal = (index: number | null = null) => {
        if (index !== null) {
            const item = profile.external_certificates[index];
            setCertName(item.name || '');
            setCertIssuer(item.issuing_organization || '');
            setCertDate(item.issue_date || '');
            setCertId(item.credential_id || '');
            setCertUrl(item.credential_url || '');
            setCertIndex(index);
        } else {
            setCertName('');
            setCertIssuer('');
            setCertDate('');
            setCertId('');
            setCertUrl('');
            setCertIndex(null);
        }
        setShowCertDialog(true);
    };

    const handleSaveCertificate = () => {
        const updated = [...profile.external_certificates];
        const item = { name: certName, issuing_organization: certIssuer, issue_date: certDate, credential_id: certId, credential_url: certUrl };
        if (certIndex !== null) {
            updated[certIndex] = item;
        } else {
            updated.push(item);
        }
        router.patch(route('profile.update'), { external_certificates: updated }, {
            preserveScroll: true,
            onSuccess: () => setShowCertDialog(false)
        });
    };

    const handleDeleteCertificate = (idx: number) => {
        if (!confirm('Apakah Anda yakin ingin menghapus sertifikat ini?')) return;
        const updated = profile.external_certificates.filter((_: any, i: number) => i !== idx);
        router.patch(route('profile.update'), { external_certificates: updated }, { preserveScroll: true });
    };

    return (
        <CampLinkLayout>
            <Head title="Profil" />

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left column */}
                <div className="space-y-5">
                    {/* Profile card */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="flex size-16 items-center justify-center rounded-full bg-[#2F3E8F]">
                                    <span className="text-xl font-bold text-white">
                                        {profile.name.split(' ').slice(0, 2).map((n: string) => n[0]).join('').toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h1 className="text-base font-bold text-gray-900">{profile.name}</h1>
                                    <p className="text-sm text-gray-500">{profile.role}</p>
                                    <p className="text-xs text-gray-400">{profile.major} · {profile.semester}</p>
                                </div>
                            </div>
                            {isOwnProfile && (
                                <Link href={route('profile.edit')} className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                    <Edit3 className="size-3.5" />
                                    Edit
                                </Link>
                            )}
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed mb-4">{profile.bio}</p>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <MapPin className="size-4 text-gray-400 shrink-0" />
                                {profile.location}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Mail className="size-4 text-gray-400 shrink-0" />
                                <span className="truncate">{profile.email}</span>
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="mt-4 flex items-center gap-2">
                            {[Globe, Github, Linkedin, Instagram].map((Icon, i) => (
                                <button
                                    key={i}
                                    className="flex size-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-[#2F3E8F] hover:text-[#2F3E8F] transition-colors"
                                >
                                    <Icon className="size-4" />
                                </button>
                            ))}
                        </div>

                        {!isOwnProfile && (
                            <button
                                onClick={() => router.post('/pesan/mulai', { user_id: profile.id })}
                                className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-[#2F3E8F] text-white px-4 py-2.5 text-sm font-semibold hover:bg-[#243070] transition-colors shadow-sm"
                            >
                                <MessageSquare className="size-4" />
                                Kirim Pesan
                            </button>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { label: 'Kegiatan', value: profile.stats.events },
                            { label: 'Tim', value: profile.stats.teams },
                            { label: 'Prestasi', value: profile.stats.achievements },
                        ].map((stat) => (
                            <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-3 text-center">
                                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-xs text-gray-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Skills */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-gray-900">Skills</h2>
                            {!isEditingSkills ? (
                                isOwnProfile && (
                                    <button onClick={() => setIsEditingSkills(true)} className="flex items-center gap-1 text-xs font-medium text-[#2F3E8F] hover:underline">
                                        <Plus className="size-3" /> Tambah / Edit
                                    </button>
                                )
                            ) : (
                                <div className="flex gap-2">
                                    <button onClick={() => setIsEditingSkills(false)} className="text-gray-500 hover:text-gray-700">
                                        <X className="size-4" />
                                    </button>
                                    <button onClick={saveSkills} className="text-green-600 hover:text-green-700">
                                        <Check className="size-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                        {isEditingSkills ? (
                            <textarea
                                className="w-full rounded-lg border-gray-300 text-sm focus:border-[#2F3E8F] focus:ring-[#2F3E8F]"
                                rows={2}
                                value={skillsInput}
                                onChange={(e) => setSkillsInput(e.target.value)}
                                placeholder="Misal: React, Laravel, UI/UX (pisahkan dengan koma)"
                            />
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {profile.skills && profile.skills.length > 0 ? profile.skills.map((skill: string) => (
                                    <span
                                        key={skill}
                                        className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700"
                                    >
                                        {skill}
                                    </span>
                                )) : <p className="text-xs text-gray-500">Belum ada skill yang ditambahkan.</p>}
                            </div>
                        )}
                    </div>

                    {/* Interests */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-gray-900">Minat</h2>
                            {!isEditingInterests ? (
                                isOwnProfile && (
                                    <button onClick={() => setIsEditingInterests(true)} className="flex items-center gap-1 text-xs font-medium text-[#2F3E8F] hover:underline">
                                        <Plus className="size-3" /> Tambah / Edit
                                    </button>
                                )
                            ) : (
                                <div className="flex gap-2">
                                    <button onClick={() => setIsEditingInterests(false)} className="text-gray-500 hover:text-gray-700">
                                        <X className="size-4" />
                                    </button>
                                    <button onClick={saveInterests} className="text-green-600 hover:text-green-700">
                                        <Check className="size-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                        {isEditingInterests ? (
                            <textarea
                                className="w-full rounded-lg border-gray-300 text-sm focus:border-[#2F3E8F] focus:ring-[#2F3E8F]"
                                rows={2}
                                value={interestsInput}
                                onChange={(e) => setInterestsInput(e.target.value)}
                                placeholder="Misal: Web Development, Data Science (pisahkan dengan koma)"
                            />
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {profile.interests && profile.interests.length > 0 ? profile.interests.map((interest: string) => (
                                    <span
                                        key={interest}
                                        className="rounded-full bg-[#EEF1FA] dark:bg-slate-800 px-3 py-1 text-xs font-medium text-[#2F3E8F] dark:text-indigo-400"
                                    >
                                        {interest}
                                    </span>
                                )) : <p className="text-xs text-gray-500">Belum ada minat yang ditambahkan.</p>}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right column */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Joined events */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-gray-900">Kegiatan Diikuti</h2>
                            <span className="text-xs text-gray-500">{profile.events?.length || 0} kegiatan terakhir</span>
                        </div>
                        <div className="space-y-3">
                            {profile.events && profile.events.length > 0 ? profile.events.map((event: any, i: number) => {
                                const colors = categoryColors[event.category] ?? { bg: 'bg-gray-100', text: 'text-gray-600' };
                                return (
                                    <div
                                        key={event.id}
                                        className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-8 items-center justify-center rounded-lg bg-white border border-gray-200">
                                                <Bookmark className="size-4 text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{event.title}</p>
                                                <span className={`inline-flex rounded-md px-1.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text}`}>
                                                    {event.category}
                                                </span>
                                            </div>
                                        </div>
                                        <span
                                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                                                event.status === 'Aktif'
                                                    ? 'bg-green-50 text-green-700'
                                                    : 'bg-gray-100 text-gray-500'
                                            }`}
                                        >
                                            {event.status}
                                        </span>
                                    </div>
                                );
                            }) : <p className="text-sm text-gray-500 text-center py-4">Belum ada kegiatan yang diikuti.</p>}
                        </div>
                    </div>

                    {/* Pengalaman Kerja */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Briefcase className="size-5 text-[#2F3E8F]" />
                                <h2 className="text-sm font-semibold text-gray-900">Pengalaman Kerja</h2>
                            </div>
                            {isOwnProfile && (
                                <button
                                    onClick={() => openExpModal()}
                                    className="flex items-center gap-1 text-xs font-medium text-[#2F3E8F] hover:underline"
                                >
                                    <PlusCircle className="size-4" /> Tambah
                                </button>
                            )}
                        </div>
                        <div className="space-y-4">
                            {profile.experience && profile.experience.length > 0 ? (
                                profile.experience.map((exp: any, idx: number) => (
                                    <div key={idx} className="flex gap-4 border-l-2 border-gray-100 pl-4 relative group">
                                        <div className="absolute size-3 bg-[#2F3E8F] rounded-full -left-1.75 top-1.5" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="text-sm font-bold text-gray-900 leading-snug">{exp.title}</h3>
                                                    <p className="text-xs text-gray-600 font-medium">{exp.company}</p>
                                                    <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                                                        <Calendar className="size-3" /> {exp.duration}
                                                    </p>
                                                </div>
                                                {isOwnProfile && (
                                                    <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => openExpModal(idx)} className="p-1 text-gray-400 hover:text-[#2F3E8F]">
                                                            <Edit3 className="size-3.5" />
                                                        </button>
                                                        <button onClick={() => handleDeleteExperience(idx)} className="p-1 text-gray-400 hover:text-red-500">
                                                            <Trash2 className="size-3.5" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            {exp.description && (
                                                <p className="text-xs text-gray-500 mt-1.5 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-500 italic text-center py-2">Belum ada pengalaman kerja yang ditambahkan.</p>
                            )}
                        </div>
                    </div>

                    {/* Pendidikan */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="size-5 text-[#2F3E8F]" />
                                <h2 className="text-sm font-semibold text-gray-900">Pendidikan</h2>
                            </div>
                            {isOwnProfile && (
                                <button
                                    onClick={() => openEduModal()}
                                    className="flex items-center gap-1 text-xs font-medium text-[#2F3E8F] hover:underline"
                                >
                                    <PlusCircle className="size-4" /> Tambah
                                </button>
                            )}
                        </div>
                        <div className="space-y-4">
                            {profile.education && profile.education.length > 0 ? (
                                profile.education.map((edu: any, idx: number) => (
                                    <div key={idx} className="flex gap-4 border-l-2 border-gray-100 pl-4 relative group">
                                        <div className="absolute size-3 bg-[#2F3E8F] rounded-full -left-1.75 top-1.5" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="text-sm font-bold text-gray-900 leading-snug">{edu.school}</h3>
                                                    <p className="text-xs text-gray-600 font-medium">{edu.degree} · {edu.field_of_study}</p>
                                                    <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                                                        <Calendar className="size-3" /> {edu.duration}
                                                    </p>
                                                </div>
                                                {isOwnProfile && (
                                                    <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => openEduModal(idx)} className="p-1 text-gray-400 hover:text-[#2F3E8F]">
                                                            <Edit3 className="size-3.5" />
                                                        </button>
                                                        <button onClick={() => handleDeleteEducation(idx)} className="p-1 text-gray-400 hover:text-red-500">
                                                            <Trash2 className="size-3.5" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-500 italic text-center py-2">Belum ada riwayat pendidikan yang ditambahkan.</p>
                            )}
                        </div>
                    </div>

                    {/* Sertifikasi & Lisensi */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Award className="size-5 text-[#2F3E8F]" />
                                <h2 className="text-sm font-semibold text-gray-900">Sertifikasi & Lisensi</h2>
                            </div>
                            {isOwnProfile && (
                                <button
                                    onClick={() => openCertModal()}
                                    className="flex items-center gap-1 text-xs font-medium text-[#2F3E8F] hover:underline"
                                >
                                    <PlusCircle className="size-4" /> Tambah
                                </button>
                            )}
                        </div>
                        <div className="space-y-4">
                            {profile.external_certificates && profile.external_certificates.length > 0 ? (
                                profile.external_certificates.map((cert: any, idx: number) => (
                                    <div key={idx} className="flex items-start justify-between gap-4 group">
                                        <div className="flex gap-3">
                                            <div className="size-10 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center text-[#2F3E8F] shrink-0 mt-0.5">
                                                <Award className="size-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-gray-900 leading-snug">{cert.name}</h3>
                                                <p className="text-xs text-gray-600 font-medium">{cert.issuing_organization}</p>
                                                <p className="text-[11px] text-gray-400 mt-0.5">Diterbitkan: {cert.issue_date}</p>
                                                {cert.credential_id && (
                                                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">ID Kredensial: {cert.credential_id}</p>
                                                )}
                                                {cert.credential_url && (
                                                    <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="inline-flex text-xs text-[#2F3E8F] hover:underline font-semibold mt-1">
                                                        Tampilkan Kredensial
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        {isOwnProfile && (
                                            <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => openCertModal(idx)} className="p-1 text-gray-400 hover:text-[#2F3E8F]">
                                                    <Edit3 className="size-3.5" />
                                                </button>
                                                <button onClick={() => handleDeleteCertificate(idx)} className="p-1 text-gray-400 hover:text-red-500">
                                                    <Trash2 className="size-3.5" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-500 italic text-center py-2">Belum ada sertifikasi yang ditambahkan.</p>
                            )}
                        </div>
                    </div>

                    {/* Aktivitas Terbaru */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h2 className="mb-4 text-sm font-semibold text-gray-900">Aktivitas Terbaru</h2>
                        <div className="space-y-4">
                            {profile.events && profile.events.length > 0 ? profile.events.map((event: any, i: number) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#2F3E8F]" />
                                    <div>
                                        <p className="text-sm text-gray-700">Mendaftar kegiatan <span className="font-semibold">{event.title}</span></p>
                                        <p className="text-xs text-gray-400 mt-0.5">{event.time}</p>
                                    </div>
                                </div>
                            )) : <p className="text-sm text-gray-500 text-center py-4">Belum ada aktivitas terbaru.</p>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Experience Dialog */}
            <Dialog open={showExpDialog} onOpenChange={setShowExpDialog}>
                <DialogContent className="max-w-md p-6 bg-white rounded-2xl border border-gray-100 shadow-xl">
                    <DialogHeader>
                        <DialogTitle className="text-base font-bold text-gray-900">
                            {expIndex !== null ? 'Edit Pengalaman Kerja' : 'Tambah Pengalaman Kerja'}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-gray-500 mt-0.5">
                            Isi informasi pengalaman kerja Anda di bawah ini.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-1">
                            <Label htmlFor="expTitle" className="text-xs font-bold text-gray-700 flex">Jabatan / Posisi</Label>
                            <Input id="expTitle" value={expTitle} onChange={(e) => setExpTitle(e.target.value)} placeholder="Contoh: Frontend Developer" className="text-sm rounded-lg focus-visible:ring-[#2F3E8F]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="expCompany" className="text-xs font-bold text-gray-700 flex">Perusahaan / Instansi</Label>
                            <Input id="expCompany" value={expCompany} onChange={(e) => setExpCompany(e.target.value)} placeholder="Contoh: PT CampLink Indonesia" className="text-sm rounded-lg focus-visible:ring-[#2F3E8F]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="expDuration" className="text-xs font-bold text-gray-700 flex">Durasi / Waktu</Label>
                            <Input id="expDuration" value={expDuration} onChange={(e) => setExpDuration(e.target.value)} placeholder="Contoh: Jan 2024 - Sekarang" className="text-sm rounded-lg focus-visible:ring-[#2F3E8F]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="expDescription" className="text-xs font-bold text-gray-700 flex">Deskripsi Pekerjaan</Label>
                            <Textarea id="expDescription" value={expDescription} onChange={(e) => setExpDescription(e.target.value)} placeholder="Tulis rincian tugas dan pencapaian Anda..." rows={3} className="text-sm rounded-lg resize-none focus-visible:ring-[#2F3E8F]" />
                        </div>
                    </div>
                    <DialogFooter className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setShowExpDialog(false)} className="rounded-lg text-sm">Batal</Button>
                        <Button onClick={handleSaveExperience} className="bg-[#2F3E8F] text-white hover:bg-[#243070] rounded-lg text-sm px-5">Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Education Dialog */}
            <Dialog open={showEduDialog} onOpenChange={setShowEduDialog}>
                <DialogContent className="max-w-md p-6 bg-white rounded-2xl border border-gray-100 shadow-xl">
                    <DialogHeader>
                        <DialogTitle className="text-base font-bold text-gray-900">
                            {eduIndex !== null ? 'Edit Pendidikan' : 'Tambah Pendidikan'}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-gray-500 mt-0.5">
                            Isi riwayat pendidikan formal Anda di bawah ini.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-1">
                            <Label htmlFor="eduSchool" className="text-xs font-bold text-gray-700 flex">Nama Sekolah / Universitas</Label>
                            <Input id="eduSchool" value={eduSchool} onChange={(e) => setEduSchool(e.target.value)} placeholder="Contoh: STT Terpadu Nurul Fikri" className="text-sm rounded-lg focus-visible:ring-[#2F3E8F]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="eduDegree" className="text-xs font-bold text-gray-700 flex">Gelar / Kualifikasi</Label>
                            <Input id="eduDegree" value={eduDegree} onChange={(e) => setEduDegree(e.target.value)} placeholder="Contoh: Sarjana (S1)" className="text-sm rounded-lg focus-visible:ring-[#2F3E8F]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="eduField" className="text-xs font-bold text-gray-700 flex">Bidang Studi / Jurusan</Label>
                            <Input id="eduField" value={eduField} onChange={(e) => setEduField(e.target.value)} placeholder="Contoh: Teknik Informatika" className="text-sm rounded-lg focus-visible:ring-[#2F3E8F]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="eduDuration" className="text-xs font-bold text-gray-700 flex">Tahun Studi</Label>
                            <Input id="eduDuration" value={eduDuration} onChange={(e) => setEduDuration(e.target.value)} placeholder="Contoh: 2020 - 2024" className="text-sm rounded-lg focus-visible:ring-[#2F3E8F]" />
                        </div>
                    </div>
                    <DialogFooter className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setShowEduDialog(false)} className="rounded-lg text-sm">Batal</Button>
                        <Button onClick={handleSaveEducation} className="bg-[#2F3E8F] text-white hover:bg-[#243070] rounded-lg text-sm px-5">Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Certificate Dialog */}
            <Dialog open={showCertDialog} onOpenChange={setShowCertDialog}>
                <DialogContent className="max-w-md p-6 bg-white rounded-2xl border border-gray-100 shadow-xl">
                    <DialogHeader>
                        <DialogTitle className="text-base font-bold text-gray-900">
                            {certIndex !== null ? 'Edit Sertifikasi & Lisensi' : 'Tambah Sertifikasi & Lisensi'}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-gray-500 mt-0.5">
                            Isi informasi sertifikasi profesional yang Anda miliki.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-1">
                            <Label htmlFor="certName" className="text-xs font-bold text-gray-700 flex">Nama Sertifikat</Label>
                            <Input id="certName" value={certName} onChange={(e) => setCertName(e.target.value)} placeholder="Contoh: Google Cloud Certified Architect" className="text-sm rounded-lg focus-visible:ring-[#2F3E8F]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="certIssuer" className="text-xs font-bold text-gray-700 flex">Organisasi Penerbit</Label>
                            <Input id="certIssuer" value={certIssuer} onChange={(e) => setCertIssuer(e.target.value)} placeholder="Contoh: Google Cloud" className="text-sm rounded-lg focus-visible:ring-[#2F3E8F]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="certDate" className="text-xs font-bold text-gray-700 flex">Tanggal Terbit</Label>
                            <Input id="certDate" value={certDate} onChange={(e) => setCertDate(e.target.value)} placeholder="Contoh: Juni 2025" className="text-sm rounded-lg focus-visible:ring-[#2F3E8F]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="certId" className="text-xs font-bold text-gray-700 flex">ID Kredensial (Opsional)</Label>
                            <Input id="certId" value={certId} onChange={(e) => setCertId(e.target.value)} placeholder="Masukkan ID kredensial..." className="text-sm rounded-lg focus-visible:ring-[#2F3E8F]" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="certUrl" className="text-xs font-bold text-gray-700 flex">URL Kredensial (Opsional)</Label>
                            <Input id="certUrl" value={certUrl} onChange={(e) => setCertUrl(e.target.value)} placeholder="Contoh: https://credentials.com/verify/..." className="text-sm rounded-lg focus-visible:ring-[#2F3E8F]" />
                        </div>
                    </div>
                    <DialogFooter className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setShowCertDialog(false)} className="rounded-lg text-sm">Batal</Button>
                        <Button onClick={handleSaveCertificate} className="bg-[#2F3E8F] text-white hover:bg-[#243070] rounded-lg text-sm px-5">Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CampLinkLayout>
    );
}
