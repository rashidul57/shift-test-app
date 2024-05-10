import { Button, Link, Paper, Stack, TableContainer, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TableView from './TableView';
import DataContext from '../context/data-context';
import { useContext } from 'react';
//
const FavouritePageContent = () => {
  const navigate = useNavigate();
  const { allUniversities, favourites } = useContext(DataContext);
  const tableData = allUniversities.filter(item => favourites.indexOf(item.uid) > -1);
  
  const showSearchPage = () => {
    navigate("/search");
  }
  return (
    <TableContainer component={Paper} sx={{ m: '10px 50px', width: 'auto' }}>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ flexGrow: 1 }}>&nbsp;</Typography>
        <Link href="#" onClick={showSearchPage} sx={{  pt: 3, pr: 1}}>Search</Link>
      </Stack>
      <TableView tableData={tableData} tableType='favourites'></TableView>
      
    </TableContainer>
  );
}

export default FavouritePageContent;