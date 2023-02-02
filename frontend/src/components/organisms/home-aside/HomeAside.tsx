// PLUGINS IMPORTS //
import { Paper, Typography } from "@mui/material";
import { CreateButton } from "components/atoms";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./home-aside.module.css";

/////////////////////////////////////////////////////////////////////////////

type Props = {};

const HomeAside = (props: Props) => {
  return (
    <aside>
      <Paper className={`${styles["home_aside-wrapper"]}`}>
        <div className={`${styles["background"]}`}></div>
        <header className={`${styles["header"]}`}>
          <div className={`${styles["avatar"]}`}></div>
          <Typography>Home</Typography>
        </header>
        <main className={`${styles["home-aside-main"]}`}>
          <p>Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>
          <div className={`${styles["border-seperate"]}`}></div>
          {/* make reusable buttons */}
          <CreateButton />
          <CreateButton />
        </main>
      </Paper>
    </aside>
  );
};

export default HomeAside;
