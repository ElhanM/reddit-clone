// PLUGINS IMPORTS //

// COMPONENTS IMPORTS //
import { CreateCommunity, CreatePostAside } from "components/templates";

// EXTRA IMPORTS //
import styles from "./create-community.module.css";

/////////////////////////////////////////////////////////////////////////////

type CreateCommunityPageProps = {};

const CreateCommunityPage = (props: CreateCommunityPageProps) => {
  return (
    <article className={`${styles["create-community-page-wrapper"]}`}>
      <main>
        <CreateCommunity />
      </main>
      <aside>
        <CreatePostAside />
      </aside>
    </article>
  );
};

export default CreateCommunityPage;
