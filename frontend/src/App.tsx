// COMPONENTS IMPORTS //
import { CssBaseline } from "@mui/material";
import { Home, Login, SharedLayout } from "components/pages";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/////////////////////////////////////////////////////////////////////////////

const App = () => {
  return (
    <>
      {/* baseline gives us a nice style foundation to work on */}
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            {/* <Route path="register" element={<Register />} /> */}
            {/* <Route path="*" element={<Error />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
