import { useContext } from 'react';
import { ThemeContext } from '../theme/theme-context';

export function useThemeContext() {
  return useContext(ThemeContext);
}
