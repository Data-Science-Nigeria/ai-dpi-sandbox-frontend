"use client";

export function ThemeScript() {
  const script = `
    (function() {
      try {
        const stored = localStorage.getItem('theme-storage');
        const theme = stored ? JSON.parse(stored).state.theme : 'system';
        
        let effectiveTheme = theme;
        if (theme === 'system') {
          effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(effectiveTheme);
      } catch (e) {
        document.documentElement.classList.add('light');
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
