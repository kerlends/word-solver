import ReactDOM from 'react-dom';
import { ThemeContextProvider } from './theme/theme-context-provider';
import { App } from './app';

ReactDOM.render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>,
  document.getElementById('root'),
);
