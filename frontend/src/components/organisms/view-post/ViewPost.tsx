// PLUGINS IMPORTS //
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

// COMPONENTS IMPORTS //
import PostWrapper from "../post-wrapper/PostWrapper";
import PostAside from "../post-aside/PostAside";
import PostSection from "../post-section/PostSection";
import { HandleError, PostsLoading } from "components/templates";
import { ConfigedRQuill } from "components/molecules";
import PostComments from "../post-comments/PostComments";

// EXTRA IMPORTS //
import { useGetPostQuery } from "features/slices/postsSlice";
import styles from "./view-post.module.css";

/////////////////////////////////////////////////////////////////////////////

type ViewPostProps = {};

const ViewPost = ({}: ViewPostProps) => {
  const { postId } = useParams<{ postId: string }>();
  const { isLoading, isSuccess, isError, error, isFetching, data: post } = useGetPostQuery(postId);
  const [markdownText, setMarkdownText] = useState("");

  const [emptyMarkdown, setEmptyMarkdown] = useState(false);

  useEffect(() => {
    if (emptyMarkdown) setEmptyMarkdown(false);
    console.log("markdownText", markdownText);
  }, [markdownText]);

  if (isLoading) {
    return <PostsLoading />;
  } else if (isError) {
    return <HandleError error={error} />;
  } else if (isSuccess) {
    return (
      <>
        <PostWrapper postId={postId}>
          <PostAside upvotes={post.PostUpvotes.length} />
          <div className={`${styles["post-section-wrapper"]}`}>
            <PostSection
              communityName={post.Community.name}
              username={post.User.username}
              createdAt={post.createdAt}
              title={post.title}
              description={post.description}
              commentsLength={post.Comments.length}
            />
            <div className={`${styles["quill-wrapper"]}`}>
              <Typography variant="subtitle1" fontSize={14}>
                Comment as dumbelco
              </Typography>
              <ConfigedRQuill
                placeholder="What are your thoughts?"
                content={markdownText}
                setContent={setMarkdownText}
                emptyMarkdown={emptyMarkdown}
              />
            </div>
            <div className={`${styles["comments-wrapper"]}`}>
              <PostComments />
            </div>
          </div>
        </PostWrapper>
      </>
    );
  }
};

export default ViewPost;
