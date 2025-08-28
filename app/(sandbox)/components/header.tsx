'use client';

import { Logo } from '../../components/logo';
import { Search } from './search';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="bg-[#1C1E22] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          <span className="text-[#00A859] font-semibold text-2xl mt-6">AI-DPI</span>
        </div>
        
        <div className="flex-1 max-w-sm mx-4">
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