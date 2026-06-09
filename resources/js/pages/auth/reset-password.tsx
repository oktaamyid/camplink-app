import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface ResetPasswordProps {
    token: string;
    email: string;
}

type ResetPasswordForm = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ResetPasswordForm>>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Atur Ulang Kata Sandi" description="Masukkan kata sandi baru Anda di bawah ini untuk memperbarui akun Anda">
            <Head title="Atur Ulang Kata Sandi" />

            <form onSubmit={submit} className="flex flex-col gap-5">
                <div className="grid gap-5">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="font-semibold text-xs tracking-wider uppercase text-gray-500 dark:text-slate-400">Alamat Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={data.email}
                            readOnly
                            onChange={(e) => setData('email', e.target.value)}
                            className="rounded-xl border-gray-200 dark:border-slate-800 bg-[#F0F0F0]/60 dark:bg-slate-900/30 text-gray-500 dark:text-slate-500 h-11 px-4 cursor-not-allowed"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password" className="font-semibold text-xs tracking-wider uppercase text-gray-500 dark:text-slate-400">Kata Sandi Baru</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            value={data.password}
                            autoFocus
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Kata sandi baru minimal 8 karakter"
                            className="rounded-xl border-gray-200 dark:border-slate-800 bg-[#F8F9FB] dark:bg-slate-900/50 focus-visible:ring-indigo-500/20 dark:focus-visible:ring-indigo-500/10 focus-visible:border-indigo-500 transition-all duration-200 h-11 px-4"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation" className="font-semibold text-xs tracking-wider uppercase text-gray-500 dark:text-slate-400">Konfirmasi Kata Sandi</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Ketik ulang kata sandi baru"
                            className="rounded-xl border-gray-200 dark:border-slate-800 bg-[#F8F9FB] dark:bg-slate-900/50 focus-visible:ring-indigo-500/20 dark:focus-visible:ring-indigo-500/10 focus-visible:border-indigo-500 transition-all duration-200 h-11 px-4"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full h-11 rounded-xl bg-[#2F3E8F] dark:bg-indigo-600 hover:bg-[#233075] dark:hover:bg-indigo-500 text-white font-bold shadow-md hover:shadow-indigo-500/10 transition-all duration-200 active:scale-[0.98] border-none" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Atur Ulang Kata Sandi
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
