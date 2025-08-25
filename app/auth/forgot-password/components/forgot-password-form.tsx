'use client';

import { forgotPasswordApiV1AuthForgotPasswordPostMutation } from '@/client/@tanstack/react-query.gen';
import { Button } from '@/components/ui/button';
import { getApiErrorMessage } from '@/app/utils/get-api-error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Logo } from '@/app/components/logo';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const forgotPasswordMutation = useMutation({
    ...forgotPasswordApiV1AuthForgotPasswordPostMutation(),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      await forgotPasswordMutation.mutateAsync({
        body: { email: data.email },
      });
      toast.success('Reset link sent to your email.');
      router.push('/auth/reset-email-sent');
    } catch (error: any) {
      // Check for invalid credentials error (email not found)
      if (error?.error_code === 'invalid_credentials') {
        setError('email', {
          type: 'manual',
          message: 'Email not found',
        });
      } else {
        const errorMessage = getApiErrorMessage(error);
        toast.error(`Failed to send reset link: ${errorMessage}`);
      }
    }
  };

  return (
    <div className="w-full max-w-[460px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-auto w-full flex-col justify-between rounded-2xl bg-white dark:bg-[#1C1E22] p-10 shadow-md"
      >
        <div className="space-y-5">
          <div className="text-center">
            <div className="mb-6">
              <Logo />
            </div>
            <h1 className="text-2xl font-bold text-black dark:text-white">Forgot Password?</h1>
            <p className="mt-8 text-left text-sm text-black dark:text-white">
              Enter your email and we will send you a reset password link.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-white">
              Email address
            </label>
            <input
              type="email"
              {...register('email')}
              className="mt-1 w-full rounded border p-2 focus:border-[#0A5A1A] focus:ring-[#0A5A1A] focus:outline-none"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between">
          <p className="text-sm text-gray-700 dark:text-white">
            Just remember?{' '}
            <Link href="/auth/signin" className="font-extrabold text-[#0A5A1A]">
              Login
            </Link>
          </p>
          <Button
            type="submit"
            className="!bg-[#0A5A1A] !text-white hover:!bg-[#0A5A1A]"
            disabled={forgotPasswordMutation.isPending}
          >
            {forgotPasswordMutation.isPending ? 'Sending...' : 'Send Link'}
          </Button>
        </div>
      </form>
    </div>
  );
}
