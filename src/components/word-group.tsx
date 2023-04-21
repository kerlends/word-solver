import React from 'react';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface WordGroupProps {
  numChars: number;
  words: string[];
}

export const WordGroup = React.memo<WordGroupProps>(
  function WordGroup({ words, numChars }) {
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
  },
);
