// PLUGINS IMPORTS //
import { EntityId } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";

// COMPONENTS IMPORTS //
import { FormattedRMD, TimeAgo } from "components/molecules";

// EXTRA IMPORTS //
import styles from "./post-comment.module.css";
import { selectCommentsByPostId } from "features/slices/commentsSlice";
import { useAppSelector } from "app/store";
import { Typography } from "@mui/material";

/////////////////////////////////////////////////////////////////////////////

type PostCommentProps = {
  commentId: EntityId;
};

const PostComment = ({ commentId }: PostCommentProps) => {
  const { postId } = useParams<{ postId: string }>();
  const comment = useAppSelector(state => selectCommentsByPostId(postId).selectCommentById(state, commentId));

  return (
    <section className={`${styles["post-comment"]}`}>
      <header className={`${styles["post-comment-header"]}`}>
        <Typography className={`${styles["post-comment-username"]}`}>u/{comment.User.username}</Typography>
        <div className={`${styles["time-ago"]}`}>
          <TimeAgo timestamp={comment.createdAt} />
        </div>
      </header>
      <main className={`${styles["post-comment-main"]}`}>
        <div className="post-markdown">
          <FormattedRMD markdownText={comment.comment} />
        </div>
      </main>
    </section>
  );
};

export default PostComment;
