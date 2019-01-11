import * as React from 'react';
import { createStyles, makeStyles, useTheme } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit,
      margin: `${theme.spacing.unit}px 0`,
    },
    chip: {
      margin: theme.spacing.unit,
    },
  });

const useStyles = makeStyles(styles);

interface Props {
  numChars: number;
  words: string[];
}

const WordGroup = ({ numChars, words }: Props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h5">{`${numChars} letter words`}</Typography>
      {words.map((word) => (
        <Chip
          key={word}
          className={classes.chip}
          label={word}
          color="primary"
        />
      ))}
    </Paper>
  );
};

export default React.memo(WordGroup);
