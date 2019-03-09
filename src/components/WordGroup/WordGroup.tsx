import * as React from 'react';
import {
  createStyles,
  makeStyles,
  useTheme,
} from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit,
      margin: `${theme.spacing.unit}px 0`,
      overflow: 'hidden',
    },
    gridItemCount: {
      backgroundColor: '#000',
      color: theme.palette.getContrastText('#000000'),
    },
    typographyCount: {
      padding: theme.spacing.unit,
    },
    chip: {
      backgroundColor: '#000',
      color: '#fff',
      fontWeight: theme.typography.button.fontWeight,
      fontSize: '1rem',
    },
  });

const useStyles = makeStyles(styles);

interface Props {
  numChars: number;
  words: string[];
}

const WordGroup = (props: Props) => {
  const { words, numChars } = props;
  const classes = useStyles(props);

  return (
    <Paper className={classes.root}>
      <Grid container alignItems="stretch" spacing={16} wrap="nowrap">
        <Grid item xs="auto" className={classes.gridItemCount}>
          <Typography
            color="inherit"
            variant="h5"
            align="center"
            className={classes.typographyCount}
          >
            {numChars}
          </Typography>
        </Grid>
        <Grid container item spacing={8} xs="auto">
          {words.map((word) => (
            <Grid key={word} item>
              <Chip
                label={word}
                color="primary"
                className={classes.chip}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default React.memo(WordGroup);
