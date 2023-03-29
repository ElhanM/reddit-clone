// PLUGINS IMPORTS //
import { useSelector } from "react-redux";
import { EntityId } from "@reduxjs/toolkit";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

// COMPONENTS IMPORTS //
import { CreateButton } from "components/atoms";
import { RSlash } from "components/molecules";

// EXTRA IMPORTS //
import styles from "./search-community.module.css";
import { RootState, useAppSelector } from "app/store";
import { selectFilteredByName } from "features/slices/searchCommunitiesSlice";
import { ETheme } from "types/theme";
import { useLeaveCommunityMutation, useJoinCommunityMutation } from "features/slices/communitySlice";

/////////////////////////////////////////////////////////////////////////////
type SearchCommunityProps = {
  communityId: EntityId;
  name: string;
};

const SearchCommunity = ({ communityId, name }: SearchCommunityProps) => {
  const community = useSelector((state: RootState) => selectFilteredByName(name).selectSearchCommunitiesById(state, communityId));

  const [leaveCommunity, { isLoading: isLoadingLeave, isError: isErrorLeave, error: errorLeave, isSuccess: isSuccessLeave }] =
    useLeaveCommunityMutation();
  const [joinCommunity, { isLoading: isLoadingJoin, isError: isErrorJoin, error: errorJoin, isSuccess: isSuccessJoin }] = useJoinCommunityMutation();

  const { user } = useAppSelector(state => state.userState);

  // for the inital load, we want to wait for both user and community to be fetched, and then want to check if user is in community.Users array
  // and use that to conditionally render the leave/join button
  const [showLeave, setShowLeave] = useState<"loading" | boolean>("loading");
  useEffect(() => {
    if (user.userId && community.communityId && showLeave === "loading") {
      setShowLeave(
        // if user.userId can be found in community.Users array, then setShowLeave to true
        !!community.Users.find(user => user.userId === user.userId),
      );
    }
  }, [community, user]);

  const handleLeaveCommunity = async () => {
    await leaveCommunity(communityId as string).unwrap();
    setShowLeave(false);
  };

  const handleJoinCommunity = async () => {
    await joinCommunity(communityId as string).unwrap();
    setShowLeave(true);
  };

  return (
    <section className={`${styles["search-community-wrapper"]}`}>
      <div>
        <RSlash medium />
      </div>
      <div>
        <header className={`${styles["header"]}`}>
          <Typography className={`${styles["community-name"]}`}>r/{community.name}</Typography>
          <div className={`${styles["members"]}`}>
            <p className={`${styles["p-count"]}`}>{community.Users.length}</p>
            <p className={`${styles["p-info"]}`}>Members</p>
          </div>
        </header>
        <p className={`${styles["p-welcome"]}`}>{community.description}</p>
      </div>
      <div className={`${styles["buttons"]}`}>
        {showLeave ? (
          <CreateButton
            theme={ETheme.DARK}
            buttonText="Leave"
            buttonProps={{
              fullWidth: true,
              onClick: handleLeaveCommunity,
              disabled: isLoadingLeave || showLeave === "loading",
            }}
          />
        ) : (
          <CreateButton
            theme={ETheme.DARK}
            buttonText="Join"
            buttonProps={{
              fullWidth: true,
              onClick: handleJoinCommunity,
              disabled: isLoadingJoin || showLeave === "loading",
            }}
          />
        )}
      </div>
    </section>
  );
};

export default SearchCommunity;
