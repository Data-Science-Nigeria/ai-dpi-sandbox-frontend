"use client";

import { Logo } from "../../components/logo";
import { Search } from "./search";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobilenav";
import { Avatar } from "./avatar";
import { useLogout } from "../../hooks/use-logout";

export function Header() {
  const { handleLogout } = useLogout();

  const handleSupport = () => {
    console.log("Support clicked");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-[#1C1E22] px-6 py-4 z-50 border-b border-gray-100 dark:border-[#1C1E22] transition-colors duration-300 ease-in-out">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="flex-1 max-w-xs sm:max-w-sm mx-2 sm:mx-6 md:mx-8 lg:mx-4">
          <Search />
        </div>

        <div className="flex items-center gap-6">
          {/* Desktop Items */}
          <div className="hidden lg:block">
            <Avatar />
          </div>

          <button
            onClick={handleSupport}
            className="hidden lg:block text-[#AFBDD1] hover:text-[#00A859] transition-colors"
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

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
