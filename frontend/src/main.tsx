// PLUGINS IMPORTS //
import { ThemeProvider } from "@mui/material/styles";
import React from "react";

// COMPONENT IMPORTS //
import App from "App";

// EXTRA IMPORTS //
import { store } from "app/store";
import { theme } from "mui";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "index.css";

/////////////////////////////////////////////////////////////////////////////

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
);
