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
          // in order to not make the animation look choppy, we want it to start outside the div and go beyond the div's bounds
          // https://jameshfisher.com/2019/12/29/what-are-css-percentages/
          // when using % on width and height for example, the width and height properties are percentages of the corresponding width and height of the containing block
          // translate on the other hand refer to the size of the bounding box
          // https://stackoverflow.com/questions/11160227/translate-x-and-y-percentage-values-based-on-elements-height-and-width
          // aka When using percentage in translate, it refers to width or height of itself.
          // so I will just use pixels, from -100 to 900 so it works on all screen sizes and I don't have to waste any more time on this
          translateX: ["-100px", "900px"],
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
              translateX: ["-100px", "900px"],
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
