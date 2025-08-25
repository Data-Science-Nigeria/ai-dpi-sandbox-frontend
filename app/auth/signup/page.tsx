'use client';

import { SignUpForm } from './components/signup-form';

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-8 py-6">
      <div className="w-full max-w-md">
        <SignUpForm />
      </div>
    </main>
  );
}
