import { ChangeEvent } from 'react';
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

export const changeHandler = (
  event: ChangeEvent<HTMLInputElement>,
  setQuery: (value: React.SetStateAction<string>) => void,
) => {
  setQuery(event.target.value);
};

export const handleChangePage = (
  event: React.MouseEvent<HTMLButtonElement> | null,
  newPage: number,
  setPage: (value: React.SetStateAction<number>) => void,
) => {
  setPage(newPage);
};

export const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setRowsPerPage: (value: React.SetStateAction<number>) => void,
  setPage: (value: React.SetStateAction<number>) => void,
) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};
