"use client";

import { useTheme } from "../../hooks/use-theme";

export function ThemeToggle() {
  const { effectiveTheme, toggleTheme } = useTheme();

  const displayText = effectiveTheme === "dark" ? "Light mode" : "Dark mode";

  return (
    <button
      onClick={toggleTheme}
      className="text-[#AFBDD1] hover:text-[#00A859] transition-colors"
    >
      {displayText}
    </button>
  );
}
