import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<{ password: string }>>({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout
            title="Konfirmasi Kata Sandi"
            description="Ini adalah area aman aplikasi. Harap konfirmasi kata sandi Anda terlebih dahulu sebelum melanjutkan."
        >
            <Head title="Konfirmasi Kata Sandi" />

            <form onSubmit={submit} className="flex flex-col gap-5">
                <div className="grid gap-5">
                    <div className="grid gap-2">
                        <Label htmlFor="password" className="font-semibold text-xs tracking-wider uppercase text-gray-500 dark:text-slate-400">Kata Sandi</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Masukkan kata sandi Anda"
                            autoComplete="current-password"
                            value={data.password}
                            autoFocus
                            onChange={(e) => setData('password', e.target.value)}
                            className="rounded-xl border-gray-200 dark:border-slate-800 bg-[#F8F9FB] dark:bg-slate-900/50 focus-visible:ring-indigo-500/20 dark:focus-visible:ring-indigo-500/10 focus-visible:border-indigo-500 transition-all duration-200 h-11 px-4"
                        />

                        <InputError message={errors.password} />
                    </div>

                    <Button type="submit" className="mt-2 w-full h-11 rounded-xl bg-[#2F3E8F] dark:bg-indigo-600 hover:bg-[#233075] dark:hover:bg-indigo-500 text-white font-bold shadow-md hover:shadow-indigo-500/10 transition-all duration-200 active:scale-[0.98] border-none" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Konfirmasi Kata Sandi
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
