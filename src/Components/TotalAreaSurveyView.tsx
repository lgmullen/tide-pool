import type { Survey } from '@/types';
import { Box, Grid, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import Map from 'react-map-gl';
interface IProps {
  totalArea: number;
  currentTotalArea: number;
  surveys: Survey[];
  viewState?: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  setViewState: React.Dispatch<
    React.SetStateAction<{
      longitude: number;
      latitude: number;
      zoom: number;
    }>
  >;
  mapRef: any;
}

export const TotalSurveyAreaView: FunctionComponent<IProps> = ({
  totalArea,
  currentTotalArea,
  surveys,
  viewState,
  setViewState,
  mapRef,
}) => {
  if (surveys.length === 0) {
    return null;
  }

  // Add mapbox Access token from
  // https://docs.mapbox.com/help/getting-started/access-tokens/ in order to view map

  return (
    <Grid item xs={4}>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant='h5'>Total Area of all cruises: {totalArea}</Typography>
        <Typography variant='h5'>Total Area of all viewed cruises: {currentTotalArea}</Typography>
      </Box>
      <Map
        ref={mapRef}
        onMove={(evt) => setViewState(evt.viewState)}
        {...viewState}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
        initialViewState={{
          longitude: viewState?.longitude,
          latitude: viewState?.latitude,
          zoom: 1,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
      />
    </Grid>
  );
};
