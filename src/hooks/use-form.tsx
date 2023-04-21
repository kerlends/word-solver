import { useCallback } from 'react';
import { usePersistedState } from './use-persisted-state';

export function useForm(key: string) {
  const [value, setValue] = usePersistedState('', key);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value.toLowerCase());
    },
    [setValue],
  );

  const handleReset = useCallback(() => {
    setValue('');
  }, [setValue]);

  return { value, onChange: handleChange, onReset: handleReset };
}
