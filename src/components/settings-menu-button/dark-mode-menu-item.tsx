import React from 'react';
import { useCallback } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';

import { useThemeContext } from '../../hooks/use-theme-context';

interface DarkModeMenuItemProps {
  className?: string;
}

export function DarkModeMenuItem({
  className,
}: DarkModeMenuItemProps) {
  const { colorTheme, setTheme } = useThemeContext();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.checked ? 'dark' : 'light';

      setTheme(next);
    },
    [setTheme],
  );

  return (
    <Box sx={{ mb: 2 }}>
      <FormControlLabel
        className={className}
        control={
          <Switch
            checked={colorTheme === 'dark'}
            onChange={handleChange}
          />
        }
        label="Dark mode"
      />
    </Box>
  );
}
