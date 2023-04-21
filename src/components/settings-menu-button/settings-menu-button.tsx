import React from 'react';
import { useCallback, useState } from 'react';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';

import { ContainsCharsMenuItem } from './contains-chars-menu-item';
import { ExcludeCharsMenuItem } from './exclude-chars-menu-item';
import { StartsWithMenuItem } from './starts-with-menu-item';
import { EndsWithMenuItem } from './ends-with-menu-item';
import { MaxLengthMenuItem } from './max-length-menu-item';
import { MinLengthMenuItem } from './min-length-menu-item';
import { AllowMultipleMenuItem } from './allow-multiple-menu-item';
import { DarkModeMenuItem } from './dark-mode-menu-item';

export function SettingsMenuButton() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(e.currentTarget);
    },
    [setAnchorEl],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  return (
    <React.Fragment>
      <IconButton
        onClick={handleClick}
        sx={(theme) => ({
          position: 'fixed',
          bottom: theme.spacing(2),
          right: theme.spacing(2),
        })}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
          <ContainsCharsMenuItem />
          <ExcludeCharsMenuItem />
          <StartsWithMenuItem />
          <EndsWithMenuItem />
          <MaxLengthMenuItem />
          <MinLengthMenuItem />
          <AllowMultipleMenuItem />
          <DarkModeMenuItem />
        </Box>
      </Popover>
    </React.Fragment>
  );
}
