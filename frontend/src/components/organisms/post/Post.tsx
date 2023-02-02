// PLUGINS IMPORTS //
import { Paper } from "@mui/material";
import type { EntityId } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { selectPostById } from "features/slices/postsSlice";
import type { RootState } from "app/store";
import styles from "./post.module.css";

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
        <h1>{post.title}</h1>
        <p>{post.description}</p>
      </Paper>
    </article>
  );
};

export default Post;
