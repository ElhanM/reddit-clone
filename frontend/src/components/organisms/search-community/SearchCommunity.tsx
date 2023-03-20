// PLUGINS IMPORTS //
import { useSelector } from "react-redux";
import { EntityId } from "@reduxjs/toolkit";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./search-community.module.css";
import { RootState } from "app/store";
import { selectSearchCommunitiesById } from "features/slices/searchCommunitiesSlice";

/////////////////////////////////////////////////////////////////////////////
type SearchCommunityProps = {
  communityId: EntityId;
};

const SearchCommunity = ({ communityId }: SearchCommunityProps) => {
  const community = useSelector((state: RootState) => selectSearchCommunitiesById(state, communityId));

  return (
    <div>
      {JSON.stringify(community)}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default SearchCommunity;
