// PLUGINS IMPORTS //
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// COMPONENTS IMPORTS //
import { CreatePostTextFieldComponent, CreateButton, CreatePostSelectCommunity } from "components/atoms";
import { ConfigedRQuill, FormattedRMD } from "components/molecules";
import { FormWrapper } from "components/organisms";

// EXTRA IMPORTS //
import styles from "./create-post.module.css";
import { ETheme } from "types/theme";
import { ICreatePostForm } from "types/templates";
import { useCreatePostMutation } from "features/slices/postsSlice";

/////////////////////////////////////////////////////////////////////////////

type CreatePostProps = {};

const CreatePost = (props: CreatePostProps) => {
  const [createPost, { isLoading, isError, error, isSuccess }] = useCreatePostMutation();

  const history = useNavigate();

  const [markdownText, setMarkdownText] = useState("");
  const [community, setCommunity] = useState("");

  const methods = useForm<ICreatePostForm>({
    mode: "onTouched",
    defaultValues: {
      title: "",
    },
  });

  const [emptyMarkdown, setEmptyMarkdown] = useState(false);
  const [emptyCommunity, setEmptyCommunity] = useState(false);
  const [emptyTitle, setEmptyTitle] = useState(false);

  // typing an async arrow function
  const submitHandler: SubmitHandler<ICreatePostForm> = async (data: ICreatePostForm) => {
    if (markdownText === "<p><br></p>" || markdownText === "") {
      setEmptyMarkdown(true);
    }
    if (community === "") {
      setEmptyCommunity(true);
    }
    if (data.title === "") {
      setEmptyTitle(true);
    }
    if (markdownText !== "<p><br></p>" && markdownText !== "" && community !== "" && data.title !== "") {
      const createPostData = await createPost({
        title: data.title,
        description: markdownText,
        communityId: community,
      }).unwrap();
      history("/");
    }
  };

  useEffect(() => {
    if (emptyMarkdown) setEmptyMarkdown(false);
  }, [markdownText]);

  useEffect(() => {
    if (emptyCommunity) setEmptyCommunity(false);
  }, [community]);

  return (
    <FormWrapper methods={methods} submitHandler={submitHandler} authForm={true}>
      <main className={`${styles["create-post-wrapper"]}`}>
        <header className={`${styles["create-post-header"]}`}>
          <Typography variant="h6">Create a post</Typography>
        </header>
        {/* making the border a seperate div makes it easier to apply margin */}
        <div className={`${styles["border"]} ${styles["top"]}`}></div>
        <div className={`${styles["select"]}`}>
          <CreatePostSelectCommunity setCommunity={setCommunity} emptyCommunity={emptyCommunity} />
        </div>
        <article className={`${styles["create-post"]}`}>
          <section className={`${styles["inner-create-post"]}`}>
            <CreatePostTextFieldComponent
              label="Title"
              name="title"
              error={emptyTitle}
              setEmptyTitle={setEmptyTitle}
              textFieldProps={{
                fullWidth: true,
              }}
            />
            <ConfigedRQuill placeholder="Description" content={markdownText} setContent={setMarkdownText} emptyMarkdown={emptyMarkdown} createPost />
            <div className={`${styles["border"]} ${styles["bottom"]} ${styles["strong"]}`}></div>
            <div className={`${styles["formatted-markdown"]}`}>
              {/* if we type something into RQuill, and then delete it all, the markdownText gets set to "<p><br></p>" */}
              <FormattedRMD markdownText={markdownText && markdownText !== "<p><br></p>" ? markdownText : "Markdown preview"} />
            </div>
            <div className={`${styles["border"]} ${styles["bottom"]}`}></div>
            <section className={`${styles["post-button"]}`}>
              <CreateButton
                theme={ETheme.LIGHT}
                createPost
                buttonText="Post"
                buttonProps={{ type: "submit", variant: "contained", color: "primary", disabled: isLoading }}
              />
            </section>
          </section>
        </article>
      </main>
    </FormWrapper>
  );
};

export default CreatePost;
