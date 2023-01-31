import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

// absolute path does not work in this file
import App from "./App";
import { store } from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
