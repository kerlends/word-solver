import * as React from 'react';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface Props {
  numChars: number;
  words: string[];
}

const WordGroup = (props: Props) => {
  const { words, numChars } = props;

  return (
    <Paper sx={{ m: 1, overflow: 'hidden' }}>
      <Grid container spacing={4} wrap="nowrap">
        <Grid
          item
          sx={{ bgcolor: 'black', color: 'white' }}
          xs="auto"
        >
          <Typography
            color="inherit"
            variant="h5"
            align="center"
            sx={{ p: 2 }}
          >
            {numChars}
          </Typography>
        </Grid>
        <Grid container item spacing={1} sx={{ my: 1, pb: 1 }}>
          {words.map((word) => (
            <Grid key={word} item>
              <Chip
                label={word.toUpperCase()}
                variant="filled"
                sx={{
                  //bgcolor: 'black',
                  //color: 'white',
                  fontWeight: 'bold',
                  letterSpacing: 1.2,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default React.memo(WordGroup);
