// PLUGINS IMPORTS //
import { orange, blue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

/////////////////////////////////////////////////////////////////////////////

const theme = createTheme({
  palette: {
    // dark theme
    mode: "dark",
    // set color of dark theme to #030303
    background: {
      default: "#030303",
    },
    // set color of text to #d7dadc
    text: {
      primary: "#d7dadc",
    },
    primary: {
      main: orange[500],
    },
    secondary: {
      main: blue[500],
    },
  },
});

export default theme;
