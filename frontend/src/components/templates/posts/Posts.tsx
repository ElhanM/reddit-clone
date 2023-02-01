import { Post } from "components/organisms";
import { selectPostIds, useGetPostsQuery } from "features/slices/postsSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

/////////////////////////////////////////////////////////////////////////////

const Posts = () => {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();
  const postIds = useSelector(selectPostIds);

  if (isLoading) {
    return <h1>Loading...</h1>;
    // error is an object, so we can't directly render it
    // docs type safe way to handle rtk query errors:
    // https://redux-toolkit.js.org/rtk-query/usage-with-typescript#type-safe-error-handling
  } else if (isError) {
    if ("status" in error) {
      // you can access all properties of `FetchBaseQueryError` here
      // with my backend logic, this is most likely to give back JSON.stringify(error.data which cointains msg and status
      let errMsg = "error" in error ? error.error : JSON.stringify(error.data);

      // so we chech, if we have msg in errMsg, we set errMsg to msg string, so our error message looks better
      // if for some reason we don't have msg in errMsg, we just render the whole errMsg in the form of a stringified JSON object
      if ("msg" in JSON.parse(errMsg)) {
        errMsg = JSON.parse(errMsg).msg;
      }
      return (
        <div>
          <h1>An error has occurred:</h1>
          <h2>{errMsg}</h2>
        </div>
      );
    } else {
      // you can access all properties of `SerializedError` here
      return <div>{error.message}</div>;
    }
  } else if (isSuccess) {
    return (
      <section>
        {postIds.map(postId => (
          <Post key={postId} postId={postId} />
        ))}
      </section>
    );
  }
};

export default Posts;
