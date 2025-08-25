'use client';

import { Logo } from '@/app/components/logo';
import { Button } from '@/components/ui/button';
import { PasswordValidationIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-[600px] rounded-md bg-white dark:bg-[#1C1E22] p-8 text-center shadow-lg">
        <header className="mb-6">
          <Logo />
        </header>

        <HugeiconsIcon
          icon={PasswordValidationIcon}
          className="mx-auto h-24 w-24 text-black dark:text-white"
        />

        <h1 className="mt-6 text-2xl font-semibold text-black dark:text-white">
          Password Reset Successful
        </h1>
        <p className="mt-4 text-black dark:text-white">
          Your password has been successfully reset. You can now log in with
          your new password.
        </p>

        <Link href="/auth/signin" className="mt-6 inline-block">
          <Button className="bg-[#0A5A1A] text-white hover:bg-[#0A5A1A]">
            Go to Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
}
