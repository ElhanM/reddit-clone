// PLUGINS IMPORTS //
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// COMPONENTS IMPORTS //
import { CreatePostPage, Error, Home, Login } from "components/pages";
import { SharedLayout } from "components/templates";
import { useEffect, useState } from "react";
import { getUserCookie } from "utils";

// EXTRA IMPORTS //
import { useAppSelector } from "app/store";
import { useGetMeMutation } from "features/slices/authSlice";

/////////////////////////////////////////////////////////////////////////////

const App = () => {
  // get state from userSlice
  const { user } = useAppSelector(state => state.userState);
  const [getMe, { isLoading, isError, error, isSuccess }] = useGetMeMutation();

  // https://beta.reactjs.org/learn/you-might-not-need-an-effect
  // Removing unnecessary Effects will make your code easier to follow, faster to run, and less error-prone.
  if (getUserCookie() && user.userId === "") {
    getMe(null);
  }

  useEffect(() => {
    console.log("userrrrr", user);
  }, [user]);

  return (
    <>
      {/* baseline gives us a nice style foundation to work on */}
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          //TODO add role based routing
          <Route path="/" element={getUserCookie() ? <SharedLayout /> : <Login />}>
            {getUserCookie() && (
              <>
                <Route index element={<Home />} />
                <Route path="create-post" element={<CreatePostPage />} />
              </>
            )}

            <Route path="login" element={<Login />} />
            {/* <Route path="register" element={<Register />} /> */}
            <Route path="*" element={getUserCookie() ? <Error /> : <Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
