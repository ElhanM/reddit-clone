// PLUGINS IMPORTS //
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

// COMPONENTS IMPORTS //
import { HandleError, PostsLoading } from "components/templates";
import { ConfigedRQuill } from "components/molecules";
import { CreateButton } from "components/atoms";
import { PostWrapper, PostAside, PostComments } from "components/organisms";

// EXTRA IMPORTS //
import styles from "./view-post.module.css";
import { ETheme } from "types/theme";
import PostSection from "components/organisms/post-section/PostSection";
import { useGetPostQuery } from "features/slices/postsSlice";
import { useCreateCommentMutation } from "features/slices/commentsSlice";

/////////////////////////////////////////////////////////////////////////////

type ViewPostProps = {};

const ViewPost = ({}: ViewPostProps) => {
  const { postId } = useParams<{ postId: string }>();
  const { isLoading, isSuccess, isError, error, data: post } = useGetPostQuery(postId);

  console.log({ post })

  const [createComment, { isLoading: isLoadingComment, isError: isErrorComment, error: errorComment, isSuccess: isSuccessComment }] =
    useCreateCommentMutation();

  const [markdownText, setMarkdownText] = useState("");
  const [emptyMarkdown, setEmptyMarkdown] = useState(false);

  useEffect(() => {
    if (emptyMarkdown) setEmptyMarkdown(false);
    console.log("markdownText", markdownText);
  }, [markdownText]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (markdownText === "<p><br></p>" || markdownText === "") {
      setEmptyMarkdown(true);
    }

    if (markdownText !== "<p><br></p>" && markdownText !== "") {
      const createCommentData = await createComment({
        comment: markdownText,
        postId: postId,
      }).unwrap();
      setMarkdownText("");
      setEmptyMarkdown(false);
    }
  };

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
                Comment as {post.User.username}
              </Typography>
              <form onSubmit={submitHandler}>
                <ConfigedRQuill
                  placeholder="What are your thoughts?"
                  content={markdownText}
                  setContent={setMarkdownText}
                  emptyMarkdown={emptyMarkdown}
                />
                <section className={`${styles["post-button"]}`}>
                  <CreateButton
                    theme={ETheme.LIGHT}
                    buttonText="Comment"
                    buttonProps={{ type: "submit", variant: "contained", color: "primary", disabled: isLoadingComment }}
                  />
                </section>
              </form>
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
