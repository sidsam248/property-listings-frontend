import React from 'react';
import { Grid, Typography } from '@mui/material';

interface ImageProps {
    images: any[]
}

export default function ImageGrid({ images }: ImageProps){
  return (
    <Grid container spacing={2}>
      {images && images.length > 0 ? (
        images.map((image, index) => (
          <Grid item xs={6} key={index}>
            <img src={image} alt={`Image ${index}`} style={{ width: '100%', height: 'auto' }} />
          </Grid>
        ))
      ) : null}
    </Grid>
  );
};
