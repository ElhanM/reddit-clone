import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { selectAllPosts, useGetPostsQuery } from "./features/slices/postsSlice";

const App = () => {
  const { isLoading, isSuccess, isError, error, data } = useGetPostsQuery();
  const posts = useSelector(selectAllPosts);
  const axiosReq = async () => {
    try {
      // const login = await axios.post(
      //   "http://localhost:5000/api/auth/login",
      //   {
      //     email: "elhan@gmail.com",
      //     password: "elhan1234",
      //   },
      //   {
      //     withCredentials: true,
      //   },
      // );
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    axiosReq();
    console.log("redux:", { data, error });
  }, [data]);

  return (
    <div>
      {/* print posts */}
      {posts.map(post => (
        <div key={post.postId}>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default App;
