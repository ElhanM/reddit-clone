// PLUGINS IMPORTS //
import { Paper, Typography } from "@mui/material";
import { CreateButton, PlainLink } from "components/atoms";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import { useParams } from "react-router-dom";

// COMPONENTS IMPORTS //
import { RSlash } from "components/molecules";

// EXTRA IMPORTS //
import { ETheme } from "types/theme";
import styles from "./post-page-aside.module.css";
import { selectCommunityIdByPostId } from "features/slices/postsSlice";
import { useAppSelector } from "app/store";

/////////////////////////////////////////////////////////////////////////////

type PostPageAsideProps = {};

const PostPageAside = (props: PostPageAsideProps) => {
  const { postId } = useParams<{ postId: string }>();

  const communityId = useAppSelector(selectCommunityIdByPostId(postId));

  console.log({ communityId });

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
          <div className={`${styles["created"]}`}>
            <CakeOutlinedIcon className={`${styles["cake-icon"]}`} />
            <p className={`${styles["p-created"]}`}>Created Oct 6, 2014</p>
          </div>
          <div className={`${styles["border-seperate"]}`}></div>

          <div className={`${styles["info"]}`}>
            <div className={`${styles["members"]}`}>
              <p className={`${styles["p-count"]}`}>165k</p>
              <p className={`${styles["p-info"]}`}>Members</p>
            </div>
            <div className={`${styles["online"]}`}>
              <p className={`${styles["p-count"]} ${styles["center"]}`}>
                <span className={`${styles["online-dot"]}`} />
                974
              </p>
              <p className={`${styles["p-info"]}`}>Onine</p>
            </div>
            <div />
          </div>

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
