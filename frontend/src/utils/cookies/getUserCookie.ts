// PLUGINS IMPORTS //
import Cookies from "universal-cookie";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const getUserCookie = () => {
  const cookies = new Cookies();
  return cookies.get(`${import.meta.env.VITE_USER_COOKIE}`);
};

export default getUserCookie;
