import Box from '@mui/material/Box';

import { useSolver } from '../hooks/use-solver';
import { RackInput } from './rack-input';
import { WordGroup } from './word-group';
import { useForm } from '../hooks/use-form';

export function WordleSolver() {
  const containsForm = useForm('contains');
  const excludesForm = useForm('excludes');
  const startsWithForm = useForm('startsWith');
  const endsWithForm = useForm('endsWith');
  const { loading, data } = useSolver(
    containsForm.value,
    excludesForm.value,
    startsWithForm.value,
    endsWithForm.value,
  );

  return (
    <Box
      sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <RackInput
          value={containsForm.value}
          onChange={containsForm.onChange}
          onClearClick={containsForm.onReset}
          label={'Contains'}
          loading={loading}
        />
        <RackInput
          value={excludesForm.value}
          onChange={excludesForm.onChange}
          onClearClick={excludesForm.onReset}
          label={'Excludes'}
          loading={loading}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <RackInput
          value={startsWithForm.value}
          onChange={startsWithForm.onChange}
          onClearClick={startsWithForm.onReset}
          label={'Starts with'}
          loading={loading}
        />
        <RackInput
          value={endsWithForm.value}
          onChange={endsWithForm.onChange}
          onClearClick={endsWithForm.onReset}
          label={'Ends with'}
          loading={loading}
        />
      </Box>
      {data.map(({ numChars, words }) => (
        <WordGroup key={numChars} numChars={numChars} words={words} />
      ))}
    </Box>
  );
}
