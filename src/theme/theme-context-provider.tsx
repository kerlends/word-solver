import React, { useMemo } from 'react';
import { ThemeContext } from './theme-context';
import { ColorTheme } from './types';
import { usePersistedState } from '../hooks/use-persisted-state';
import { themes } from './themes';

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const [theme, setTheme] = usePersistedState<ColorTheme>(
    'light',
    'theme',
  );

  const value = useMemo(
    () => ({
      colorTheme: theme,
      theme: themes[theme],
      setTheme,
    }),
    [theme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
