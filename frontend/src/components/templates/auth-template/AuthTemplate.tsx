// PLUGINS IMPORTS //

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./auth-template.module.css";

/////////////////////////////////////////////////////////////////////////////

type AuthTemplateProps = {
  children: React.ReactNode;
};

const AuthTemplate = ({ children }: AuthTemplateProps) => {
  return (
    <article className={`${styles["auth-template-wrapper"]}`}>
      <aside className={`${styles["aside-image"]}`}></aside>
      <main>{children}</main>
    </article>
  );
};

export default AuthTemplate;
