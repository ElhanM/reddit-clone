// PLUGINS IMPORTS //
import { Paper, Typography } from "@mui/material";
import { CreateButton, PlainLink } from "components/atoms";

// COMPONENTS IMPORTS //
import { Avatar } from "components/molecules";

// EXTRA IMPORTS //
import styles from "./home-aside.module.css";
import { ETheme } from "types/theme";
import { EAvatar } from "types/pages";

/////////////////////////////////////////////////////////////////////////////

type HomeAsideProps = {};

const HomeAside = (props: HomeAsideProps) => {
  return (
    <aside>
      <Paper className={`${styles["home_aside-wrapper"]}`}>
        <div className={`${styles["background"]}`}/>
        <header className={`${styles["header"]}`}>
          <Avatar size={EAvatar.MEDIUM} translate />
          <Typography>Home</Typography>
        </header>
        <main className={`${styles["home-aside-main"]}`}>
          <p className={`${styles["p-welcome"]}`}>Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>
          <div className={`${styles["border-seperate"]}`}></div>
          <div className={`${styles["buttons"]}`}>
            <PlainLink to="/create-post">
              <CreateButton
                theme={ETheme.LIGHT}
                buttonText="Create Post"
                buttonProps={{
                  fullWidth: true,
                }}
              />
            </PlainLink>
            <PlainLink to="#">
              <CreateButton
                theme={ETheme.DARK}
                buttonText="Create Community"
                buttonProps={{
                  fullWidth: true,
                }}
              />
            </PlainLink>
          </div>
        </main>
      </Paper>
    </aside>
  );
};

export default HomeAside;
