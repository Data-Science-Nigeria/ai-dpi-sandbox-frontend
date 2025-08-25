'use client';

import { ForgotPasswordForm } from './components/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-8 py-6">
      <div className="w-full max-w-md">
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
