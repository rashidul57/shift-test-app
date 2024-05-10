import { DataRow } from "../types/TableInfo";

const InjectUid = (data: DataRow[]) => {
  data = data.map(item => {
    item.uid = item.name + '-' + item.country;
    return item;
  });
  return data;
}

export default InjectUid;