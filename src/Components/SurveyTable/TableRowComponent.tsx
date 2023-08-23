import { Survey } from '@/types';
import { OpenInNew } from '@mui/icons-material';
import { IconButton, TableRow } from '@mui/material';
import { FunctionComponent } from 'react';
import { StyledTableCell } from './SurveyTable';

interface IProps {
  survey: Survey;
  handleChangeMapMarker: (survey: Survey) => void;
}
export const TableRowComponent: FunctionComponent<IProps> = ({ survey, handleChangeMapMarker }) => (
  <TableRow
    onClick={() => handleChangeMapMarker(survey)}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
    <StyledTableCell>{survey.entryId}</StyledTableCell>
    <StyledTableCell>{survey.platformId}</StyledTableCell>
    <StyledTableCell>{survey.created}</StyledTableCell>
    <StyledTableCell>{survey.year}</StyledTableCell>
    <StyledTableCell>{survey.totalArea}</StyledTableCell>
    <StyledTableCell>
      <IconButton
        size='small'
        onClick={() => {
          window.open(survey.url, '_blank');
        }}
      >
        <OpenInNew />
      </IconButton>
    </StyledTableCell>
  </TableRow>
);
