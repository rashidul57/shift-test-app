import * as React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { useState, useEffect, useContext } from 'react';
import { DataRow } from '../types/TableInfo';

import _ from 'lodash';
import CustomSelect from './CustomSelect';
import { baseApiUrl, defaultCountry } from '../data/configs';
import { Link, Stack, TextField, Typography } from '@mui/material';
import DataContext from '../context/data-context';
import { useNavigate } from 'react-router-dom';
import TableView from './TableView';
import InjectUid from '../utils/helper';

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
          setTableData(InjectUid(data));
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

  const showFavorites = () => {
    navigate("/favorites");
  }

  const searchStyle = { width: {xs: 'calc(100% - 10px)', sm: 'auto', md: 'auto'} };
  const typoStyle = { pt: {xs: 0, sm: 3, md: 3}, pr: {xs: 0, sm: 1, md: 1}, pb: {xs: 1}};
  const lnkStyle = { pt: {xs: 0, sm: 3, md: 3}, pr: {xs: 0, sm: 1, md: 1}, pb: {xs: 1}};
  
  return (
    <TableContainer component={Paper} elevation={0} sx={{ p: {xs: '5px', md: '10px 50px 0px 50px'}, width: 'auto' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} 
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{mt: {xs: 1, md: 1}, ml: {xs: 1}}}>
        <CustomSelect data={countries} selectedValue={selectedCountry} label='Country' onSelectChange={handleCountryChange}></CustomSelect>
        <TextField id="standard-basic" label="Search by name" variant="standard" 
          value={searchKey}
          onChange={handleSearchChange}
          sx={searchStyle} size="small"/>
        <Link href="#" onClick={resetFilters} sx={{ p: {xs: '10px 0px', md: 3}}}>Clear All Filters</Link>
        <Typography sx={typoStyle}>Response Code: {resCode}</Typography>
        <Typography sx={typoStyle}>Response Time: {resTime} ms</Typography>
        <Typography sx={{ flexGrow: {xs: 0, md: 1}, display: {xs: 'none', md: 'inline-block'} }}>&nbsp;</Typography>
        <Link href="#" onClick={showFavorites} sx={lnkStyle}>Favorites</Link>
      </Stack>
      <TableView tableData={tableData} tableType='search'></TableView>
      
    </TableContainer>
  );
}

export default SearchPageContent;
