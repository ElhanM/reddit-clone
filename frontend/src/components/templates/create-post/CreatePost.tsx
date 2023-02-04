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
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
  ];
  const modules = {
    syntax: false,
    toolbar: toolbarOptions,
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

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
          <ReactQuill theme="snow" value={markdownText} onChange={setMarkdownText} className="react-quill" modules={modules} />
          <div className="ql-snow">
            <div className="ql-editor">
              <ReactMarkdown children={markdownText} rehypePlugins={[rehypeRaw]} />
            </div>
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
      </article>
    </main>
  );
};

export default CreatePost;
