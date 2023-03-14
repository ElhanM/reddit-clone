// PLUGINS IMPORTS //
import { Link, LinkProps } from "react-router-dom";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./plain-link.module.css";

/////////////////////////////////////////////////////////////////////////////

type PlainLinkProps = {
  children: React.ReactNode;
  to: string | { pathname: string };
  className?: string;
  // i need the onClick in order to have the back button in the error page
  onClick?: () => void;
};

const PlainLink = ({ children, to, className, onClick }: PlainLinkProps) => {
  return (
    <Link to={to} className={`${styles["plain-link"]} ${className}`} onClick={onClick}>
      {children}
    </Link>
  );
};

export default PlainLink;
