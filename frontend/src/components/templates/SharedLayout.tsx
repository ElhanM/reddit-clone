// PLUGINS IMPORTS //
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// COMPONENTS IMPORTS //
const Navbar = lazy(() => import("./navbar/Navbar"));

// EXTRA IMPORTS //
import { getUserCookie } from "utils";

/////////////////////////////////////////////////////////////////////////////

const SharedLayout = () => {
  const [userCookie, setUserCookie] = useState("");

  useEffect(() => {
    setUserCookie(getUserCookie());
    // ! more dependencies?
  }, [getUserCookie]);

  return (
    <>
      {/* this way content loads faster */}
      <Suspense>{userCookie ? <Navbar /> : null}</Suspense>
      <Outlet />
    </>
  );
};
export default SharedLayout;
