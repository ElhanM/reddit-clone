// PLUGINS IMPORTS //

// COMPONENTS IMPORTS //
import { PostPageAside, ViewPost } from "components/templates";

// EXTRA IMPORTS //
import styles from "./post-page.module.css";
/////////////////////////////////////////////////////////////////////////////

const PostPage = () => {
  return (
    <article className={`${styles["post-page-wrapper"]}`}>
      <main>
        <ViewPost />
      </main>
      <aside>
        <PostPageAside />
      </aside>
    </article>
  );
};

export default PostPage;
