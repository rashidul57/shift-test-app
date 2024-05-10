import { useEffect, useState } from "react"
import DataContext from "./data-context"
import _ from "lodash"
import { baseApiUrl } from "../data/configs"
import { DataRow } from "../types/TableInfo"

type Props = {
  children: any
}

const DataProvider = (props: Props) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
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
          setAllUniversities(data.map(item => {
            item.uid = item.name + '-' + item.country;
            return item;
          }));
          const groupedData = _.groupBy(data, 'country');
          const _countries = Object.keys(groupedData).sort();
          setCountries(_countries);
        });
    }
  }, [countries]);

  useEffect(() => {
    //Load favourites from localStorage for the first time
    if (favourites.length === 0) {
      const favs = localStorage.getItem('favourites');
      if (favs) {
        setFavourites(JSON.parse(favs));
      }
    }
  }, [favourites]);

  const { children } = props;
  const dataValue = {
    countries,
    setCountries,
    favourites,
    setFavourites,
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