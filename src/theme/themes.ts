import createMuiTheme from '@mui/material/styles/createTheme';

export const light = createMuiTheme({
  palette: {
    mode: 'light',
  },
});

export const dark = createMuiTheme({
  palette: {
    mode: 'dark',
  },
});

export const themes = { light, dark };
