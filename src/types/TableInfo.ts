
export type DataRow = {
  'name': string,
  'state-province': string,
  'web_pages': string,
  'country': string,
  'uid': string,
}

export type ColumnType = string | string[]

type fieldType = {
  name: string,
  label: string,
}

export const fields: fieldType[] = [
  {name: 'name', label: 'Name'},
  {name: 'state-province', label: 'State/Province'},
  {name: 'web_pages', label: 'Website'},
]