// PLUGINS IMPORTS //
import { useParams } from "react-router-dom";

// COMPONENTS IMPORTS //
import { HandleError, PostsLoading } from "components/templates";
import PostWrapper from "../post-wrapper/PostWrapper";
import PostAside from "../post-aside/PostAside";
import PostSection from "../post-section/PostSection";

// EXTRA IMPORTS //
import { useGetPostQuery } from "features/slices/postsSlice";
import { useEffect } from "react";

/////////////////////////////////////////////////////////////////////////////

type ViewPostProps = {};

const ViewPost = ({}: ViewPostProps) => {
  const { postId } = useParams<{ postId: string }>();
  const { isLoading, isSuccess, isError, error, isFetching, data: post } = useGetPostQuery(postId);


  if (isSuccess) {
    return (
      <PostWrapper postId={postId}>
        <PostAside upvotes={post.PostUpvotes.length} />
        <PostSection
          communityName={post.Community.name}
          username={post.User.username}
          createdAt={post.createdAt}
          title={post.title}
          description={post.description}
          commentsLength={post.Comments.length}
        />
      </PostWrapper>
    );
  }
};

export default ViewPost;
