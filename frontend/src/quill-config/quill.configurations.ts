import hljs from "highlight.js";

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

// eveything we use in our toolbar needs to be mentioned in formats
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

const placeholder = "Description";

export { modules, formats, placeholder };
