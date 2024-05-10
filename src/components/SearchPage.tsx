import * as React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { useState, useEffect, useContext } from 'react';
import { DataRow } from '../types/TableInfo';

import _ from 'lodash';
import CustomSelect from './CustomSelect';
import { baseApiUrl, defaultCountry } from '../data/configs';
import { Box, Button, Link, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import DataContext from '../context/data-context';
import { useNavigate } from 'react-router-dom';
import TableView from './TableView';

const SearchPageContent = () => {
  const [tableData, setTableData] = useState([] as DataRow[]);

  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [searchKey, setSearchKey] = useState('');
  const [resCode, setResCode] = useState(0);
  const [resTime, setResTime] = useState(0);
  const navigate = useNavigate();
  const { countries } = useContext(DataContext);

  
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const url =  `${baseApiUrl}?country=${selectedCountry}&name=${searchKey}`;
      const start = Date.now();
      fetch(url)
        .then((res) => {
          setResCode(res.status);
          return res.json();
        })
        .then((data: DataRow[]) => {
          //console.log(data.length)
          setTableData(data.map(item => {
            item.uid = item.name + '-' + item.country;
            return item;
          }));
          const milliSecs = (Date.now() - start);
          setResTime(milliSecs);
        });
      }, 500);
      return () => clearTimeout(debounceTimer);
  }, [selectedCountry, searchKey]);

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

  const showFavourites = () => {
    navigate("/favourites");
  }
  
  return (
    <TableContainer component={Paper} sx={{ m: '10px 50px', width: 'auto' }}>
      <Stack direction="row" spacing={2}>
        <CustomSelect data={countries} selectedValue={selectedCountry} label='Country' onSelectChange={handleCountryChange}></CustomSelect>
        <TextField id="standard-basic" label="Search by name" variant="standard" value={searchKey} onChange={handleSearchChange} />
        {/* <Button sx={{textTransform: "none"}} size="small" onClick={resetFilters}>Clear All Filters</Button> */}
        <Link href="#" onClick={resetFilters} sx={{ pt: 3}}>Clear All Filters</Link>
        <Typography sx={{ pt: 3, pl: 3}}>Code: {resCode}</Typography>
        <Typography sx={{ pt: 3, pl: 3}}>Time: {resTime} ms</Typography>
        <Typography sx={{ flexGrow: 1 }}>&nbsp;</Typography>
        <Link href="#" onClick={showFavourites} sx={{ pt: 3, pr: 1}}>Favourites</Link>
      </Stack>
      <TableView tableData={tableData} tableType='search'></TableView>
      
    </TableContainer>
  );
}

export default SearchPageContent;