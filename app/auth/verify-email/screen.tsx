'use client';

import { verifyEmailApiV1AuthVerifyEmailPostMutation } from '@/client/@tanstack/react-query.gen';
import { Logo } from '@/app/components/logo';
import { useAuthStore } from '@/app/store/use-auth-store';
import { getApiErrorMessage } from '@/app/utils/get-api-error-message';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { VerificationContent } from './components/verification-content';
import { useResendEmail } from './hooks/use-resend-email';

type VerificationState = 'loading' | 'success' | 'error';

export function Screen() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { auth } = useAuthStore();
  const { isLoading: isResending, resendVerificationEmail } = useResendEmail();
  const [verificationState, setVerificationState] =
    useState<VerificationState>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const verifyEmailMutation = useMutation({
    ...verifyEmailApiV1AuthVerifyEmailPostMutation(),
  });

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setErrorMessage(
          'Please verify your email to continue. Click resend to get a new verification email.'
        );
        setVerificationState('error');
        return;
      }

      try {
        setVerificationState('loading');
        await verifyEmailMutation.mutateAsync({
          query: { token },
        });
        setVerificationState('success');
      } catch (error) {
        console.error('Email verification error:', error);
        const errorMsg = getApiErrorMessage(error);
        setErrorMessage(errorMsg);
        setVerificationState('error');
        toast.error(errorMsg);
      }
    };

    verify();
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4 text-white">
      <div className="w-full max-w-[600px] rounded-md bg-[#0A5A1A] p-8 text-center shadow-lg">
        <header className="mb-6">
          <Logo />
        </header>

        <main>
          <VerificationContent
            state={verificationState}
            error={errorMessage}
            email={auth?.email}
            onResendEmail={resendVerificationEmail}
            isResending={isResending}
          />
        </main>
      </div>
    </div>
  );
}
