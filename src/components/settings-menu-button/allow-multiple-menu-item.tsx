import { useCallback } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';

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
