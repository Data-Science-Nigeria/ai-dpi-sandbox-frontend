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
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <Header sidebarOpen={sidebarOpen} />
      <main className={`pt-[4rem] sm:pt-[5rem] md:pt-[5.5rem] transition-all duration-300 ${sidebarOpen ? 'ml-56 sm:ml-64' : 'ml-12 sm:ml-16'}`}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
