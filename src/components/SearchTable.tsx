import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { TableFields, ColumnType, fields } from '../types/TableInfo';
import { PagingToolbar } from './PagingToolbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import _ from 'lodash';
import CustomSelect from './CustomSelect';
import { Countries, defaultCountry } from '../data/Countries';
import { Box, Button, SelectChangeEvent, Stack, TextField } from '@mui/material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const SearchTable = () => {
  const [tableData, setTableData] = useState([] as TableFields[]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [searchKey, setSearchKey] = useState('');
  
  
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const url =  `http://universities.hipolabs.com/search?country=${selectedCountry}&name=${searchKey}`;
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data: TableFields[]) => {
          console.log(data.length)
          setTableData(data);
        });
      }, 500);
      return () => clearTimeout(debounceTimer);
  }, [selectedCountry, searchKey]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleFavourite = (row: Record<string, ColumnType>) => {
    const uid = row.name.toString() + row.country;
    if (favourites.indexOf(uid) === -1) {
      setFavourites([...favourites, uid]);
    } else {
      const favs = _.remove([...favourites], _uid => _uid !== uid);
      setFavourites(favs);
    }
  }

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  }

  const handleSearchChange = (ev: React.ChangeEvent) => {
    setSearchKey((ev.target as HTMLInputElement).value);
  }

  const resetFilters = () => {
    if (selectedCountry !== defaultCountry || searchKey !== '') {
      setSelectedCountry(defaultCountry);
      setSearchKey('');
    }
  }
  
  return (
    <TableContainer component={Paper} sx={{ m: '10px 50px', width: 'auto' }}>
      <Stack direction="row" spacing={2}>
        <CustomSelect data={Countries} selectedValue={selectedCountry} label='Country' onSelectChange={handleCountryChange}></CustomSelect>
        <TextField id="standard-basic" label="Search by name" variant="standard" value={searchKey} onChange={handleSearchChange} />
        <Button href="#contained-buttons" onClick={resetFilters}>Clear All Filters</Button>
      </Stack>
      
      <Table sx={{ minWidth: 600 }} aria-label="historical change">
        <TableHead>
          <TableRow>
            {fields.map((field, index) => (
              <StyledTableCell align="left" key={field.name + "-" + index}>{field.label}</StyledTableCell>
            ))}
            <StyledTableCell align="center"></StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : tableData
          ).map((row: Record<string, ColumnType>) => (
            <StyledTableRow key={row.country + "-" + row.name}>
              {fields.map((field) => (
                <StyledTableCell component="th" scope="row" key={field.name + "-" + row.name}>
                  { field.name === 'web_pages' && (row[field.name] as string[]).map(webUrl => (
                    <span key={webUrl}>
                      <a href={webUrl}>{webUrl}</a>
                      <span>&nbsp;&nbsp;</span>
                    </span>
                  ))}
                  { field.name !== 'web_pages' &&  row[field.name]}
                </StyledTableCell>
              ))}
              <StyledTableCell align="center">
                  {favourites.indexOf(""+row.name+row.country) === -1 && <FavoriteBorderIcon onClick={()=>toggleFavourite(row)}></FavoriteBorderIcon>}
                  {favourites.indexOf(""+row.name+row.country) > -1 && <FavoriteIcon onClick={()=>toggleFavourite(row)}></FavoriteIcon>}
              </StyledTableCell>

            </StyledTableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={3} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination 
              rowsPerPageOptions={[10, 20, 30, { label: 'All', value: -1 }]}
              colSpan={6}
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'Rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={PagingToolbar}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default SearchTable;