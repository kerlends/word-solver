import * as React from 'react';
import { useCallback, useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Theme } from '@material-ui/core/styles';

import { createStyles, makeStyles } from '@material-ui/styles';

import { useThemeContext } from '../../theme';
import { useBoolean } from '../../hooks';

interface Props {
  className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      position: 'fixed',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
  }),
);

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

  const classes = useStyles();

  return (
    <React.Fragment>
      <IconButton onClick={handleClick} className={classes.button}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <MenuItem>
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
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default SettingsMenuButton;
