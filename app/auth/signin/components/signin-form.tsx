"use client";

import { authPostApiV1AuthLoginJsonLoginJsonMutation } from "@/client/@tanstack/react-query.gen";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/app/utils/get-api-error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
//import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { PasswordInput } from "@/app/auth/components/password-input";
import { useAuthStore } from "@/app/store/use-auth-store";
import { client } from "@/client/client.gen";
import { Logo } from "@/app/components/logo";
import { authGetApiV1AuthMeGetCurrentUserProfile } from "@/client/sdk.gen";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type SignInData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const { setAuth, setUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const login = useMutation({
    ...authPostApiV1AuthLoginJsonLoginJsonMutation(),
    onSuccess: async (tokenRes: any) => {
      setAuth(tokenRes);

      client.setConfig({
        headers: {
          Authorization: `Bearer ${tokenRes.access_token}`,
        },
      });

      // Fetch user profile after successful login
      try {
        const { data: userProfile } =
          await authGetApiV1AuthMeGetCurrentUserProfile();
        setUser(userProfile as any);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }

      router.push("/introduction");
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      setIsSubmitting(false);

      const status =
        error?.status_code ||
        error?.response?.status ||
        error?.status ||
        error?.code;
      const errorMessage =
        status === 401 || status === 400 || status === 403
          ? error?.error || "Incorrect email or password"
          : getApiErrorMessage(error);
      toast.error(errorMessage);
    },
  });

  const onSubmit = async (data: SignInData) => {
    setIsSubmitting(true);

    login.mutate(
      {
        body: {
          identifier: data.email,
          password: data.password,
        },
      },
      {
        onError: (error: any) => {
          const status =
            error?.status_code ||
            error?.response?.status ||
            error?.status ||
            error?.code;
          const errorMessage =
            status === 401 || status === 400 || status === 403
              ? error?.error || "Incorrect email or password"
              : getApiErrorMessage(error);
          setError("email", { message: errorMessage });
        },
      }
    );
  };

  return (
    <div className="w-full max-w-[460px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-auto w-full flex-col justify-between rounded-2xl bg-white dark:bg-[#1C1E22] p-10 shadow-md"
      >
        <div className="space-y-5">
          <div className="text-left">
            <div className="mb-6">
              <Logo />
            </div>
            {/*<p className="mt-2 text-sm text-black dark:text-white">
              New user?{' '}
              <Link
                href="/auth/signup"
                className="font-extrabold text-[#0A5A1A]"
              >
                Create an account
              </Link>
            </p>*/}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-white">
              Email address
            </label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 w-full rounded border p-2 focus:border-[#0A5A1A] focus:ring-[#0A5A1A] focus:outline-none dark:text-white"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <PasswordInput
            {...register("password")}
            error={errors.password?.message}
            label="Password"
          />
        </div>

        {/*<div className="mt-4 flex items-center justify-between text-sm">
          <Link
            href="/auth/forgot-password"
            className="font-extrabold text-[#0A5A1A]"
          >
            Forgot Password?
          </Link>
        </div>*/}

        <Button
          type="submit"
          className="mx-auto mt-5 w-full bg-[#0A5A1A] hover:bg-[#0A5A1A] text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoaderCircle className="animate-spin" /> : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
