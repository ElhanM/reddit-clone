// PLUGINS IMPORTS //
import { useSelector } from "react-redux";
import { EntityId } from "@reduxjs/toolkit";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./search-community.module.css";
import { RootState } from "app/store";
import { selectFilteredByName } from "features/slices/searchCommunitiesSlice";

/////////////////////////////////////////////////////////////////////////////
type SearchCommunityProps = {
  communityId: EntityId;
  name: string;
};

const SearchCommunity = ({ communityId, name }: SearchCommunityProps) => {
  const community = useSelector((state: RootState) => selectFilteredByName(name).selectSearchCommunitiesById(state, communityId));

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
