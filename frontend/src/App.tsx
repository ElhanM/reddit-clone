// PLUGINS IMPORTS //
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// COMPONENTS IMPORTS //
import { CreatePostPage, Error, Home, Login } from "components/pages";
import { SharedLayout } from "components/templates";

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const App = () => {
  return (
    <>
      {/* baseline gives us a nice style foundation to work on */}
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          //TODO add role based routing
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="create-post" element={<CreatePostPage />} />
            <Route path="login" element={<Login />} />
            {/* <Route path="register" element={<Register />} /> */}
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
