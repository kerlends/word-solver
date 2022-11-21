import { debounce } from '@mui/material';
import { useCallback, useMemo } from 'react';
import usePersistedState from './usePersistedState';

export default function useForm(key: string) {
	const [value, setValue] = usePersistedState('', key);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value.toLowerCase());
		},
		[setValue],
	);

	const debounced = useMemo(() => {
		return debounce(handleChange, 100);
	}, [handleChange]);

	const handleReset = useCallback(() => {
		setValue('');
	}, [setValue]);

	return { value, onChange: handleChange, onReset: handleReset };
}
