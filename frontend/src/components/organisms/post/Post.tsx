// PLUGINS IMPORTS //
import { Paper } from "@mui/material";
import type { EntityId } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// EXTRA IMPORTS //
import { selectPostById } from "features/slices/postsSlice";
import type { RootState } from "app/store";

/////////////////////////////////////////////////////////////////////////////

type PostProps = {
  postId: EntityId;
};

const Post = ({ postId }: PostProps) => {
  // we need to provide state with type RootState everywhere
  const post = useSelector((state: RootState) => selectPostById(state, postId));
  return (
    <article>
      <Paper key={post.postId}>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <hr />
      </Paper>
    </article>
  );
};

export default Post;
