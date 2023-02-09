// PLUGINS IMPORTS //
import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

// COMPONENTS IMPORTS //
const Navbar = lazy(() => import("./navbar/Navbar"));

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const SharedLayout = () => {
  return (
    <>
      {/* this way content loads faster */}
      <Suspense>
        <Navbar />
      </Suspense>
      <Outlet />
    </>
  );
};
export default SharedLayout;
