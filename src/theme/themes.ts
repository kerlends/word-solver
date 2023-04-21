import { createTheme } from '@mui/material/styles';

export const light = createTheme({
  palette: {
    mode: 'light',
  },
});

export const dark = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const themes = { light, dark };
