// PLUGINS IMPORTS //
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// COMPONENTS IMPORTS //
import { AuthTextFieldComponent, CreateButton, SelectCommunity } from "components/atoms";
import { ConfigedRQuill, FormattedRMD } from "components/molecules";
import { FormWrapper } from "components/organisms";

// EXTRA IMPORTS //
import styles from "./create-post.module.css";
import { ETheme } from "types/theme";
import { ICreatePostForm } from "types/templates";
import createPostFormSchema from "./createPostFormSchema";

/////////////////////////////////////////////////////////////////////////////

type CreatePostProps = {};

const CreatePost = (props: CreatePostProps) => {
  const [markdownText, setMarkdownText] = useState("");
  const [community, setCommunity] = useState("");

  const methods = useForm<ICreatePostForm>({
    resolver: yupResolver(createPostFormSchema),
    // in order to achive the behaviour where error msgs appear both on submit and when fields that are modified get unfocused, we use mode: "onTouched" with
    // some extra logic in the input field to stop behaviours like error appearing if user did not modify the field
    // also, once error appears, it will stay there until form is submitted properly
    mode: "onTouched",
    defaultValues: {
      title: "",
      // description: "",
    },
    // uncontrolled inputs
  });

  const [emptyMarkdown, setEmptyMarkdown] = useState(false);
  const [emptyCommunity, setEmptyCommunity] = useState(false);

  // typing an async arrow function
  const submitHandler: SubmitHandler<ICreatePostForm> = async (data: ICreatePostForm) => {
    if (markdownText === "<p><br></p>" || markdownText === "") {
      setEmptyMarkdown(true);
    }
    if (community === "") {
      setEmptyCommunity(true);
    }
    console.log("data", data);
  };

  useEffect(() => {
    console.log("markdownText", markdownText);
  }, [markdownText]);

  useEffect(() => {
    console.log("community", community);
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
          <SelectCommunity setCommunity={setCommunity} emptyCommunity={emptyCommunity} />
        </div>
        <article className={`${styles["create-post"]}`}>
          <section className={`${styles["inner-create-post"]}`}>
            <AuthTextFieldComponent
              label="Title"
              name="title"
              createPost
              textFieldProps={{
                fullWidth: true,
              }}
            />
            <ConfigedRQuill placeholder="Description" content={markdownText} setContent={setMarkdownText} emptyMarkdown={emptyMarkdown} />
            <div className={`${styles["formatted-markdown"]}`}>
              {/* if we type something into RQuill, and then delete it all, the markdownText gets set to "<p><br></p>" */}
              <FormattedRMD markdownText={markdownText && markdownText !== "<p><br></p>" ? markdownText : "Markdown preview"} />
            </div>
            <div className={`${styles["border"]} ${styles["bottom"]}`}></div>
            <section className={`${styles["post-button"]}`}>
              <CreateButton theme={ETheme.LIGHT} buttonText="Post" buttonProps={{ type: "submit", variant: "contained", color: "primary" }} />
            </section>
          </section>
        </article>
      </main>
    </FormWrapper>
  );
};

export default CreatePost;
