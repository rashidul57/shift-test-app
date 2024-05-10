
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { PagingToolbar } from './PagingToolbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { ColumnType, DataRow, fields } from '../types/TableInfo';
import { useContext, useState } from 'react';
import DataContext from '../context/data-context';
import _ from 'lodash';

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

type Props = {
  tableData: DataRow[],
  tableType: string,
  // more props in future
}


const TableView = (props: Props) => {
  const { tableData, tableType } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { favourites, setFavourites } = useContext(DataContext);
  
  // To avoid a layout breaking for empty rows.
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
    const uid = row.uid.toString();
    let favs = [];
    if (favourites.indexOf(uid) === -1) {
      favs = [...favourites, uid];
      setFavourites(favs);
    } else {
      favs = _.remove([...favourites], _uid => _uid !== uid);
      setFavourites(favs);
    }
    localStorage.setItem('favourites', JSON.stringify(favs));
  }


  return <Table aria-label="search page">
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
      <StyledTableRow key={row.uid.toString()}>
        {fields.map((field) => (
          <StyledTableCell component="th" scope="row" key={field.name + "-" + row.uid}>
            { field.name === 'web_pages' && (row[field.name] as string[]).map(webUrl => (
              <span key={webUrl}>
                <a href={webUrl}>{webUrl}</a>
                <span>&nbsp;&nbsp;</span>
              </span>
            ))}
            { field.name !== 'web_pages' &&  row[field.name]}
          </StyledTableCell>
        ))}
        {tableType === 'search' && <StyledTableCell align="center">
            {favourites.indexOf(row.uid.toString()) === -1 && <FavoriteBorderIcon onClick={()=>toggleFavourite(row)}></FavoriteBorderIcon>}
            {favourites.indexOf(row.uid.toString()) > -1 && <FavoriteIcon style={{ color: 'red' }} onClick={()=>toggleFavourite(row)}></FavoriteIcon>}
        </StyledTableCell>}

        {tableType === 'favourites' && <StyledTableCell align="center">
            <RemoveCircleOutlineOutlinedIcon onClick={()=>toggleFavourite(row)}></RemoveCircleOutlineOutlinedIcon>
        </StyledTableCell>}

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
</Table>;
}

export default TableView;