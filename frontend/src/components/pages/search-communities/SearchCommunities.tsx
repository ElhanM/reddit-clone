// PLUGINS IMPORTS //
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// COMPONENTS IMPORTS //
import { PostsLoading, HandleError } from "components/templates";
import { selectSearchCommunitiesIds, selectSearchCommunitiesInfo, useSearchCommunitiesQuery } from "features/slices/searchCommunitiesSlice";
import { SearchCommunity } from "components/organisms";

// EXTRA IMPORTS //
import styles from "./search-communities.module.css";
import { useAppSelector } from "app/store";
import { apiSlice } from "features/api/apiSlice";

/////////////////////////////////////////////////////////////////////////////
type SearchCommunitiesProps = {};

const SearchCommunities = ({}: SearchCommunitiesProps) => {
  const [page, setPage] = useState(1);

  // select query params from the url
  const { search } = useLocation();
  // extract the name from the query params
  const name = new URLSearchParams(search).get("name");

  // refetch the query when the name changes,
  // reason: it is a pagianted query, when we change the name to search for a new community, it just adds the new communities to the end of the list
  // TODO: make different selectors for query with different name params
  const { isLoading, isSuccess, isError, error, isFetching, refetch } = useSearchCommunitiesQuery({
    pageNumber: page,
    searchQuery: name,
  });

  const dispatch = useDispatch();

  const communitiesInfo = selectSearchCommunitiesInfo(useAppSelector(state => state));
  const communityIds = useSelector(selectSearchCommunitiesIds);

  useEffect(() => {
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;

      if (!isFetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        if (page < communitiesInfo.pages) setPage(page + 1);
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching]);

  return (
    <main className={styles["search-communities-wrapper"]}>
      {isLoading ? (
        <PostsLoading searchCommunities />
      ) : isError ? (
        <HandleError error={error} />
      ) : (
        isSuccess && (
          <>
            {communityIds.length}
            <br />
            {JSON.stringify(communitiesInfo)}
            <br />
            <br />
            {communityIds.map(communityId => (
              <SearchCommunity key={communityId} communityId={communityId} />
            ))}
            {isFetching && !isLoading && <PostsLoading />}
          </>
        )
      )}
    </main>
  );
};

export default SearchCommunities;
