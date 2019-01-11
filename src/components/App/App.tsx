import * as React from 'react';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

const theme = createMuiTheme();

const WordSearch = React.lazy(() => import('../WordSearch'));

const App = () => (
  <React.Suspense fallback={() => null}>
    <ThemeProvider theme={theme}>
      <WordSearch />
    </ThemeProvider>
  </React.Suspense>
);

export default App;
