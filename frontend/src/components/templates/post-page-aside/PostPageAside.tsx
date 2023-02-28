// PLUGINS IMPORTS //
import { Paper, Typography } from "@mui/material";
import { CreateButton, PlainLink } from "components/atoms";

// COMPONENTS IMPORTS //
import { RSlash } from "components/molecules";

// EXTRA IMPORTS //
import { ETheme } from "types/theme";
import styles from "./post-page-aside.module.css";

/////////////////////////////////////////////////////////////////////////////

type PostPageAsideProps = {};

const PostPageAside = (props: PostPageAsideProps) => {
  return (
    <aside>
      <Paper className={`${styles["post-page-aside-wrapper"]}`}>
        <div className={`${styles["background"]}`} />
        <header className={`${styles["header"]}`}>
          <RSlash big />
          <Typography>r/csMajors</Typography>
        </header>
        <main className={`${styles["home-aside-main"]}`}>
          <p className={`${styles["p-welcome"]}`}>All about studying and students of computer science.</p>
          <div className={`${styles["border-seperate"]}`}></div>
          <p className={`${styles["p-count"]}`}>165k</p>
          <p className={`${styles["p-members"]}`}>Members</p>
          <div className={`${styles["border-seperate"]}`}></div>
          <div className={`${styles["buttons"]}`}>
            <CreateButton
              theme={ETheme.DARK}
              buttonText="Join"
              buttonProps={{
                fullWidth: true,
              }}
            />
            <CreateButton
              theme={ETheme.LIGHT}
              buttonText="Create Post"
              buttonProps={{
                fullWidth: true,
              }}
            />
          </div>
        </main>
      </Paper>
    </aside>
  );
};

export default PostPageAside;
