// PLUGINS IMPORTS //
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type FormattedRMDProps = {
  markdownText: string;
};

const FormattedRMD = ({ markdownText }: FormattedRMDProps) => {
  return (
    <>
      {/* we need to wrap our markdown with the same classes that wrap our editor, in order to get the same styles */}
      <div className="ql-snow">
        <div className="ql-editor">
          <ReactMarkdown children={markdownText} rehypePlugins={[rehypeRaw]} />
        </div>
      </div>
    </>
  );
};

export default FormattedRMD;
