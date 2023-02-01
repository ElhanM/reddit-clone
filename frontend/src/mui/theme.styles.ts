// PLUGINS IMPORTS //
import { orange, blue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

/////////////////////////////////////////////////////////////////////////////

const theme = createTheme({
  palette: {
    // dark theme
    mode: "dark",
    primary: {
      main: orange[500],
    },
    secondary: {
      main: blue[500],
    },
  },
});

export default theme;
