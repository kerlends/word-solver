import * as React from 'react';
import {
  createStyles,
  makeStyles,
  useTheme,
} from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField, {
  TextFieldProps,
} from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';

const styles = (theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      margin: `${theme.spacing.unit * 2}px 0`,
    },
    textField: {
      flex: 1,
    },
  });

const useStyles = makeStyles(styles);

interface Props {
  onClearClick: () => void;
}

const RackInput = ({
  value,
  onChange,
  onClearClick,
  ...props
}: Props & TextFieldProps) => {
  const classes = useStyles();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleClear = React.useCallback(() => {
    onClearClick();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={classes.wrapper}>
      <TextField
        {...props}
        className={classes.textField}
        onChange={onChange}
        value={value}
        inputRef={inputRef}
        variant="outlined"
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
    </div>
  );
};

export default RackInput;
