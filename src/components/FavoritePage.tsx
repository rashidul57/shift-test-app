import { Button, Link, Paper, Stack, TableContainer, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TableView from './TableView';
import DataContext from '../context/data-context';
import { useContext } from 'react';

const FavoritePageContent = () => {
  const navigate = useNavigate();
  const { allUniversities, favorites } = useContext(DataContext);
  const tableData = allUniversities.filter(item => favorites.indexOf(item.uid) > -1);
  
  const showSearchPage = () => {
    navigate("/search");
  }

  return (
    <TableContainer component={Paper} sx={{ m: '10px 50px', width: 'auto' }}>
      <Stack direction="row" spacing={2}>
        <Typography sx={{ flexGrow: 1, fontSize: 20, fontStyle: 'bold', p: '5px 10px' }}>Your Favorites</Typography>
        <Link href="#" onClick={showSearchPage} sx={{  pt: 2, pr: 1}}>Search</Link>
      </Stack>
      <TableView tableData={tableData} tableType='favorites'></TableView>
      
    </TableContainer>
  );
}

export default FavoritePageContent;