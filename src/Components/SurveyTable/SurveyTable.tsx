import { Survey } from '@/types';
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

import {
  changeHandler,
  getTotalArea,
  handleChangePage,
  handleChangeRowsPerPage,
  handleFlyTo,
} from '@/utils';
import { ChangeEvent, FunctionComponent, useMemo, useRef, useState } from 'react';
import { TotalSurveyAreaView } from '../TotalAreaSurveyView';
import { TableRowComponent } from './TableRowComponent';

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

export const SurveyTable: FunctionComponent<IProps> = ({ surveys }) => {
  const [isSortingAscending, setSortingAscending] = useState(false);
  const [query, setQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [viewState, setViewState] = useState({
    longitude: Number(surveys[0].centerX),
    latitude: Number(surveys[0].centerY),
    zoom: 1,
  });

  const mapRef = useRef<mapboxgl.Map>(null);

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

  const handleChangeMapMarker = (survey: Survey) => {
    handleFlyTo(survey.centerX, survey.centerY, mapRef);
  };
  const totalArea = getTotalArea(surveys);
  const currentTotalArea = getTotalArea(filteredSurveys);

  return (
    <Grid container spacing={2} padding={4}>
      <Grid item xs={8}>
        <TableContainer component={Paper}>
          <TextField
            onChange={(event: ChangeEvent<HTMLInputElement>) => changeHandler(event, setQuery)}
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
          <Table aria-label='cruise table'>
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
              {visibleRows.map((survey, i) => (
                <TableRowComponent
                  survey={survey}
                  key={`${survey.entryId}-${i}`}
                  handleChangeMapMarker={handleChangeMapMarker}
                />
              ))}
            </TableBody>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={filteredSurveys.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, pageNumber) => handleChangePage(event, pageNumber, setPage)}
              onRowsPerPageChange={(event) =>
                handleChangeRowsPerPage(event, setRowsPerPage, setPage)
              }
            />
          </Table>
        </TableContainer>
      </Grid>
      <TotalSurveyAreaView
        mapRef={mapRef}
        setViewState={setViewState}
        {...viewState}
        totalArea={totalArea}
        currentTotalArea={currentTotalArea}
        surveys={surveys}
      />
    </Grid>
  );
};

export const StyledTableCell = styled(TableCell)({
  width: '150px',
  height: '80px',
});
