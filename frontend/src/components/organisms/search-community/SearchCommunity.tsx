// PLUGINS IMPORTS //
import { useSelector } from "react-redux";
import { EntityId } from "@reduxjs/toolkit";
import { Typography } from "@mui/material";

// COMPONENTS IMPORTS //
import { CreateButton } from "components/atoms";
import { RSlash } from "components/molecules";

// EXTRA IMPORTS //
import styles from "./search-community.module.css";
import { RootState } from "app/store";
import { selectFilteredByName } from "features/slices/searchCommunitiesSlice";
import { ETheme } from "types/theme";

/////////////////////////////////////////////////////////////////////////////
type SearchCommunityProps = {
  communityId: EntityId;
  name: string;
};

const SearchCommunity = ({ communityId, name }: SearchCommunityProps) => {
  const community = useSelector((state: RootState) => selectFilteredByName(name).selectSearchCommunitiesById(state, communityId));

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
        <CreateButton
          theme={ETheme.DARK}
          buttonText="Join"
          buttonProps={{
            fullWidth: true,
          }}
        />
      </div>
    </section>
  );
};

export default SearchCommunity;
