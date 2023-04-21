import React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import LinearProgress from '@mui/material/LinearProgress';

type RackInputProps = TextFieldProps & {
  loading: boolean;
  onClearClick: () => void;
};

export function RackInput({
  value,
  loading,
  onChange,
  onClearClick,
  ...props
}: RackInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleClear = React.useCallback(() => {
    onClearClick();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <TextField
        {...props}
        sx={{ flex: 1 }}
        onChange={onChange}
        value={value}
        inputRef={inputRef}
        variant="filled"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Clear rack input"
                disabled={!value}
                onClick={handleClear}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {loading && (
        <Box
          sx={{ width: '100%', position: 'absolute', top: '100%' }}
        >
          <LinearProgress />
        </Box>
      )}
    </Box>
  );
}
