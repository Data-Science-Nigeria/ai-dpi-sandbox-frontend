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
      <Header />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} pt-4`}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}