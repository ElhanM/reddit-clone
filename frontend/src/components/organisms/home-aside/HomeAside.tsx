// PLUGINS IMPORTS //
import { Paper, Typography } from "@mui/material";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./home-aside.module.css";

/////////////////////////////////////////////////////////////////////////////

type Props = {};

const HomeAside = (props: Props) => {
  return (
    <aside className={`${styles["home_aside-wrapper"]}`}>
      <Paper>
        <Typography>Home</Typography>
        <p>Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>
        <button>Create Community</button>
      </Paper>
    </aside>
  );
};

export default HomeAside;
