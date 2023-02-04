// PLUGINS IMPORTS //

import { Typography } from "@mui/material";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type CreatePostProps = {};

const CreatePost = (props: CreatePostProps) => {
  return (
    <main>
      <header>
        <Typography variant="h6">Create Post</Typography>
      </header>
      <div></div>
      <div>Choose a community</div>
      <article>
        <section>Title</section>
        <section>Text</section>
        <div></div>
        <section>
          <button>Post</button>
        </section>
      </article>
    </main>
  );
};

export default CreatePost;
