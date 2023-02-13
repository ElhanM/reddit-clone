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
  const [userCookie, setUserCookie] = useState("");
  // get state from userSlice
  const { user } = useAppSelector(state => state.userState);
  const [getMe, { isLoading, isError, error, isSuccess }] = useGetMeMutation();

  useEffect(() => {
    setUserCookie(getUserCookie());
    // ! more dependencies? slice? split? redirect?
  }, [getUserCookie]);

  useEffect(() => {
    // React useState hook is asynchronous so we need to use getMe in a separate useEffect that relies on userCookie
    if (userCookie && user.userId === "") {
      getMe(null);
    }
  }, [userCookie]);

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
          <Route path="/" element={<SharedLayout />}>
            {userCookie ? (
              <>
                <Route index element={<Home />} />
                <Route path="create-post" element={<CreatePostPage />} />
              </>
            ) : null}

            <Route path="login" element={<Login />} />
            {/* <Route path="register" element={<Register />} /> */}
            <Route path="*" element={userCookie ? <Error /> : <Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
