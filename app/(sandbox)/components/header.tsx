'use client';

import { Search } from './search';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="bg-[#1C1E22] border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/dsn-logo.svg" alt="DSN" className="h-8 w-8" />
          <span className="text-[#00A859] font-semibold text-lg">AI-DPI</span>
        </div>
        
        <div className="flex-1 max-w-md mx-8">
          <Search />
        </div>
        
        <div className="flex items-center gap-6">
          <button className="text-[#AFBDD1] hover:text-white transition-colors">
            Support
          </button>
          <div className="text-[#AFBDD1]">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}