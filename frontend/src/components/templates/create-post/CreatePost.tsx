// PLUGINS IMPORTS //
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import hljs from "highlight.js";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark.css";
import ReactQuill from "react-quill";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

// COMPONENTS IMPORTS //
import { CreateButton } from "components/atoms";

// EXTRA IMPORTS //
import styles from "./create-post.module.css";
import { ETheme } from "types/theme";

/////////////////////////////////////////////////////////////////////////////

type CreatePostProps = {};

hljs.configure({
  // optionally configure hljs
  languages: ["javascript", "python", "c", "c++", "java", "HTML", "css", "matlab"],
});

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],

  [{ list: "ordered" }, { list: "bullet" }],
  ["link"],
  [{ indent: "-1" }, { indent: "+1" }],

  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ align: [] }],
];
const modules = {
  syntax: {
    highlight: function (text: string) {
      return hljs.highlightAuto(text).value;
    },
  },
  toolbar: toolbarOptions,
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
  "align",
];

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
          <ReactQuill value={markdownText} onChange={value => setMarkdownText(value)} theme="snow" modules={modules} formats={formats} />
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
