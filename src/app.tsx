import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import { WordleSolver } from './components/wordle-solver';
import { useThemeContext } from './hooks/use-theme-context';

export function App() {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WordleSolver />
    </ThemeProvider>
  );
}
