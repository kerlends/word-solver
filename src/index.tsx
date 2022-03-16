import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ThemeContextProvider } from './theme';

ReactDOM.render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>,
  document.getElementById('root'),
);
