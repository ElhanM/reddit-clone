// PLUGINS IMPORTS //
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

// COMPONENTS IMPORTS //
import { CreateButton } from "components/atoms";
import { ConfigedRQuill, FormattedRMD } from "components/molecules";

// EXTRA IMPORTS //
import styles from "./create-post.module.css";
import { ETheme } from "types/theme";

/////////////////////////////////////////////////////////////////////////////

type CreatePostProps = {};

const CreatePost = (props: CreatePostProps) => {
  const [markdownText, setMarkdownText] = useState("");
  useEffect(() => {
    console.log({ markdownText });
  }, [markdownText]);
  return (
    <main className={`${styles["create-post-wrapper"]}`}>
      <header className={`${styles["create-post-header"]}`}>
        <Typography variant="h6">Create a post</Typography>
      </header>
      {/* making the border a seperate div makes it easier to apply margin */}
      <div className={`${styles["border"]} ${styles["top"]}`}></div>
      <div>Choose a community</div>
      <article className={`${styles["create-post"]}`}>
        <section className={`${styles["inner-create-post"]}`}>
          <section>Title</section>
          <ConfigedRQuill placeholder="Description" content={markdownText} setContent={setMarkdownText} />
          <FormattedRMD markdownText={markdownText} />
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
      </article>
    </main>
  );
};

export default CreatePost;
