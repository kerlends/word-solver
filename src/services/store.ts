import React from 'react';
import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type SettingsAction =
  | { type: 'TOGGLE_ALLOW_MULTIPLE' }
  | { type: 'SET CONTAINS'; payload: string[] }
  | { type: 'SET EXCLUDES'; payload: string[] }
  | { type: 'SET STARTS WITH'; payload: string }
  | { type: 'SET ENDS WITH'; payload: string }
  | { type: 'SET MINLENGTH'; payload: number }
  | { type: 'SET MAXLENGTH'; payload: number };

export interface SettingsState {
  allowMultiple: boolean;
  contains: string[];
  exclude: string[];
  startsWith: string;
  endsWith: string;
  minLength: number;
  maxLength: number;
}

const settingsReducer: React.Reducer<
  SettingsState,
  SettingsAction
> = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_ALLOW_MULTIPLE':
      return { ...state, allowMultiple: !state.allowMultiple };
    case 'SET CONTAINS':
      return {
        ...state,
        contains: action.payload,
      };
    case 'SET MAXLENGTH':
      return { ...state, maxLength: action.payload };
    case 'SET MINLENGTH':
      return { ...state, minLength: action.payload };
    case 'SET EXCLUDES':
      return { ...state, exclude: action.payload };
    case 'SET STARTS WITH':
      return { ...state, startsWith: action.payload };
    case 'SET ENDS WITH':
      return { ...state, endsWith: action.payload };
    default:
      return state;
  }
};

const initialSettingsState: SettingsState = {
  allowMultiple: true,
  contains: [],
  exclude: [],
  startsWith: '',
  endsWith: '',
  minLength: 5,
  maxLength: 5,
};

export const useStore = create<{
  state: SettingsState;
  dispatch: React.Dispatch<SettingsAction>;
}>(
  devtools(
    persist(
      (set) => ({
        state: initialSettingsState,
        dispatch: (args) =>
          set(({ state, ...rest }) => ({
            ...rest,
            state: settingsReducer(state, args),
          })),
      }),
      {
        name: 'solver-storage',
      },
    ),
  ),
);

export function useDispatch() {
  return useStore(({ dispatch }) => dispatch);
}
