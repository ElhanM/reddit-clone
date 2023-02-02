// PLUGINS IMPORTS //
import { Paper, Typography } from "@mui/material";
import type { EntityId } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { selectPostById } from "features/slices/postsSlice";
import type { RootState } from "app/store";
import styles from "./post.module.css";
import { TimeAgo, Upvote } from "components/molecules";

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
          <Typography>{post.PostUpvotes.length}</Typography>
        </aside>
        <section className={`${styles["post-section"]}`}>
          <header className={`${styles["post-header"]}`}>
            <Typography>r/{post.Community.name}</Typography>
            <Typography>u/{post.User.username}</Typography>
            <TimeAgo timestamp={post.createdAt} />
          </header>
          <main className={`${styles["post-main"]}`}>
            <Typography>{post.title}</Typography>
            <Typography>{post.description}</Typography>
          </main>
          <footer className={`${styles["post-footer"]}`}>
            <Typography>{post.Comments.length} comments</Typography>
          </footer>
        </section>
      </Paper>
    </article>
  );
};

export default Post;
