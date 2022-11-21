import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import { useThemeContext } from '../../theme';
import {WordleSolver} from '../wordle-solver';


const App = () => {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
			<WordleSolver/>
    </ThemeProvider>
  );
};

export default App;
