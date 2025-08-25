'use client';

import { useRouter } from 'next/navigation';
import { Logo } from '@/app/components/logo';
import { useAuthStore } from '@/app/store/use-auth-store';
import { MailSend02Icon, ArrowLeft02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export default function Page() {
  const { auth } = useAuthStore();
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="relative w-full max-w-[600px] rounded-md bg-white dark:bg-[#1C1E22] p-8 text-center shadow-lg">
        <button
          onClick={() => router.push('/auth/forgot-password')}
          className="absolute top-4 left-4 text-black dark:text-white transition hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Back"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} className="h-6 w-6" />
        </button>

        <header className="mb-6">
          <Logo />
        </header>

        <HugeiconsIcon
          icon={MailSend02Icon}
          className="mx-auto h-24 w-24 text-black dark:text-white"
        />
        <h1 className="mt-6 text-2xl font-semibold text-black dark:text-white">
          Reset your email
        </h1>
        <p className="mt-4 text-black dark:text-white">
          A password reset link has been sent to your email address{' '}
          <span className="font-semibold">{auth.email}</span>.<br />
          Please check your inbox and follow the instructions to reset your
          password.
        </p>
      </div>
    </div>
  );
}
