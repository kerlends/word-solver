import type { Theme } from '@mui/material';

export type ColorTheme = 'light' | 'dark';
export type SetTheme = (theme: ColorTheme) => void;

export interface Context {
	colorTheme: ColorTheme;
	theme: Theme;
	setTheme: SetTheme;
}
