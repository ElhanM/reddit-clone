// PLUGINS IMPORTS //
import { useParams } from "react-router-dom";
import { useEffect } from "react";

// COMPONENTS IMPORTS //

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

  return <div>{JSON.stringify(comments)}</div>;
};

export default PostComments;
