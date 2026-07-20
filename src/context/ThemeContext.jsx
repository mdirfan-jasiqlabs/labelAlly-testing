import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  applyThemeToDocument,
  persistThemePreference,
  readSystemPrefersDark,
  readThemePreference,
  resolveIsDark,
} from '../lib/themeMode';

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readThemePreference);
  const [systemPrefersDark, setSystemPrefersDark] = useState(readSystemPrefersDark);

  const isDark = resolveIsDark(theme, systemPrefersDark);

  useEffect(() => {
    applyThemeToDocument(isDark);
    persistThemePreference(theme);
  }, [theme, isDark]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (event) => {
      setSystemPrefersDark(event.matches);
    };

    // Sync in case preference changed between boot script and hydration.
    setSystemPrefersDark(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      mediaQuery.addListener(handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      isDark,
    }),
    [theme, isDark],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
