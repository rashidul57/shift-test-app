import { useEffect, useState } from "react"
import DataContext from "./data-context"
import _ from "lodash"
import { baseApiUrl } from "../data/configs"
import { DataRow } from "../types/TableInfo"
import InjectUid from "../utils/helper"

type Props = {
  children: any
}

const DataProvider = (props: Props) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [allUniversities, setAllUniversities] = useState<DataRow[]>([]);

  useEffect(() => {
    //Load country list for the first time only.
    if (countries.length === 0) {
      const url =  `${baseApiUrl}`;
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data: DataRow[]) => {
          setAllUniversities(InjectUid(data));
          const groupedData = _.groupBy(data, 'country');
          const _countries = Object.keys(groupedData).sort();
          setCountries(_countries);
        });
    }
  }, [countries]);

  useEffect(() => {
    //Load favorites from localStorage for the first time
    if (favorites.length === 0) {
      const favs = localStorage.getItem('favorites');
      if (favs) {
        setFavorites(JSON.parse(favs));
      }
    }
  }, [favorites]);

  const { children } = props;
  const dataValue = {
    countries,
    setCountries,
    favorites,
    setFavorites,
    allUniversities,
    setAllUniversities,
  }
  return (
    <DataContext.Provider value={dataValue}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider;