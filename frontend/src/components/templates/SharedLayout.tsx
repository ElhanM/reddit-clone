// PLUGINS IMPORTS //
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

// COMPONENTS IMPORTS //
const Navbar = lazy(() => import("./navbar/Navbar"));

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const SharedLayout = () => {
  return (
    <>
      {/* this way content loads faster */}
      <Suspense>{<Navbar />}</  Suspense>
      <div
        style={{
          paddingTop: "2.5em",
        }}
      >
        <Outlet />
      </div>
    </>
  );
};
export default SharedLayout;
