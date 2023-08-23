import { Survey } from './types';

export const getTotalArea = (surveys: Survey[]) => {
  return surveys
    .map((survey) => Number(survey.totalArea))
    .filter(Boolean)
    .reduce((total, surveyArea) => {
      return total + surveyArea;
    }, 0);
};

export const handleFlyTo = (x: number, y: number, mapRef: any) => {
  if (mapRef.current) {
    mapRef.current.flyTo({ center: [x, y] });
  }
};
