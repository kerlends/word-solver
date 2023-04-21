import React from 'react';
import { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { useDispatch, useStore } from '../../services/store';

export function MinLengthMenuItem() {
  const dispatch = useDispatch();
  const minLength = useStore((store) => store.state.minLength);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);
      if (isNaN(value)) {
        dispatch({ type: 'SET MINLENGTH', payload: 0 });
      } else {
        dispatch({
          type: 'SET MINLENGTH',
          payload: value,
        });
      }
    },
    [dispatch],
  );

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Min length"
        value={minLength ?? 0}
        onChange={handleChange}
      />
    </Box>
  );
}
