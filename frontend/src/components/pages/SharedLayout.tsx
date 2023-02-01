// PLUGINS IMPORTS //
import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

// const Navbar = lazy(() => import("./Navbar"));

/////////////////////////////////////////////////////////////////////////////

const SharedLayout = () => {
  return (
    <>
      {/* this way content loads faster */}
      <Suspense>{/* <Navbar /> */}</Suspense>
      <Outlet />
    </>
  );
};
export default SharedLayout;
