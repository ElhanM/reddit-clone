// PLUGINS IMPORTS //
import { Link, LinkProps } from "react-router-dom";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./plain-link.module.css";

/////////////////////////////////////////////////////////////////////////////

type PlainLinkProps = {
  children: React.ReactNode;
  to: string;
  restLinkProps?: LinkProps;
};

const PlainLink = ({ children, to, restLinkProps }: PlainLinkProps) => {
  return (
    <Link to={to} className={`${styles["plain-link"]}`} {...restLinkProps}>
      {children}
    </Link>
  );
};

export default PlainLink;
