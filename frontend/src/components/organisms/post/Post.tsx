// PLUGINS IMPORTS //
import type { EntityId } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// COMPONENTS IMPORTS //
import PostWrapper from "../post-wrapper/PostWrapper";
import PostAside from "../post-aside/PostAside";
import PostSection from "../post-section/PostSection";
import { PlainLink } from "components/atoms";

// EXTRA IMPORTS //
import { selectPostById } from "features/slices/postsSlice";
import type { RootState } from "app/store";
import styles from "./post.module.css";

/////////////////////////////////////////////////////////////////////////////

type PostProps = {
  postId: EntityId;
};

const Post = ({ postId }: PostProps) => {
  // we need to provide state with type RootState everywhere
  const post = useSelector((state: RootState) => selectPostById(state, postId));
  return (
    <PlainLink to={`post/${post.postId}`}>
      <PostWrapper postId={post.postId} hover>
        <PostAside upvotes={post.PostUpvotes.length} />
        <PostSection
          communityName={post.Community.name}
          username={post.User.username}
          createdAt={post.createdAt}
          title={post.title}
          description={post.description}
          commentsLength={post.Comments.length}
          homePost
        />
      </PostWrapper>
    </PlainLink>
  );
};

export default Post;
