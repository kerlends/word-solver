import { useCallback, useState } from 'react';

type Toggle = () => void;
type On = () => void;
type Off = () => void;

export default function useBoolean(
  initial: boolean = false,
): [boolean, Toggle] {
  const [value, setValue] = useState(initial);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle];
}
