import type { Theme } from '@mui/material';

import { themes } from './themes';

export type ColorTheme = keyof typeof themes;
export type SetTheme = (theme: ColorTheme) => void;

export interface Context {
  colorTheme: ColorTheme;
  theme: Theme;
  setTheme: SetTheme;
}
