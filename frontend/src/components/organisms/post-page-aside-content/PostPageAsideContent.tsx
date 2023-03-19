// PLUGINS IMPORTS //
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import { Paper, Typography } from "@mui/material";
import { CreateButton, PlainLink } from "components/atoms";
import { RSlash, TimeAgo } from "components/molecules";
import { ICommunityRes } from "types/features";
import { ETheme } from "types/theme";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./post-page-aside-content.module.css";

/////////////////////////////////////////////////////////////////////////////

type PostPageAsideContentProps = {
  community: ICommunityRes;
  online: number;
  showLeave: boolean;
  handleLeaveCommunity: () => void;
  isLoadingLeave: boolean;
  handleJoinCommunity: () => void;
  isLoadingJoin: boolean;
};

const PostPageAsideContent = ({
  community,
  online,
  showLeave,
  handleLeaveCommunity,
  isLoadingLeave,
  handleJoinCommunity,
  isLoadingJoin,
}: PostPageAsideContentProps) => {
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
                {/* online gets displayed as NaN at start, this way we pervent that behaviour */}
                {!Number.isNaN(online) ? online : 0}
              </p>
              <p className={`${styles["p-info"]}`}>Onine</p>
            </div>
            <div />
          </div>
          <div className={`${styles["border-seperate"]}`}></div>
          <div className={`${styles["buttons"]}`}>
            {showLeave ? (
              <CreateButton
                theme={ETheme.DARK}
                buttonText="Leave community"
                buttonProps={{
                  fullWidth: true,
                  onClick: handleLeaveCommunity,
                  disabled: isLoadingLeave,
                }}
              />
            ) : (
              <CreateButton
                theme={ETheme.DARK}
                buttonText="Join community"
                buttonProps={{
                  fullWidth: true,
                  onClick: handleJoinCommunity,
                  disabled: isLoadingJoin,
                }}
              />
            )}
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
};

export default PostPageAsideContent;
