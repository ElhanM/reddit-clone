// COMPONENTS IMPORTS //
import { Home, Login, SharedLayout } from "components/pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/////////////////////////////////////////////////////////////////////////////

const App = () => {
  return (
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
  );
};

export default App;
