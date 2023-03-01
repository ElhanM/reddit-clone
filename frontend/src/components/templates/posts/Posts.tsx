// PLUGINS IMPORTS //
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

// COMPONENTS IMPORTS //
import { Post } from "components/organisms";
import HandleError from "../error/HandleError";
import PostsLoading from "../loading/PostsLoading";

// EXTRA IMPORTS //
import styles from "./posts.module.css";
import { selectPostIds, selectPostsInfo, useGetPostsQuery } from "features/slices/postsSlice";
import { useAppSelector } from "app/store";

/////////////////////////////////////////////////////////////////////////////

const Posts = () => {
  const [page, setPage] = useState(1);

  const { isLoading, isSuccess, isError, error, isFetching } = useGetPostsQuery(page);

  const postsInfo = selectPostsInfo(useAppSelector(state => state));
  const postIds = useSelector(selectPostIds);

  useEffect(() => {
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;

      if (!isFetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        if (page <= postsInfo.pages) setPage(page + 1);
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching]);

  if (isLoading) {
    return <PostsLoading />;
  } else if (isError) {
    return <HandleError error={error} />;
  } else if (isSuccess) {
    return (
      <section className={`${styles["posts-wrapper"]}`}>
        {postIds.map(postId => (
          <Post key={postId} postId={postId} />
        ))}
        {isFetching && !isLoading && <PostsLoading />}
      </section>
    );
  }
};

export default Posts;
