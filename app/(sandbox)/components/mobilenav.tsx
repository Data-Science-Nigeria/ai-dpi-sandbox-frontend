"use client";

import { useState } from "react";
import {
  QuestionMarkCircleIcon,
  ArrowRightStartOnRectangleIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../hooks/use-theme";
import { Avatar } from "./avatar";
import { useLogout } from "../../hooks/use-logout";

export function MobileNav() {
  const { effectiveTheme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { handleLogout } = useLogout();

  const handleThemeToggle = () => {
    toggleTheme();
    setIsMenuOpen(false);
  };

  const handleSupport = () => {
    console.log("Support clicked");
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden text-black dark:text-white transition-colors"
      >
        <Bars3Icon className="w-5 h-5" />
      </button>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full right-6 mt-2 bg-white dark:bg-[#1C1E22] border dark:border-gray-400 rounded-md shadow-lg z-50 lg:hidden min-w-[200px] mobile-nav-dropdown">
          <div className="py-3 px-2">
            <div className="flex items-center justify-center px-4 py-2">
              <Avatar />
            </div>

            <button
              onClick={handleSupport}
              className="flex items-center gap-3 w-full px-4 py-2 text-black dark:text-[#AFBDD1] hover:bg-[#00A859] transition-colors"
            >
              <QuestionMarkCircleIcon className="w-5 h-5" />
              <span>Support</span>
            </button>

            <button
              onClick={handleThemeToggle}
              className="flex items-center gap-3 w-full px-4 py-2 text-black dark:text-[#AFBDD1] hover:bg-[#00A859] transition-colors"
            >
              {effectiveTheme === "dark" ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
              <span>
                {effectiveTheme === "dark" ? "Light mode" : "Dark mode"}
              </span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2 bg-[#00A859] text-white rounded hover:bg-[#00A859] transition-colors"
            >
              <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
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
    </>
  );
}
