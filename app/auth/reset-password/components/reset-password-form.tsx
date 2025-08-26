/*'use client';

import { resetPasswordRedirectApiV1AuthResetPasswordPostMutation } from '@/client/@tanstack/react-query.gen';
import { Button } from '@/components/ui/button';
import { getApiErrorMessage } from '@/app/utils/get-api-error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { PasswordInput } from '@/app/auth/components/password-input';
import { Logo } from '@/app/components/logo';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const resetPasswordMut = useMutation({
    ...resetPasswordRedirectApiV1AuthResetPasswordPostMutation(),
  });

  const onSubmit = async (data: ResetPasswordData) => {
    try {
      await resetPasswordMut.mutateAsync({
        body: {
          password: data.password,
        },
        query: {
          token: new URLSearchParams(window.location.search).get('token') || '',
        },
      });
      toast.success('Password updated successfully.');
      router.push('/auth/password-reset-success');
    } catch (error) {
      console.error('Error updating password:', error);
      const errorMessage = getApiErrorMessage(error);
      toast.error(errorMessage);
      setError('password', {
        type: 'manual',
        message: errorMessage || 'Failed to update password. Please try again.',
      });
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
            <h1 className="text-2xl font-bold text-black dark:text-white">Reset Password</h1>
            <p className="mt-8 text-left text-sm text-black dark:text-white">
              Please create a new password that you do not use on any other
              site.
            </p>
          </div>

          <PasswordInput
            {...register('password')}
            error={errors.password?.message}
            label="New Password"
          />

          <PasswordInput
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            label="Confirm Password"
          />
        </div>

        <Button
          type="submit"
          className="mx-auto mt-12 bg-[#0A5A1A] hover:bg-[#0A5A1A]"
          disabled={resetPasswordMut.isPending}
        >
          {resetPasswordMut.isPending ? 'Updating...' : 'Reset Password'}
        </Button>
      </form>
    </div>
  );
}*/
