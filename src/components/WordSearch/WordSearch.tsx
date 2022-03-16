import * as React from 'react';

import Box from '@mui/material/Box';

import WordGroup from '../WordGroup';
import { RackInput } from '../RackInput/RackInput';

import { useForm, useQuery } from '../../hooks';

const WordSearch = () => {
  const { value, onChange, onReset } = useForm('wordSearch');
  const { loading, data } = useQuery(value);

  return (
    <Box sx={{ p: 1 }}>
      <RackInput
        value={value}
        onChange={onChange}
        onClearClick={onReset}
        label={'Rack'}
        loading={loading}
      />
      {data.map(({ numChars, words }) => (
        <WordGroup key={numChars} numChars={numChars} words={words} />
      ))}
    </Box>
  );
};

export default WordSearch;
