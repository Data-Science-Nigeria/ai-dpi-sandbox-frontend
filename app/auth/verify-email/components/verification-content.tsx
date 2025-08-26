'use client';

import { Spinner } from '@/app/components/spinner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type VerificationState = 'loading' | 'success' | 'error';

interface VerificationContentProps {
  state: VerificationState;
  error?: string;
  email?: string;
  onResendEmail: () => void;
  isResending: boolean;
}

export const VerificationContent = ({
  state,
  error,
  email,
  onResendEmail,
  isResending,
}: VerificationContentProps) => {
  if (state === 'loading') {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const isError = state === 'error';
  const Icon = isError ? XCircleIcon : CheckCircleIcon;
  const title = `Email verification ${isError ? 'failed' : 'successful'}`;

  return (
    <div className="mx-auto max-w-[500px]">
      <Icon
        className={cn('mx-auto h-24 w-24', isError ? 'text-red-500' : 'text-green-500')}
      />

      <h1 className="mt-6 text-2xl font-semibold text-white">{title}</h1>

      {isError ? (
        <p className="mt-4">{error || 'An error occurred'}</p>
      ) : (
        <p className="mt-4 text-white">
          Congratulations! Your email account <br />
          <span className="font-semibold text-white">{email}</span> has been
          verified
        </p>
      )}

      <div className="mt-10">
        {isError ? (
          <Button
            onClick={onResendEmail}
            disabled={isResending}
            className="bg-white text-[#0A5A1A] hover:bg-white"
          >
            {isResending ? 'Sending...' : 'Resend email'}
          </Button>
        ) : (
          <Link href="/auth/signin">
            <Button className="bg-white text-[#0A5A1A] hover:bg-white">
              Continue to login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
