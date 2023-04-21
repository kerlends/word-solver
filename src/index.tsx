import { createRoot } from 'react-dom/client';
import { ThemeContextProvider } from './theme/theme-context-provider';
import { App } from './app';

const root = createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>,
);
