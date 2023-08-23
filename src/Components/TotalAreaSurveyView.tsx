import type { Survey } from '@/types';
import { Grid, Typography } from '@mui/material';
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

  return (
    <Grid item xs={4}>
      <Typography variant='h5'>Total Area of all cruises: {totalArea}</Typography>
      <Typography variant='h5'>Total Area of current cruises: {currentTotalArea}</Typography>
      <Map
        ref={mapRef}
        onMove={(evt) => setViewState(evt.viewState)}
        {...viewState}
        mapboxAccessToken='pk.eyJ1IjoiamFja2JvdyIsImEiOiJjbGxtcHB2bTYwMmNrM2Vtd251OTRjZmtsIn0.qr4C_pjCBPpf2b1r2yBzdw'
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
