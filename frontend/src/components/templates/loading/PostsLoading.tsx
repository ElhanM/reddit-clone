// PLUGINS IMPORTS //
import { m } from "framer-motion";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./loading.module.css";

/////////////////////////////////////////////////////////////////////////////

type AvatarPlaceholderProps = {};

const AvatarPlaceholder = ({}: AvatarPlaceholderProps) => {
  return (
    <m.div
      animate={{
        backgroundColor: ["#575757", "#E0E0E0", "#575757"],
      }}
      transition={{
        duration: 1,
        ease: "linear",
        repeat: Infinity,
      }}
      className={`${styles["avatar-placeholder"]}`}
    />
  );
};

type TitlePlaceholderProps = {};

const TitlePlaceholder = ({}: TitlePlaceholderProps) => {
  return (
    <>
      <div className={`${styles["title-background"]}`} />
      <m.div
        animate={{
          translateX: ["-5vw", "30vw"],
        }}
        transition={{ duration: 1, ease: "linear", repeat: Infinity }}
        className={`${styles["title-animation"]}`}
      />
    </>
  );
};

type BodyPlaceholderProps = {};

const BodyPlaceholder = ({}: BodyPlaceholderProps) => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <div className={`${styles["body-container"]}`}>
          <div className={`${styles["body-background"]}`} />
          <m.div
            animate={{
              translateX: ["-5vw", "30vw"],
            }}
            transition={{ duration: 1, ease: "linear", repeat: Infinity }}
            className={`${styles["body-animation"]}`}
          />
        </div>
      ))}
    </>
  );
};

type PostsLoadingProps = {};

const PostsLoading = ({}: PostsLoadingProps) => {
  return (
    <div className={`${styles["posts-loading-container"]}`}>
      <div className={`${styles["posts-loading-flex"]}`}>
        <AvatarPlaceholder />
        <div className={`${styles["title-container"]}`}>
          <TitlePlaceholder />
        </div>
      </div>
      <BodyPlaceholder />
    </div>
  );
};

export default PostsLoading;
