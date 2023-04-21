import React from 'react';
import { useCallback } from 'react';

import { useThemeContext } from '../../hooks/use-theme-context';
import { Box, FormControlLabel, Switch } from '@mui/material';

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
