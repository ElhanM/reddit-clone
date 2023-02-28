// PLUGINS IMPORTS //
import { useParams } from "react-router-dom";

// COMPONENTS IMPORTS //
import { ViewPost } from "components/organisms";

// EXTRA IMPORTS //
import styles from "./post-page.module.css";

/////////////////////////////////////////////////////////////////////////////

type PostPageMainProps = {};

const PostPageMain = (props: PostPageMainProps) => {
  const { postId } = useParams<{ postId: string }>();

  return (
    <div>
      <ViewPost postId={postId} />
    </div>
  );
};

export default PostPageMain;
