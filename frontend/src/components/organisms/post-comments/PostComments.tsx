// PLUGINS IMPORTS //
import { useParams } from "react-router-dom";
import { useEffect } from "react";

// COMPONENTS IMPORTS //
import PostComment from "../post-comment/PostComment";

// EXTRA IMPORTS //
import { useGetCommentsQuery, selectCommentsByPostId } from "features/slices/commentsSlice";
import { useSelector } from "react-redux";
import styles from "./post-comments.module.css";

/////////////////////////////////////////////////////////////////////////////

type PostCommentsProps = {};

const PostComments = ({}: PostCommentsProps) => {
  const { postId } = useParams<{ postId: string }>();
  const { isLoading, isSuccess, isError, error, isFetching } = useGetCommentsQuery(postId);

  const comments = useSelector(selectCommentsByPostId(postId).selectCommentIds);

  return (
    <footer className={`${styles["post-comments"]}`}>
      {comments.map(commentId => (
        <PostComment key={commentId} commentId={commentId} />
      ))}
    </footer>
  );
};

export default PostComments;
