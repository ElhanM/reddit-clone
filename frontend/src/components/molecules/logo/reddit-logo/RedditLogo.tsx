// PLUGINS IMPORTS //

// COMPONENTS IMPORTS //
import { Link } from "@mui/material";
import { RedditIcon, RedditText } from "components/molecules";

// EXTRA IMPORTS //
import styles from "./reddit-logo.module.css";

/////////////////////////////////////////////////////////////////////////////

type RedditLogoProps = {};

const RedditLogo = (props: RedditLogoProps) => {
  return (
    <Link
      href="/"
      className={`${styles["reddit-logo"]}`}
      sx={{
        height: "100% !important",
      }}
    >
      <RedditIcon />
      <RedditText />
    </Link>
  );
};

export default RedditLogo;
