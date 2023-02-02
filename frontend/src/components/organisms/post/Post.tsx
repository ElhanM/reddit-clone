// PLUGINS IMPORTS //
import { Paper, Typography } from "@mui/material";
import type { EntityId } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { selectPostById } from "features/slices/postsSlice";
import type { RootState } from "app/store";
import styles from "./post.module.css";
import { RSlash, TimeAgo, Upvote } from "components/molecules";

/////////////////////////////////////////////////////////////////////////////

type PostProps = {
  postId: EntityId;
};

const Post = ({ postId }: PostProps) => {
  // we need to provide state with type RootState everywhere
  const post = useSelector((state: RootState) => selectPostById(state, postId));
  return (
    <article className={`${styles["post-wrapper"]}`}>
      <Paper key={post.postId} className={`${styles.post}`}>
        <aside className={`${styles["post-aside"]}`}>
          <Upvote />
          <Typography component="p" className={`${styles["upvote-count"]}`}>{post.PostUpvotes.length}</Typography>
          <Typography component="p" className={`${styles["upvote-count"]}`}>Vote</Typography>
        </aside>
        <section className={`${styles["post-section"]}`}>
          <header className={`${styles["post-header"]}`}>
            <div className={`${styles["header-community"]}`}>
              <RSlash />
              <Typography component="h2" className={`${styles["community"]}`}>
                r/{post.Community.name}
              </Typography>
            </div>
            <Typography component="h3" className={`${styles["header-rest"]}`}>
              Posted by u/{post.User.username}
            </Typography>
            <TimeAgo timestamp={post.createdAt} />
          </header>
          <main className={`${styles["post-main"]}`}>
            <Typography component="h1" className={`${styles["post-main-title"]}`}>
              {post.title}
            </Typography>
            <Typography component="p" className={`${styles["post-main-description"]}`}>
              {post.description}
            </Typography>
          </main>
          <footer className={`${styles["post-footer"]}`}>
            <ChatBubbleOutlineIcon className={`${styles["comment-icon"]}`} />
            <Typography component="h4" className={`${styles["comment-info"]}`}>
              {post.Comments.length} comments
            </Typography>
          </footer>
        </section>
      </Paper>
    </article>
  );
};

export default Post;
