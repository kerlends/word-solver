import React from 'react';
import { useCallback } from 'react';
import { Box, TextField } from '@mui/material';

import { useDispatch, useStore } from '../../services/store';

export function StartsWithMenuItem() {
  const dispatch = useDispatch();
  const value = useStore((store) => store.state.startsWith);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: 'SET STARTS WITH',
        payload: event.target.value.toLowerCase(),
      }),
    [dispatch],
  );

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Starts with"
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
}
