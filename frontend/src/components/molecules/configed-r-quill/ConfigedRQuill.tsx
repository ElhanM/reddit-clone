// PLUGINS IMPORTS //
import ReactQuill from "react-quill";
import { Typography } from "@mui/material";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { QuillModules, QuillFormats } from "quill-config";

/////////////////////////////////////////////////////////////////////////////

type ConfigedRQuillProps = {
  placeholder: string;
  content: string;
  // useState setState function
  setContent: (value: string) => void;
  emptyMarkdown?: boolean;
};

const ConfigedRQuill = ({ placeholder, content, setContent, emptyMarkdown }: ConfigedRQuillProps) => {
  return (
    <>
      <ReactQuill
        value={content}
        onChange={value => setContent(value)}
        theme="snow"
        modules={QuillModules}
        formats={QuillFormats}
        placeholder={placeholder}
        className={emptyMarkdown && "empty-markdown"}
      />
      {emptyMarkdown && (
        <Typography
          variant="subtitle1"
          sx={{
            color: "#f44336",
            fontSize: "0.75rem",
            marginLeft: "0.7rem",
            marginTop: "-.8em",
          }}
        >
          The description value should not be empty
        </Typography>
      )}
    </>
  );
};

export default ConfigedRQuill;
