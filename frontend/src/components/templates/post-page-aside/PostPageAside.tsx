// PLUGINS IMPORTS //
import { Paper, Typography } from "@mui/material";
import { CreateButton, PlainLink } from "components/atoms";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import { useParams } from "react-router-dom";

// COMPONENTS IMPORTS //
import { RSlash, TimeAgo } from "components/molecules";
import PostsLoading from "../loading/PostsLoading";
import HandleError from "../error/HandleError";

// EXTRA IMPORTS //
import { ETheme } from "types/theme";
import styles from "./post-page-aside.module.css";
import { selectCommunityIdByPostId } from "features/slices/postsSlice";
import { useAppSelector } from "app/store";
import { useGetCommunityQuery } from "features/slices/communitySlice";

/////////////////////////////////////////////////////////////////////////////

type PostPageAsideProps = {};

const PostPageAside = (props: PostPageAsideProps) => {
  const { postId } = useParams<{ postId: string }>();

  const communityId = useAppSelector(selectCommunityIdByPostId(postId));

  const { isLoading, isSuccess, isError, error, data: community } = useGetCommunityQuery(communityId);

  if (isLoading) {
    return <PostsLoading />;
    // do not show error until communityId is fetched
  } else if (isError && communityId) {
    return <HandleError error={error} />;
  } else if (isSuccess) {
    return (
      <aside>
        <Paper className={`${styles["post-page-aside-wrapper"]}`}>
          <div className={`${styles["background"]}`} />
          <header className={`${styles["header"]}`}>
            <RSlash big />
            <Typography>r/{community.name}</Typography>
          </header>
          <main className={`${styles["home-aside-main"]}`}>
            <p className={`${styles["p-welcome"]}`}>{community.description}</p>
            <div className={`${styles["created"]}`}>
              <CakeOutlinedIcon className={`${styles["cake-icon"]}`} />
              {/* call TimeAgo component */}
              <p className={`${styles["p-created"]}`}>
                Created <TimeAgo timestamp={community.createdAt} noStyles />
              </p>
            </div>
            <div className={`${styles["border-seperate"]}`}></div>

            <div className={`${styles["info"]}`}>
              <div className={`${styles["members"]}`}>
                <p className={`${styles["p-count"]}`}>{community.Users.length}</p>
                <p className={`${styles["p-info"]}`}>Members</p>
              </div>
              <div className={`${styles["online"]}`}>
                <p className={`${styles["p-count"]} ${styles["center"]}`}>
                  <span className={`${styles["online-dot"]}`} />
                  {/* random number between 0 and community.Users.length*/}
                  {Math.floor(Math.random() * community.Users.length)}
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
              <PlainLink
                // when we use to="create-post", it adds this path at the end of the current path, so it goes postIdParm/create-post
                // we use to={{ pathname: "/create-post" }} to go to the path /create-post
                to={{
                  pathname: "/create-post",
                }}
              >
                <CreateButton
                  theme={ETheme.LIGHT}
                  buttonText="Create Post"
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
  }
};

export default PostPageAside;
