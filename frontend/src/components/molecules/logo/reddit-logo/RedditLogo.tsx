// PLUGINS IMPORTS //

// COMPONENTS IMPORTS //
import { PlainLink } from "components/atoms";
import { RedditIcon, RedditText } from "components/molecules";

// EXTRA IMPORTS //
import styles from "./reddit-logo.module.css";

/////////////////////////////////////////////////////////////////////////////

type RedditLogoProps = {};

const RedditLogo = (props: RedditLogoProps) => {
  return (
    <PlainLink to="/">
      <nav className={`${styles["reddit-logo"]}`}>
        <RedditIcon />
        <RedditText />
      </nav>
    </PlainLink>
  );
};

export default RedditLogo;
