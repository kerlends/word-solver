import React from 'react';
import { useCallback } from 'react';
import { Box, TextField } from '@mui/material';

import { useDispatch, useStore } from '../../services/store';

export function MaxLengthMenuItem() {
  const dispatch = useDispatch();
  const maxLength = useStore((store) => store.state.maxLength);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);
      if (isNaN(value)) {
        dispatch({ type: 'SET MAXLENGTH', payload: 0 });
      } else {
        dispatch({
          type: 'SET MAXLENGTH',
          payload: value,
        });
      }
    },
    [dispatch],
  );

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Max length"
        value={maxLength ?? 0}
        onChange={handleChange}
      />
    </Box>
  );
}
