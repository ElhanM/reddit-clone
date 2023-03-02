// PLUGINS IMPORTS //
import { Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

// COMPONENTS IMPORTS //
import { FormattedRMD, RSlash, TimeAgo } from "components/molecules";

// EXTRA IMPORTS //
import styles from "./post-section.module.css";

/////////////////////////////////////////////////////////////////////////////

type PostSectionProps = {
  communityName: string;
  username: string;
  createdAt: string;
  title: string;
  description: string;
  commentsLength: number;
  homePost?: boolean;
};

const PostSection = ({ communityName, username, createdAt, title, description, commentsLength, homePost = false }: PostSectionProps) => {
  return (
    <section className={`${styles["post-section"]}`}>
      <header className={`${styles["post-header"]}`}>
        <div className={`${styles["header-community"]}`}>
          <RSlash />
          <Typography component="h2" className={`${styles["community"]}`}>
            r/{communityName}
          </Typography>
        </div>
        <Typography component="h3" className={`${styles["by-user"]}`}>
          Posted by u/{username}
        </Typography>
        <TimeAgo timestamp={createdAt} />
      </header>
      <main className={`${homePost && styles["home-post-main"]}`}>
        <Typography component="h1" className={`${styles["post-main-title"]}`}>
          {title}
        </Typography>
        <div className="post-markdown">
          <FormattedRMD markdownText={description} />
        </div>
      </main>
      <footer className={`${styles["post-footer"]}`}>
        <ChatBubbleOutlineIcon className={`${styles["comment-icon"]}`} />
        <Typography component="h4" className={`${styles["comment-info"]}`}>
          {commentsLength} comments
        </Typography>
      </footer>
    </section>
  );
};

export default PostSection;
