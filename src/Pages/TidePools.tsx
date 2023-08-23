import { getTidePoolsData } from '@/DataLayer/tidePools';
import { CircularProgress } from '@mui/material';
import { FunctionComponent } from 'react';
import { useQuery } from 'react-query';

export const TidePools: FunctionComponent = () => {
  const { data, error, isLoading } = useQuery('tidePoolsData', getTidePoolsData, {
    onSuccess: (data) => {
      console.log('Query completed!', data);
    },
  });

  if (isLoading)
    return (
      <CircularProgress
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
        }}
      />
    );
  if (error) return <div>Request Failed</div>;
  return <div></div>;
};
