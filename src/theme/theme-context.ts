import { createContext } from 'react';
import { Context } from './types';

export const ThemeContext = createContext<Context>(
  (null as any) as Context,
);
