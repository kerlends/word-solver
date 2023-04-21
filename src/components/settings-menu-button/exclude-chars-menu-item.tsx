import React from 'react';
import { useCallback } from 'react';
import { Box, TextField } from '@mui/material';

import { useDispatch, useStore } from '../../services/store';

export function ExcludeCharsMenuItem() {
  const dispatch = useDispatch();
  const exclude = useStore((store) => store.state.exclude);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: 'SET EXCLUDES',
        payload: event.target.value.toLowerCase().split(''),
      }),
    [dispatch],
  );

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Exclude"
        value={exclude ? exclude.join('') : ''}
        onChange={handleChange}
      />
    </Box>
  );
}
