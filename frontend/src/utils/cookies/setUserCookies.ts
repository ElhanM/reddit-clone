// PLUGINS IMPORTS //
import Cookies from "universal-cookie";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const setUserCookies = (userId: string) => {
  console.log({ userId, env: import.meta.env.VITE_COOKIE_EXPIRE });
  const cookies = new Cookies();
  cookies.set(`${import.meta.env.VITE_USER_COOKIE}`, userId, {
    path: "/",
    maxAge: Number(import.meta.env.VITE_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "none",
  });
};

export default setUserCookies;
