// PLUGINS IMPORTS //
import ReactQuill from "react-quill";

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
      />
      {emptyMarkdown && "The description value should not be empty"}
    </>
  );
};

export default ConfigedRQuill;
