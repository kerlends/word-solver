import React from 'react';
import { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { useDispatch, useStore } from '../../services/store';

export function ContainsCharsMenuItem() {
  const dispatch = useDispatch();
  const contains = useStore((store) => store.state.contains);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: 'SET CONTAINS',
        payload: event.target.value.toLowerCase().split(''),
      }),
    [dispatch],
  );

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Contains"
        value={contains ? contains.join('') : ''}
        onChange={handleChange}
      />
    </Box>
  );
}
