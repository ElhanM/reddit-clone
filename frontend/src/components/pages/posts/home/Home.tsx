// PLUGINS IMPORTS //
import { HomeAside } from "components/organisms";
import { Posts } from "components/templates";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./home.module.css";
/////////////////////////////////////////////////////////////////////////////

const Home = () => {

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
