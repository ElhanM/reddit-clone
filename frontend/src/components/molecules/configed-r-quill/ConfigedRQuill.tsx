// PLUGINS IMPORTS //
import ReactQuill from "react-quill";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { QuillModules, QuillFormats, QuillPlaceholder } from "quill-config";

/////////////////////////////////////////////////////////////////////////////

type ConfigedRQuillProps = {
  placeholder: string;
  content: string;
  // useState setState function
  setContent: (value: string) => void;
};

const ConfigedRQuill = ({ placeholder, content, setContent }: ConfigedRQuillProps) => {
  return (
    <ReactQuill
      value={content}
      onChange={value => setContent(value)}
      theme="snow"
      modules={QuillModules}
      formats={QuillFormats}
      placeholder={QuillPlaceholder}
    />
  );
};

export default ConfigedRQuill;
