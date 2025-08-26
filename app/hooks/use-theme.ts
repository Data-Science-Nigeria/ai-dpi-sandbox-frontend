import { useThemeStore } from '../store/use-theme-store';

export const useTheme = () => {
  const { theme, setTheme, getEffectiveTheme } = useThemeStore();
  
  return {
    theme,
    setTheme,
    effectiveTheme: getEffectiveTheme(),
    toggleTheme: () => {
      const current = getEffectiveTheme();
      setTheme(current === 'dark' ? 'light' : 'dark');
    },
  };
};