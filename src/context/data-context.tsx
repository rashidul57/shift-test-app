import { useState, createContext } from "react";
import { DataRow } from "../types/TableInfo";

const DataContext = createContext({
  countries: [] as string[],
  setCountries: (_data: string[]) => {},
  favourites: [] as string[],
  setFavourites: (_favs: string[]) => {},
  allUniversities: [] as DataRow[],
  setAllUniversities: (_data: DataRow[]) => {},
});

export default DataContext;