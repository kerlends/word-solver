import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import localForage from 'localforage';
import { parse } from '../utils';

const store = localForage.createInstance({
  name: 'persistedState',
});

export default function usePersistedState<T = any>(
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
