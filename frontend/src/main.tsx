// PLUGINS IMPORTS //
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

// COMPONENT IMPORTS //
import App from "App";

// EXTRA IMPORTS //
import { store } from "app/store";
import { theme } from "mui";
import "index.css";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark.css";
/////////////////////////////////////////////////////////////////////////////

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
