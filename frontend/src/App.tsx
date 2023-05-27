// PLUGINS IMPORTS //
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// COMPONENTS IMPORTS //
import { CreatePostPage, Error, Home, Login, PostPage, Register, SearchCommunities } from "components/pages";
import { SharedLayout } from "components/templates";

// EXTRA IMPORTS //
import { useAppSelector } from "app/store";
import { useGetMeMutation } from "features/slices/authSlice";
import { getUserCookie } from "utils";
import { useGetUserCommunitiesQuery } from "features/slices/communitySlice";
import CreateCommunityPage from "components/pages/create-community/CreateCommunity";

/////////////////////////////////////////////////////////////////////////////

const App = () => {
  // get state from userSlice
  const { user } = useAppSelector(state => state.userState);
  const [
    getMe,
    // {isLoading, isError, error, isSuccess }
  ] = useGetMeMutation();
  const { isLoading, isSuccess, isError, error, isFetching } = useGetUserCommunitiesQuery(null);

  let userCookie = getUserCookie();

  useEffect(() => {
    // we only need this useEffect to run on the very initial render of the app
    // if user has a cookie, that means he has recently logged in (so we know he has an account) and we only need to get his info
    // if user has no cookie, that means he needs to visit the login page
    // evey subsequent need for a cookie will be handled by the auth pages, the job of this useEffect is only to handle the user's first visit to the app
    // and make it so that, if he has a cookie, he doesn't have to visit the login page beofre viewing the content
    if (userCookie && user.userId === "") {
      getMe(null);
      userCookie = getUserCookie();
    }
  }, []);

  return (
    <>
      {/* baseline gives us a nice style foundation to work on */}
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={userCookie && <SharedLayout />}>
            {userCookie && (
              <>
                <Route index element={<Home />} />
                <Route path="create-post" element={<CreatePostPage />} />
                <Route path="login" element={<Register />} />
                <Route path="register" element={<Register />} />
                <Route path="post/:postId" element={<PostPage />} />
                <Route path="search-communities" element={<SearchCommunities />} />
                <Route path="create-community" element={<CreateCommunityPage />} />
              </>
            )}
            <Route path="register" element={<Register />} />
            <Route path="*" element={userCookie ? <Error /> : <Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
