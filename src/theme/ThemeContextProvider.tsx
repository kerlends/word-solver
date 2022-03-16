import * as React from 'react';
import { useMemo } from 'react';
import createMuiTheme from '@mui/material/styles/createTheme';
import { ThemeContext } from './ThemeContext';
import { ColorTheme } from './types';
import { usePersistedState } from '../hooks';

const themes = {
  light: createMuiTheme({
    palette: {
      mode: 'light',
    },
  }),

  dark: createMuiTheme({
    palette: {
      mode: 'dark',
    },
  }),
};

interface Props {
  children: React.ReactNode;
}

const ThemeContextProvider = ({ children }: Props) => {
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
};

export default ThemeContextProvider;
