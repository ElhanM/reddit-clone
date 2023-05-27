// PLUGINS IMPORTS //

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { useLikePostMutation } from "features/slices/postsSlice";
import { getUserCookie } from "utils";
import styles from "./upvote.module.css";
import { EntityId } from "@reduxjs/toolkit";
/////////////////////////////////////////////////////////////////////////////

type UpvoteProps = {
  postId?: string | EntityId;
};

const Upvote = ({ postId }: UpvoteProps) => {
  const [likePost, { isLoading, isError, error, isSuccess }] = useLikePostMutation();

  console.log(getUserCookie());

  const handleUpvoteClick = async () => {
    if (!getUserCookie() || !postId) return;
    await likePost({ postId: postId as string, userId: getUserCookie() as string });
  };

  return (
    // if postId then add classname
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles["upvote-svg"]} ${postId && styles["upvote-svg--active"]}
    }`}
      onClick={() => handleUpvoteClick()}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z"></path>
      </g>
    </svg>
  );
};

export default Upvote;
