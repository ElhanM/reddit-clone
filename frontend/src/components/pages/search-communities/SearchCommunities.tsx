// PLUGINS IMPORTS //
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// COMPONENTS IMPORTS //
import { PostsLoading, HandleError } from "components/templates";
import { selectFilteredByName, selectSearchCommunitiesInfo, useSearchCommunitiesQuery } from "features/slices/searchCommunitiesSlice";
import { SearchCommunity } from "components/organisms";

// EXTRA IMPORTS //
import styles from "./search-communities.module.css";
import { useAppSelector } from "app/store";

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
  // do not reset the cache, leave all of the already fetched communities in the cache, just filter the communities on the front-end
  // i did the filtering in the SearchCommunitySlice directly
  const { isLoading, isSuccess, isError, error, isFetching, refetch } = useSearchCommunitiesQuery({
    pageNumber: page,
    searchQuery: name,
  });

  const communitiesInfo = selectSearchCommunitiesInfo(useAppSelector(state => state));
  const communityIds = useSelector(selectFilteredByName(name).selectSearchCommunitiesIds);

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
          <article>
            {communityIds.map(communityId => (
              <SearchCommunity key={communityId} communityId={communityId} name={name} />
            ))}
            {isFetching && !isLoading && <PostsLoading />}
          </article>
        )
      )}
    </main>
  );
};

export default SearchCommunities;
