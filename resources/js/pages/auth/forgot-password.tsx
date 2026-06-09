import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <AuthLayout title="Lupa Kata Sandi" description="Masukkan alamat email Anda untuk mendapatkan tautan atur ulang kata sandi">
            <Head title="Lupa Kata Sandi" />

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

            <form onSubmit={submit} className="flex flex-col gap-5">
                <div className="grid gap-5">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="font-semibold text-xs tracking-wider uppercase text-gray-500 dark:text-slate-400">Alamat Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="nama@email.com"
                            className="rounded-xl border-gray-200 dark:border-slate-800 bg-[#F8F9FB] dark:bg-slate-900/50 focus-visible:ring-indigo-500/20 dark:focus-visible:ring-indigo-500/10 focus-visible:border-indigo-500 transition-all duration-200 h-11 px-4"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <Button type="submit" className="mt-2 w-full h-11 rounded-xl bg-[#2F3E8F] dark:bg-indigo-600 hover:bg-[#233075] dark:hover:bg-indigo-500 text-white font-bold shadow-md hover:shadow-indigo-500/10 transition-all duration-200 active:scale-[0.98] border-none" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Kirim Tautan Atur Ulang
                    </Button>
                </div>

                <div className="text-center text-sm text-gray-500 dark:text-slate-400 mt-4">
                    Atau, kembali ke{' '}
                    <TextLink href={route('login')} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-bold ml-1">
                        Masuk
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
