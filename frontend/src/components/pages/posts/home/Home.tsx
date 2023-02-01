// PLUGINS IMPORTS //
import { CssBaseline, Paper } from "@mui/material";
import { selectAllPosts, useGetPostsQuery } from "features/slices/postsSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

/////////////////////////////////////////////////////////////////////////////

const Home = () => {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();
  const posts = useSelector(selectAllPosts);

  return (
    <div>
      <CssBaseline />
      {posts.map(post => (
        <Paper key={post.postId}>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <hr />
        </Paper>
      ))}
    </div>
  );
};

export default Home;
