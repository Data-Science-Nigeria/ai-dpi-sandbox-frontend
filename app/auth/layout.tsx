import React from 'react';
import { Footer } from '@/app/components/footer';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121418] flex flex-col">
      <div className="flex-1">
      <Providers>{children}</Providers>
      </div>
      <Footer />
    </div>
  );
}
