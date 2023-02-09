// PLUGINS IMPORTS //

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./avatar.module.css";
import { EAvatar } from "types/pages";

/////////////////////////////////////////////////////////////////////////////

type AvatarProps = {
  size: EAvatar;
  translate?: boolean;
  rounded?: boolean;
};

const Avatar = ({ size, translate, rounded }: AvatarProps) => {
  let sizeClass = "";
  switch (size) {
    case EAvatar.SMALL:
      sizeClass = styles["small"];
      break;
    case EAvatar.MEDIUM:
      sizeClass = styles["medium"];
      break;
    case EAvatar.LARGE:
      sizeClass = styles["large"];
      break;
  }

  return (
    <div
      className={`${styles["avatar"]} ${sizeClass}
    ${translate && styles["translate"]}
    ${rounded && styles["rounded"]}    `}
    ></div>
  );
};

export default Avatar;
