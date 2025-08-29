'use client';

import { useState } from 'react';
import { Header } from './components/header';
import Sidebar from './components/sidebar';

export default function SandboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1">
          <Header sidebarOpen={sidebarOpen} />
          <main className="pt-[4rem] sm:pt-[5rem] md:pt-[5.5rem]">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}