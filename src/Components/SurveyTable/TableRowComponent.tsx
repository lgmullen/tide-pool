import { Survey } from '@/types';
import { OpenInNew } from '@mui/icons-material';
import { IconButton, TableRow } from '@mui/material';
import { FunctionComponent } from 'react';
import { StyledTableCell } from './SurveyTable';

interface IProps {
  survey: Survey;
}
export const TableRowComponent: FunctionComponent<IProps> = ({ survey }) => (
  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <StyledTableCell>{survey.entry_id}</StyledTableCell>
    <StyledTableCell>{survey.platform_id}</StyledTableCell>
    <StyledTableCell>{survey.created}</StyledTableCell>
    <StyledTableCell>{survey.year}</StyledTableCell>
    <StyledTableCell>{survey.total_area}</StyledTableCell>
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
