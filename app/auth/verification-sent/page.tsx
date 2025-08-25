'use client';

import { Logo } from '@/app/components/logo';
import { useAuthStore } from '@/app/store/use-auth-store';
import { MailSend02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import { useResendEmailCooldown } from '../verify-email/hooks/use-resend-email-cooldown';

export default function Page() {
  const { auth } = useAuthStore();
  const {
    handleResendEmail,
    isDisabled,
    isLoading,
    cooldownTime,
    isOnCooldown,
  } = useResendEmailCooldown();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-[600px] rounded-md bg-white dark:bg-[#1C1E22] p-8 text-center shadow-lg">
        <header className="mb-6">
          <Logo />
        </header>

        <HugeiconsIcon
          icon={MailSend02Icon}
          className="mx-auto h-24 w-24 text-black dark:text-white"
        />
        <h1 className="mt-6 text-2xl font-semibold text-black dark:text-white">
          Please verify your email
        </h1>
        <p className="mt-4 text-black dark:text-white">
          A verification email has been sent to your email address{' '}
          <span className="font-semibold">{auth.email}</span>.<br />
          Please check your inbox and follow the instructions to verify your
          email.
        </p>

        <div className="mt-8">
          <Button
            onClick={handleResendEmail}
            disabled={isDisabled}
            className="bg-[#0A5A1A] text-white hover:bg-[#0A5A1A] disabled:opacity-50"
          >
            {isLoading
              ? 'Sending...'
              : isOnCooldown
                ? `Resend email (${cooldownTime})`
                : 'Resend email'}
          </Button>
        </div>
      </div>
    </div>
  );
}
