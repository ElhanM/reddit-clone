// PLUGINS IMPORTS //
import { HomeAside } from "components/organisms";
import { Posts } from "components/templates";
import { useEffect } from "react";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { useAppSelector } from "app/store";
import styles from "./home.module.css";
import { setUserCookies } from "utils";

/////////////////////////////////////////////////////////////////////////////

const Home = () => {
  // select state from authSlice
  const user = useAppSelector(state => state.userState.user);
  useEffect(() => {
    console.log({ user }); 
    if (user.userId) {
      setUserCookies(user.userId);
    }
  }, [user]);
  return (
    <article className={`${styles["home-wrapper"]}`}>
      <main>
        <Posts />
      </main>
      <aside>
        <HomeAside />
      </aside>
    </article>
  );
};

export default Home;
