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

  const methods = useForm<ICreatePostForm>({
    resolver: yupResolver(createPostFormSchema),
    // in order to achive the behaviour where error msgs appear both on submit and when fields that are modified get unfocused, we use mode: "onTouched" with
    // some extra logic in the input field to stop behaviours like error appearing if user did not modify the field
    // also, once error appears, it will stay there until form is submitted properly
    mode: "onTouched",
    defaultValues: {
      title: "",
      description: "",
    },
    // uncontrolled inputs
  });

  // typing an async arrow function
  const submitHandler: SubmitHandler<ICreatePostForm> = async (data: ICreatePostForm) => {
    console.log("data", data);
  };

  useEffect(() => {
    console.log("markdownText", markdownText);
  }, [markdownText]);

  return (
    <main className={`${styles["create-post-wrapper"]}`}>
      <header className={`${styles["create-post-header"]}`}>
        <Typography variant="h6">Create a post</Typography>
      </header>
      {/* making the border a seperate div makes it easier to apply margin */}
      <div className={`${styles["border"]} ${styles["top"]}`}></div>
      <div className={`${styles["select"]}`}>
        <SelectCommunity />
      </div>
      <article className={`${styles["create-post"]}`}>
        <FormWrapper methods={methods} submitHandler={submitHandler} authForm={true}>
          <section className={`${styles["inner-create-post"]}`}>
            <AuthTextFieldComponent
              label="Title"
              name="title"
              createPost
              textFieldProps={{
                fullWidth: true,
              }}
            />
            <ConfigedRQuill placeholder="Description" content={markdownText} setContent={setMarkdownText} />
            <div className={`${styles["formatted-markdown"]}`}>
              <FormattedRMD markdownText={markdownText && markdownText !== "<p><br></p>" ? markdownText : "Markdown preview"} />
            </div>
            <div className={`${styles["border"]} ${styles["bottom"]}`}></div>
            <section className={`${styles["post-button"]}`}>
              <CreateButton
                theme={ETheme.LIGHT}
                buttonText="Post"
                buttonProps={{
                  fullWidth: false,
                }}
              />
            </section>
          </section>
        </FormWrapper>
      </article>
    </main>
  );
};

export default CreatePost;
