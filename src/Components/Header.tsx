import { Typography } from '@mui/material';
import { FunctionComponent } from 'react';

export const Header: FunctionComponent = () => {
  return (
    <div
      style={{
        backgroundColor: 'rgb(2 7 35 )',
        color: 'white',
        padding: 4,
        marginBottom: 16,
        fontWeight: 'bold',
      }}
    >
      <Typography align='left' variant='h2' color={'rgb(26 255 157)'}>
        tide pools
      </Typography>
    </div>
  );
};
