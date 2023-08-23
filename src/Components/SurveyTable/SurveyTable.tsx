import { Survey, SurveyData } from '@/types';
import { ArrowDownward, ArrowUpward, Search } from '@mui/icons-material';
import {
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  styled,
} from '@mui/material';
import { useDebounce } from '@uidotdev/usehooks';

import { ChangeEvent, FunctionComponent, useMemo, useState } from 'react';
import { TotalSurveyAreaView } from '../TotalAreaSurveyView';
import { TableRowComponent } from './TableRowComponent';
import { getTotalArea } from '@/utils';

interface IProps {
  surveys: Survey[];
}

type TableColumn = {
  field: keyof Survey;
  name: string;
};

const columns: TableColumn[] = [
  { field: 'entryId', name: 'Entry Id' },
  { field: 'platformId', name: 'Ship Name' },
  { field: 'created', name: 'Created' },
  { field: 'year', name: 'Year' },
  { field: 'totalArea', name: 'Total Area' },
  { field: 'url', name: 'URL' },
];

export const StyledTableCell = styled(TableCell)({
  width: '150px',
  height: '80px',
});

export const SurveyTable: FunctionComponent<IProps> = ({ surveys }) => {
  const [isSortingAscending, setSortingAscending] = useState(false);
  const [query, setQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const debouncedQuery = useDebounce<string>(query, 500);

  const filteredSurveys = useMemo(() => {
    if (debouncedQuery !== '') {
      return surveys.filter((survey) => {
        return (
          survey.platformId.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          survey.entryId.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
      });
    } else {
      return surveys;
    }
  }, [debouncedQuery]);

  const visibleRows = useMemo(
    () =>
      filteredSurveys
        ?.sort((a, b) =>
          isSortingAscending ? Number(a.year) - Number(b.year) : Number(b.year) - Number(a.year),
        )
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, filteredSurveys, isSortingAscending],
  );

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const totalArea = getTotalArea(surveys);
  const currentTotalArea = getTotalArea(filteredSurveys);

  return (
    <Grid container spacing={2} padding={4}>
      <Grid item xs={8}>
        <TableContainer component={Paper}>
          <TextField
            onChange={changeHandler}
            id='search'
            type='search'
            aria-label='Search'
            sx={{ width: 500, padding: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Table sx={{ minWidth: 650, maxHeight: 800 }} aria-label='cruise table'>
            <TableHead>
              <TableRow>
                {columns.map((column) =>
                  column.field === 'year' ? (
                    <StyledTableCell key={column.field}>
                      Year
                      <IconButton
                        size='small'
                        onClick={() => {
                          setSortingAscending((prev) => !prev);
                        }}
                      >
                        {isSortingAscending ? <ArrowUpward /> : <ArrowDownward />}
                      </IconButton>
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell key={column.field}>{column.name}</StyledTableCell>
                  ),
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((survey) => (
                <TableRowComponent survey={survey} key={`${survey.entryId}`} />
              ))}
            </TableBody>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={filteredSurveys.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Table>
        </TableContainer>
      </Grid>
      <TotalSurveyAreaView
        totalArea={totalArea}
        currentTotalArea={currentTotalArea}
        surveys={surveys}
      />
    </Grid>
  );
};
