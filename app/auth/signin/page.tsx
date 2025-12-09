"use client";

import { SignInForm } from "./components/signin-form";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-8 py-6">
      <div className="w-full max-w-md">
        <SignInForm />
      </div>
    </main>
  );
}
