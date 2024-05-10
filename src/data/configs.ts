import { FieldType } from "../types/TableInfo";

export const defaultCountry = 'Canada';

export const baseApiUrl = 'http://universities.hipolabs.com/search';

export const fields: FieldType[] = [
  {name: 'name', label: 'Name'},
  {name: 'state-province', label: 'State/Province'},
  {name: 'web_pages', label: 'Website'},
]
