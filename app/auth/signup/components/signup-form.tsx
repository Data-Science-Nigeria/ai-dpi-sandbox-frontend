'use client';

import { registerUserApiV1AuthRegisterPostMutation } from '@/client/@tanstack/react-query.gen';
import { Button } from '@/components/ui/button';
import { getApiErrorMessage } from '@/app/utils/get-api-error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { PasswordInput } from '@/app/auth/components/password-input';
import { useAuthStore } from '@/app/store/use-auth-store';
import { Logo } from '@/app/components/logo';
import { PhoneInput } from '@/app/auth/components/phone-input';

const signUpSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must include at least one uppercase letter')
    .regex(/[a-z]/, 'Must include at least one lowercase letter')
    .regex(/[0-9]/, 'Must include at least one number'),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the terms'),
});

type SignUpData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const checkboxRef = useRef<HTMLDivElement>(null);

  const registerUser = useMutation({
    ...registerUserApiV1AuthRegisterPostMutation(),
    onSuccess: (res) => {
      setUser({
        id: res.id,
        email: res.email,
        is_verified: res.is_verified,
        created_at: res.created_at,
      });
      router.push('/auth/signin');
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      setIsSubmitting(false);
      const status = error?.status_code || error?.response?.status || error?.status || error?.code;
      const errorMessage = (status === 400 || status === 409) 
        ? (error?.error || getApiErrorMessage(error))
        : getApiErrorMessage(error);
      toast.error(errorMessage);
    },
  });



  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    setValue,
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const handleButtonClick = () => {
    const agreeToTerms = watch('agreeToTerms');
    if (!agreeToTerms) {
      checkboxRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const onSubmit = (data: SignUpData) => {
    setIsSubmitting(true);
    registerUser.mutate(
      {
        body: {
          email: data.email,
          password: data.password,
          first_name: data.firstName,
          last_name: data.lastName,
          phone_number: data.phoneNumber,
        },
      },
      {
        onError: (error: any) => {
          const status = error?.status_code || error?.response?.status || error?.status || error?.code;
          const errorMessage = (status === 400 || status === 409) 
            ? (error?.error || getApiErrorMessage(error))
            : getApiErrorMessage(error);
          setError('email', { message: errorMessage });
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-auto w-full max-w-[460px] flex-col justify-between rounded-2xl bg-white dark:bg-[#1C1E22] p-10 shadow-md"
    >
      <div className="space-y-5">
        <div className="text-left">
          <div className="mb-6">
            <Logo />
          </div>
          <p className="mt-2 text-sm text-black dark:text-white">
            Already have an account?{' '}
            <Link href="/auth/signin" className="font-extrabold text-[#0A5A1A]">
              Signin
            </Link>
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-white">
            Email address
          </label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 w-full rounded border p-2 focus:border-[#0A5A1A] focus:ring-[#0A5A1A] focus:outline-none dark:text-white"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-white">
              First name
            </label>
            <input
              type="text"
              {...register('firstName')}
              className="mt-1 w-full rounded border p-2 focus:border-[#0A5A1A] focus:ring-[#0A5A1A] focus:outline-none dark:text-white"
            />
            {errors.firstName && (
              <p className="text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-white">
              Last name
            </label>
            <input
              type="text"
              {...register('lastName')}
              className="mt-1 w-full rounded border p-2 focus:border-[#0A5A1A] focus:ring-[#0A5A1A] focus:outline-none dark:text-white"
            />
            {errors.lastName && (
              <p className="text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-white">
            Phone number
          </label>
          <div className="mt-1">
            <PhoneInput
              value={watch('phoneNumber') || ''}
              onChange={(value) => setValue('phoneNumber', value)}
              error={errors.phoneNumber?.message}
              placeholder="Phone number"
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-sm text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div>
          <PasswordInput
            {...register('password')}
            error={errors.password?.message}
            label="Password"
          />
        </div>
      </div>

      <Button
        type="submit"
        onClick={handleButtonClick}
        className="mx-auto mt-5 w-full bg-[#0A5A1A] hover:bg-[#0A5A1A]"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          'Register'
        )}
      </Button>

      <div className="mt-4" ref={checkboxRef}>
        <label className="flex items-start space-x-2">
          <input
            type="checkbox"
            {...register('agreeToTerms')}
            className="mt-1 h-4 w-4 rounded border-gray-300"
          />
          <span className="text-sm text-gray-600 dark:text-white">
            By clicking Create account, I agree that I have read and accepted
            the Terms of Use and Privacy Policy
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="mt-1 text-sm text-red-600">
            {errors.agreeToTerms.message}
          </p>
        )}
      </div>


    </form>
  );
}
