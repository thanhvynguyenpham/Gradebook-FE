import { createTheme } from "@mui/material/styles";
import "./variables.scss";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#264653",
    },
    secondary: {
      main: "#e76f51",
    },
  },
});
export default theme;
