// PLUGINS IMPORTS //
import { selectPostIds, useGetPostsQuery } from "features/slices/postsSlice";
import { useSelector } from "react-redux";

// COMPONENTS IMPORTS //
import { Post } from "components/organisms";
import PostsError from "../error/PostsError";
import PostsLoading from "../loading/PostsLoading";

// EXTRA IMPORTS //
import styles from "./posts.module.css";

/////////////////////////////////////////////////////////////////////////////

const Posts = () => {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();
  const postIds = useSelector(selectPostIds);

  if (isLoading) {
    return <PostsLoading />;
  } else if (isError) {
    return <PostsError error={error} />;
  } else if (isSuccess) {
    return (
      <section className={`${styles["posts-wrapper"]}`}>
        {postIds.map(postId => (
          <Post key={postId} postId={postId} />
        ))}
      </section>
    );
  }
};

export default Posts;
