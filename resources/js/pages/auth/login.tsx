import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Masuk ke CampLink" description="Masukkan email dan kata sandi Anda untuk masuk">
            <Head title="Masuk" />

            <form className="flex flex-col gap-5" onSubmit={submit}>
                <div className="grid gap-5">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="font-semibold text-xs tracking-wider uppercase text-gray-500 dark:text-slate-400">Alamat Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="nama@email.com"
                            className="rounded-xl border-gray-200 dark:border-slate-800 bg-[#F8F9FB] dark:bg-slate-900/50 focus-visible:ring-indigo-500/20 dark:focus-visible:ring-indigo-500/10 focus-visible:border-indigo-500 transition-all duration-200 h-11 px-4"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="font-semibold text-xs tracking-wider uppercase text-gray-500 dark:text-slate-400">Kata Sandi</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium" tabIndex={5}>
                                    Lupa kata sandi?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Masukkan kata sandi Anda"
                            className="rounded-xl border-gray-200 dark:border-slate-800 bg-[#F8F9FB] dark:bg-slate-900/50 focus-visible:ring-indigo-500/20 dark:focus-visible:ring-indigo-500/10 focus-visible:border-indigo-500 transition-all duration-200 h-11 px-4"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3 py-1">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                            className="border-gray-300 dark:border-slate-700 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 rounded-md"
                        />
                        <Label htmlFor="remember" className="text-sm text-gray-600 dark:text-slate-400 cursor-pointer select-none font-medium">Ingat saya</Label>
                    </div>

                    <Button type="submit" className="mt-2 w-full h-11 rounded-xl bg-[#2F3E8F] dark:bg-indigo-600 hover:bg-[#233075] dark:hover:bg-indigo-500 text-white font-bold shadow-md hover:shadow-indigo-500/10 transition-all duration-200 active:scale-[0.98] border-none" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Masuk Sistem
                    </Button>
                </div>

                <div className="text-center text-sm text-gray-500 dark:text-slate-400 mt-4">
                    Belum punya akun?{' '}
                    <TextLink href={route('register')} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-bold ml-1" tabIndex={5}>
                        Daftar di sini
                    </TextLink>
                </div>
            </form>

            {status && <div className="mt-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
