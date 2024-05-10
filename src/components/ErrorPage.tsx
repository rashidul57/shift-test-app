import { Typography } from "@mui/material";

const ErrorPageContent = () => {
  return (
    <Typography id='error' sx={{ m: '10px 50px', width: 'auto' }}>
        <h1 className="notFoundTitle">Oppps! That page can’t be found.</h1>
    </Typography>
);
}

export default ErrorPageContent;