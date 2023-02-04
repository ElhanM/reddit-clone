// PLUGINS IMPORTS //

// COMPONENTS IMPORTS //
import { CreatePost, CreatePostAside } from "components/templates";

// EXTRA IMPORTS //
import styles from "./create-post-page.module.css";

/////////////////////////////////////////////////////////////////////////////

type CreatePostPageProps = {};

const CreatePostPage = (props: CreatePostPageProps) => {
  return (
    <article className={`${styles["create-post-page-wrapper"]}`}>
      <main>
        <CreatePost />
      </main>
      <aside>
        <CreatePostAside />
      </aside>
    </article>
  );
};

export default CreatePostPage;
