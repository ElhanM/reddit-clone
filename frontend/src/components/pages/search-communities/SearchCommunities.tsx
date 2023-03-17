// PLUGINS IMPORTS //

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import styles from "./search-communities.module.css";

/////////////////////////////////////////////////////////////////////////////
type SearchCommunitiesProps = {};

const SearchCommunities = ({}: SearchCommunitiesProps) => {
  // select query params from the url
  const { search } = useLocation();
  // extract the name from the query params
  const name = new URLSearchParams(search).get("name");

  useEffect(() => {
    return () => {
      
    };
  }, []);

  return <main className={styles["search-communities-wrapper"]}>SearchCommunities</main>;
};

export default SearchCommunities;
