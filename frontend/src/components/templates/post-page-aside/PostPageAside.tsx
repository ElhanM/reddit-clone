// PLUGINS IMPORTS //
import { useParams } from "react-router-dom";

// COMPONENTS IMPORTS //
import PostsLoading from "../loading/PostsLoading";
import HandleError from "../error/HandleError";

// EXTRA IMPORTS //
import styles from "./post-page-aside.module.css";
import { selectCommunityIdByPostId } from "features/slices/postsSlice";
import { useAppSelector } from "app/store";
import { useGetCommunityQuery, useJoinCommunityMutation, useLeaveCommunityMutation } from "features/slices/communitySlice";
import { useEffect, useState } from "react";
import { PostPageAsideContent } from "components/organisms";

/////////////////////////////////////////////////////////////////////////////

type PostPageAsideProps = {};

const PostPageAside = (props: PostPageAsideProps) => {
  const { postId } = useParams<{ postId: string }>();

  const communityId = useAppSelector(selectCommunityIdByPostId(postId));

  const { isLoading, isSuccess, isError, error, data: community } = useGetCommunityQuery(communityId);
  const [leaveCommunity, { isLoading: isLoadingLeave, isError: isErrorLeave, error: errorLeave, isSuccess: isSuccessLeave }] =
    useLeaveCommunityMutation();
  const [joinCommunity, { isLoading: isLoadingJoin, isError: isErrorJoin, error: errorJoin, isSuccess: isSuccessJoin }] = useJoinCommunityMutation();

  const { user } = useAppSelector(state => state.userState);

  const [showLeave, setShowLeave] = useState(true);

  const handleLeaveCommunity = async () => {
    await leaveCommunity(communityId).unwrap();
    setShowLeave(false);
  };
  const handleJoinCommunity = async () => {
    await joinCommunity(communityId).unwrap();
    setShowLeave(true);
  };

  //  random number between 0 and community.Users.length
  const [online, setOnline] = useState(0);
  useEffect(() => {
    setOnline(Math.floor(Math.random() * community?.Users?.length));
  }, [isSuccess]);

  if (isLoading) {
    return <PostsLoading />;
    // do not show error until communityId is fetched
  } else if (isError && communityId) {
    return <HandleError error={error} />;
  } else if (isSuccess) {
    return (
      <PostPageAsideContent
        community={community}
        online={online}
        showLeave={showLeave}
        handleLeaveCommunity={handleLeaveCommunity}
        isLoadingLeave={isLoadingLeave}
        handleJoinCommunity={handleJoinCommunity}
        isLoadingJoin={isLoadingJoin}
      />
    );
  } else {
    // since we now have 2 conditions for error case, we also return PostsLoading in else, in case none of the above cases are hit
    return <PostsLoading />;
  }
};

export default PostPageAside;
