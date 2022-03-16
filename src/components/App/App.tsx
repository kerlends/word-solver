import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import { useThemeContext } from '../../theme';

import WordSearch from '../WordSearch';
import SettingsMenuButton from '../SettingsMenuButton';

const App = () => {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SettingsMenuButton />
      <WordSearch />
    </ThemeProvider>
  );
};

export default App;
