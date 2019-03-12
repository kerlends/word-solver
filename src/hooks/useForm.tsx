import { useCallback } from 'react';
import usePersistedState from './usePersistedState';

export default function useForm(key: string) {
  const [value, setValue] = usePersistedState('', key);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue],
  );

  const handleReset = useCallback(() => {
    setValue('');
  }, [setValue]);

  return { value, onChange: handleChange, onReset: handleReset };
}
