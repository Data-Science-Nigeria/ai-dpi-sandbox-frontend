"use client";

import { useEffect } from "react";
import { useThemeStore } from "../store/use-theme-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, getEffectiveTheme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    const effectiveTheme = getEffectiveTheme();

    root.classList.remove("light", "dark");
    root.classList.add(effectiveTheme);
  }, [theme, getEffectiveTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (theme === "system") {
        const root = window.document.documentElement;
        const effectiveTheme = getEffectiveTheme();
        root.classList.remove("light", "dark");
        root.classList.add(effectiveTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, getEffectiveTheme]);

  return <>{children}</>;
}
