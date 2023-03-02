// PLUGINS IMPORTS //
import { Paper, Typography } from "@mui/material";

// COMPONENTS IMPORTS //
import { Upvote } from "components/molecules";

// EXTRA IMPORTS //
import styles from "./post-aside.module.css";

/////////////////////////////////////////////////////////////////////////////

type PostAsideProps = {
  upvotes: number;
};

const PostAside = ({ upvotes }: PostAsideProps) => {
  return (
    <aside className={`${styles["post-aside"]}`}>
      <Upvote />
      <Typography component="p" className={`${styles["upvote-count"]}`}>
        {upvotes}
      </Typography>
      <Typography component="p" className={`${styles["upvote-count"]}`}>
        Vote
      </Typography>
    </aside>
  );
};

export default PostAside;
