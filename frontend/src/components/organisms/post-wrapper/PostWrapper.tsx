// PLUGINS IMPORTS //
import { Paper } from "@mui/material";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./post-wrapper.module.css";

/////////////////////////////////////////////////////////////////////////////

type PostWrapperProps = {
  children: React.ReactNode;
  postId: string;
  hover?: boolean;
};

const PostWrapper = ({ children, postId, hover = false }: PostWrapperProps) => {
  return (
    <article
      className={`${styles["post-wrapper"]}
    `}
    >
      <Paper key={postId} className={`${styles.post} ${hover && styles["post--hover"]}`}>
        {children}
      </Paper>
    </article>
  );
};

export default PostWrapper;
