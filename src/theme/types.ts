import { Theme } from '@material-ui/core/styles';

export type ColorTheme = 'light' | 'dark';
export type SetTheme = (theme: ColorTheme) => void;

export interface Context {
  colorTheme: ColorTheme
  theme: Theme;
  setTheme: SetTheme;
}
