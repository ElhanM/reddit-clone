// PLUGINS IMPORTS //
import { Paper, Typography } from "@mui/material";

// COMPONENTS IMPORTS //
import { Upvote } from "components/molecules";

// EXTRA IMPORTS //
import styles from "./post-aside.module.css";
import { EntityId } from "@reduxjs/toolkit";

/////////////////////////////////////////////////////////////////////////////

type PostAsideProps = {
  upvotes: number;
  postId?: string | EntityId;
};

const PostAside = ({ upvotes, postId }: PostAsideProps) => {
  return (
    <aside className={`${styles["post-aside"]}`}>
      <Upvote postId={postId} />
      <Typography component="p" className={`${styles["upvote-count"]}`}>
        {upvotes}
      </Typography>
      <Typography component="p" className={`${styles["upvote-count"]}`}>
        Vote
      </Typography>
    </aside>
  );
};

export default PostAside;
