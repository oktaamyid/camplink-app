import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <AuthLayout title="Verifikasi Email Anda" description="Terima kasih telah mendaftar! Silakan verifikasi alamat email Anda dengan mengeklik tautan yang baru saja kami kirimkan ke email Anda. Jika tidak menerima email, kami dapat mengirimkannya kembali.">
            <Head title="Verifikasi Email" />

            {status === 'verification-link-sent' && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    Tautan verifikasi baru telah dikirim ke alamat email yang Anda gunakan saat mendaftar.
                </div>
            )}

            <form onSubmit={submit} className="flex flex-col gap-5 text-center">
                <Button type="submit" className="w-full h-11 rounded-xl bg-[#2F3E8F] dark:bg-indigo-600 hover:bg-[#233075] dark:hover:bg-indigo-500 text-white font-bold shadow-md hover:shadow-indigo-500/10 transition-all duration-200 active:scale-[0.98] border-none" disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                    Kirim Ulang Email Verifikasi
                </Button>

                <div className="text-center mt-4">
                    <TextLink href={route('logout')} method="post" className="text-sm font-bold text-red-500 hover:text-red-400 dark:text-red-400 dark:hover:text-red-300">
                        Keluar Sistem
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
