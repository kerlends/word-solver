import React from 'react';
import { useCallback } from 'react';
import { Box, TextField } from '@mui/material';

import { useDispatch, useStore } from '../../services/store';

export function EndsWithMenuItem() {
  const dispatch = useDispatch();
  const value = useStore((store) => store.state.endsWith);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: 'SET ENDS WITH',
        payload: event.target.value.toLowerCase(),
      }),
    [dispatch],
  );

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Ends with"
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
}
