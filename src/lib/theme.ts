import { useCallback, useEffect, useState } from 'react';
import { ThemeKey, themeStorageKey, themeKeys } from './config';

function getSystemColorMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

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
      if (getSystemColorMode() === 'dark') {
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

interface ThemeMeta {
  key: ThemeKey;
  actual: 'light' | 'dark';
}

export function useTheme() {
  const [themeState, setThemeState] = useState<ThemeMeta>(() => {
    const themeKey = getUserTheme();
    return {
      key: themeKey,
      actual: themeKey === 'system' ? getSystemColorMode() : themeKey,
    };
  });

  const setTheme = useCallback((theme: ThemeKey) => {
    setUserTheme(theme);
    setThemeState({
      key: theme,
      actual: theme === 'system' ? getSystemColorMode() : theme,
    });
  }, []);

  useEffect(() => {
    const themeListener = () => {
      setTheme('system');
    };
    const themeMediaQueryList = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    themeMediaQueryList.addEventListener('change', themeListener);
    return () => {
      themeMediaQueryList.removeEventListener('change', themeListener);
    };
  }, []);

  return [themeState, setTheme] as const;
}
