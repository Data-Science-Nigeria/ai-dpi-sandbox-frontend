'use client';

import { ResetPasswordForm } from './components/reset-password-form';

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-8 py-6">
      <div className="w-full max-w-md">
        <ResetPasswordForm />
      </div>
    </main>
  );
}
