// PLUGINS IMPORTS //
import Cookies from "universal-cookie";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const deleteUserCookies = () => {
  const cookies = new Cookies();
  cookies.remove(`${import.meta.env.VITE_USER_COOKIE}`, { path: "/" });
};

export default deleteUserCookies;
