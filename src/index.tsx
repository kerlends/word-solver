import './styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ThemeContextProvider } from './theme';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>,
  document.getElementById('root'),
);

serviceWorker.register();
