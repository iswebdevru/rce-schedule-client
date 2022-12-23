import { useCallback, useEffect, useState } from 'react';
import { ThemeKey, themeStorageKey, themeKeys } from './config';

function getUserTheme(): ThemeKey {
  const storedTheme = localStorage.getItem(themeStorageKey);
  if (storedTheme && themeKeys.includes(storedTheme as ThemeKey)) {
    return storedTheme as ThemeKey;
  }
  return 'system';
}

function setUserTheme(theme: ThemeKey): void {
  localStorage.setItem(themeStorageKey, theme);
  switch (theme) {
    case 'system':
      const preferDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      if (preferDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      break;
    case 'light':
      document.documentElement.classList.remove('dark');
      break;
    case 'dark':
      document.documentElement.classList.add('dark');
      break;
  }
}

export function useColorSchemeChangeEffect() {
  useEffect(() => {
    const themeListener = () => {
      setUserTheme('system');
    };
    const themeMediaQueryList = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    themeMediaQueryList.addEventListener('change', themeListener);
    return () => {
      themeMediaQueryList.removeEventListener('change', themeListener);
    };
  }, []);
}

export function useTheme() {
  const [themeState, setThemeState] = useState(getUserTheme);

  const setTheme = useCallback((theme: ThemeKey) => {
    setUserTheme(theme);
    setThemeState(theme);
  }, []);

  return [themeState, setTheme] as const;
}
