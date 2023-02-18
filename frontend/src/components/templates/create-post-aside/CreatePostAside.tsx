// PLUGINS IMPORTS //
import { Paper, Typography } from "@mui/material";
import { ETheme } from "types/theme";

// COMPONENTS IMPORTS //
import { CreatePostAvatar } from "components/molecules";

// EXTRA IMPORTS //
import styles from "./create-post-aside.module.css";

/////////////////////////////////////////////////////////////////////////////

type CreatePostAsideProps = {};

const rules = [
  "Remember the human",
  "Behave like you would in real life",
  "Look for the original source of content",
  "Search for duplicates before posting",
  "Read the community's rules",
];

const CreatePostAside = (props: CreatePostAsideProps) => {
  return (
    <aside>
      <Paper className={`${styles["create_post_aside-wrapper"]}`}>
        <header className={`${styles["header"]}`}>
          <CreatePostAvatar />
          <Typography variant="h6" sx={{ fontSize: "1rem" }}>
            Posting to Reddit
          </Typography>
        </header>
        <div className={`${styles["border-seperate"]}`}></div>
        <main>
          {rules.map((rule, index) => (
            <div key={index} className={`${styles["rule"]}`}>
              <Typography variant="subtitle1" sx={{ fontSize: ".9rem" }}>
                {index + 1}. {rule}
              </Typography>
              <div className={`${styles["border-seperate"]}`}></div>
            </div>
          ))}
        </main>
      </Paper>
    </aside>
  );
};

export default CreatePostAside;
