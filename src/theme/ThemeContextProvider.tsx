import * as React from 'react';
import { useMemo, useState } from 'react';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { Theme } from '@material-ui/core/styles';
import { ThemeContext } from './ThemeContext';
import { ColorTheme } from './types';
import { usePersistedState } from '../hooks';

const themes = {
  light: createMuiTheme({
    palette: {
      type: 'light',
    },
  }),

  dark: createMuiTheme({
    palette: {
      type: 'dark',
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
