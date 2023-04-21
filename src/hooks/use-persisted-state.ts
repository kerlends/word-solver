import { useEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { parse } from '../utils';

export function usePersistedState<T = any>(
  initialState: T,
  key: string,
): [T, Dispatch<SetStateAction<T>>] {
  const initialRef = useRef<T | null>(null);

  if (!initialRef.current) {
    const val = localStorage.getItem(key);
    initialRef.current = val ? parse<T>(val) : initialState;
  }

  const [state, setState] = useState(initialRef.current);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
}
