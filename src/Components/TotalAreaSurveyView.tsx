import { Grid, Typography } from '@mui/material';
import { FunctionComponent } from 'react';

import type { Survey } from '@/types';

interface IProps {
  totalArea: number;
  currentTotalArea: number;
  surveys: Survey[];
}
export const TotalSurveyAreaView: FunctionComponent<IProps> = ({
  totalArea,
  currentTotalArea,
  surveys,
}) => {
  if (surveys.length === 0) {
    return null;
  }
  return (
    <Grid item xs={4}>
      <Typography variant='h5'>Total Area of all cruises: {totalArea}</Typography>
      <Typography variant='h5'>Total Area of current cruises: {currentTotalArea}</Typography>
    </Grid>
  );
};
