import { CssBaseline, ThemeProvider } from '@mui/material';
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
