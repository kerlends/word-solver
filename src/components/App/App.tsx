import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import { useThemeContext } from '../../theme';

import SettingsMenuButton from '../SettingsMenuButton';

const WordSearch = React.lazy(() => import('../WordSearch'));

const App = () => {
  const { theme } = useThemeContext();
  return (
    <React.Suspense fallback={() => null}>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <SettingsMenuButton />
          <WordSearch />
        </React.Fragment>
      </ThemeProvider>
    </React.Suspense>
  );
};

export default App;
