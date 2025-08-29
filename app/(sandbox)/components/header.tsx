'use client';

import { useState } from 'react';
import { Logo } from '../../components/logo';
import { Search } from './search';
import { ThemeToggle } from './theme-toggle';
import { QuestionMarkCircleIcon, ArrowRightOnRectangleIcon, SunIcon, MoonIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/use-theme';

interface HeaderProps {
  sidebarOpen?: boolean;
}

export function Header({ sidebarOpen = true }: HeaderProps) {
  const { effectiveTheme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log('Logout clicked');
    setIsMenuOpen(false);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    setIsMenuOpen(false);
  };

  const handleSupport = () => {
    console.log('Support clicked');
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#1C1E22] px-6 py-4 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>
        
        <div className="flex-1 max-w-xs sm:max-w-sm mx-2 sm:mx-6 md:mx-8 lg:mx-4">
          <Search />
        </div>
        
        <div className="flex items-center gap-6">
          {/* Desktop Items */}
          <button 
            onClick={handleSupport}
            className="hidden lg:block text-[#AFBDD1] hover:text-white transition-colors"
          >
            Support
          </button>
          
          <div className="hidden lg:block text-[#AFBDD1]">
            <ThemeToggle />
          </div>

          <button 
            onClick={handleLogout}
            className="hidden lg:block bg-[#00A859] text-white px-4 py-2 rounded hover:bg-[#00A859] transition-colors"
          >
            Logout
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-[#AFBDD1] hover:text-white transition-colors"
          >
            <Bars3Icon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full right-6 mt-2 bg-[#1C1E22] border border-gray-600 rounded-md shadow-lg z-50 lg:hidden min-w-[200px]">
          <div className="py-3 px-2">
            <button 
              onClick={handleSupport}
              className="flex items-center gap-3 w-full px-4 py-2 text-[#AFBDD1] hover:bg-gray-700 transition-colors"
            >
              <QuestionMarkCircleIcon className="w-5 h-5" />
              <span>Support</span>
            </button>
            
            <button 
              onClick={handleThemeToggle}
              className="flex items-center gap-3 w-full px-4 py-2 text-[#AFBDD1] hover:bg-gray-700 transition-colors"
            >
              {effectiveTheme === 'dark' ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
              <span>{effectiveTheme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
            </button>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2 bg-[#00A859] text-white rounded hover:bg-[#00A859] transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}