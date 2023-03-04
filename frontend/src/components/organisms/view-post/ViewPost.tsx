// PLUGINS IMPORTS //
import { useParams } from "react-router-dom";

// COMPONENTS IMPORTS //
import PostWrapper from "../post-wrapper/PostWrapper";
import PostAside from "../post-aside/PostAside";
import PostSection from "../post-section/PostSection";

// EXTRA IMPORTS //
import { useGetPostQuery } from "features/slices/postsSlice";
import { useEffect } from "react";
import { HandleError, PostsLoading } from "components/templates";

/////////////////////////////////////////////////////////////////////////////

type ViewPostProps = {};

const ViewPost = ({}: ViewPostProps) => {
  const { postId } = useParams<{ postId: string }>();
  const { isLoading, isSuccess, isError, error, isFetching, data: post } = useGetPostQuery(postId);

  if (isLoading) {
    return <PostsLoading />;
  } else if (isError) {
    return <HandleError error={error} />;
  } else if (isSuccess) {
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
