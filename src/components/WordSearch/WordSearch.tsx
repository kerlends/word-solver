import * as React from 'react';
import { createStyles, makeStyles, useTheme } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

import WordGroup from '../WordGroup';

import { useForm, useQuery } from '../../hooks';

const styles = (theme: Theme) =>
  createStyles({
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: `${theme.spacing.unit}px 0`,
      position: 'relative',
    },
    progress: {
      flexShrink: 0,
    },
    loader: {
      position: 'absolute',
      top: theme.spacing.unit * 4,
      right: theme.spacing.unit * 4,
    },
    loadingTitle: {
      marginTop: theme.spacing.unit * 4,
    },
  });

const useStyles = makeStyles(styles);

const WordSearch = () => {
  const { value, handleChange } = useForm();
  const { loading, loaded, data } = useQuery(value);
  const classes = useStyles();

  if (!loaded) {
    return (
      <div className={classes.loading}>
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 8 }}>
      <Card>
        <CardContent>
          <TextField
            onChange={handleChange}
            value={value}
            label="Rack"
            fullWidth
          />
        </CardContent>
      </Card>
      {loading && (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      )}
      {data.map(({ numChars, words }) => (
        <WordGroup key={words.join(',')} numChars={numChars} words={words} />
      ))}
    </div>
  );
};

export default WordSearch;
