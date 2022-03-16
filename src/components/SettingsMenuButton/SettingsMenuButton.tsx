import * as React from 'react';
import { useCallback, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';

import { useThemeContext } from '../../theme';
import { useDispatch, useStore } from '../../store';

function AllowMultipleMenuItem() {
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

function ContainsCharsMenuItem() {
  const dispatch = useDispatch();
  const contains = useStore((store) => store.state.contains);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: 'SET CONTAINS',
        payload: event.target.value.toLowerCase().split(''),
      }),
    [dispatch],
  );

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Contains"
        value={contains ? contains.join('') : ''}
        onChange={handleChange}
      />
    </Box>
  );
}

function ExcludeCharsMenuItem() {
  const dispatch = useDispatch();
  const exclude = useStore((store) => store.state.exclude);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: 'SET EXCLUDES',
        payload: event.target.value.toLowerCase().split(''),
      }),
    [dispatch],
  );

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Exclude"
        value={exclude ? exclude.join('') : ''}
        onChange={handleChange}
      />
    </Box>
  );
}

function StartsWithMenuItem() {
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

function EndsWithMenuItem() {
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

function MaxLengthMenuItem() {
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

function MinLengthMenuItem() {
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

interface Props {
  className?: string;
}

const SettingsMenuButton = ({ className }: Props) => {
  const { colorTheme, theme, setTheme } = useThemeContext();

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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.checked ? 'dark' : 'light';

      setTheme(next);
    },
    [setTheme],
  );

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
        </Box>
      </Popover>
    </React.Fragment>
  );
};

export default SettingsMenuButton;
