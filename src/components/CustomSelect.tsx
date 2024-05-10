import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

type Props = {
  data: string[],
  selectedValue: string | undefined,
  label: string,
  onSelectChange: (value: string) => void  
}

const CustomSelect = (props: Props) => {
  const {data = [], selectedValue, label, onSelectChange} = props;

  const handleChange = (ev: SelectChangeEvent) => {
    onSelectChange(ev.target.value);
  };

  return (
    <div>
      <FormControl sx={{ mt: {xs: 1, sm: 0, md: '10px'}, 
        width: {xs: 'calc(100% - 10px)'},
        minWidth: {sm: '200px', md: '200px' }}} size="small">
        <InputLabel id="select-autowidth-label">{label}</InputLabel>
        <Select
          labelId="simple-select-autowidth-label"
          id="simple-select-autowidth"
          value={selectedValue}
          onChange={handleChange}
          autoWidth
          label={label}
        >
          {data.map(value => (
            <MenuItem value={value} key={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default CustomSelect;