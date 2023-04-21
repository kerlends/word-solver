import { useCallback } from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import { useDispatch, useStore } from '../../services/store';

export function AllowMultipleMenuItem() {
  const dispatch = useDispatch();
  const allowMultiple = useStore(
    (store) => store.state.allowMultiple,
  );

  const toggle = useCallback(
    () => dispatch({ type: 'TOGGLE_ALLOW_MULTIPLE' }),
    [dispatch],
  );

  return (
    <Box sx={{ mb: 2 }}>
      <FormControlLabel
        control={<Switch checked={allowMultiple} onChange={toggle} />}
        label="Allow multiple"
      />
    </Box>
  );
}
