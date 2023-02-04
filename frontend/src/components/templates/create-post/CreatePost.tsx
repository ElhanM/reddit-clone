// PLUGINS IMPORTS //
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

// COMPONENTS IMPORTS //
import { CreateButton } from "components/atoms";

// EXTRA IMPORTS //
import styles from "./create-post.module.css";
import { ETheme } from "types/theme";

/////////////////////////////////////////////////////////////////////////////

type CreatePostProps = {};

const CreatePost = (props: CreatePostProps) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log({ value });
  }, [value]);
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
          <ReactQuill theme="snow" value={value} onChange={setValue} />
          <ReactMarkdown children={value} rehypePlugins={[rehypeRaw]} />
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
