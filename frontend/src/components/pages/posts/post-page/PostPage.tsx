// PLUGINS IMPORTS //

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { PostPageAside, PostPageMain } from "components/templates";
import styles from "./post-page.module.css";
/////////////////////////////////////////////////////////////////////////////

const PostPage = () => {
  return (
    <article className={`${styles["post-page-wrapper"]}`}>
      <main>
        <PostPageMain />
      </main>
      <aside>
        <PostPageAside />
      </aside>
    </article>
  );
};

export default PostPage;
