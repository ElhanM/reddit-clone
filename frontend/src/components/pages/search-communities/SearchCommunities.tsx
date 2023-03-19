// PLUGINS IMPORTS //
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// COMPONENTS IMPORTS //
import { PostsLoading, HandleError } from "components/templates";

// EXTRA IMPORTS //
import styles from "./search-communities.module.css";
import { useAppSelector } from "app/store";
import { selectSearchCommunitiesIds, selectSearchCommunitiesInfo, useSearchCommunitiesQuery } from "features/slices/searchCommunitiesSlice";

/////////////////////////////////////////////////////////////////////////////
type SearchCommunitiesProps = {};

const SearchCommunities = ({}: SearchCommunitiesProps) => {
  const [page, setPage] = useState(1);

  // select query params from the url
  const { search } = useLocation();
  // extract the name from the query params
  const name = new URLSearchParams(search).get("name");

  const { isLoading, isSuccess, isError, error, isFetching } = useSearchCommunitiesQuery({
    pageNumber: page,
    searchQuery: name,
  });

  const communitiesInfo = selectSearchCommunitiesInfo(useAppSelector(state => state));
  const communityIds = useSelector(selectSearchCommunitiesIds);

  useEffect(() => {
    console.log("pageeeee", { page });
    // communitiesInfo.pages
    console.log("pageeeee communitiesInfo.pages", { communitiesInfo });
  }, [page, communitiesInfo]);

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
            {communityIds.map(communityId => (
              // <SearchCommunities key={communityId} communityId={communityId} />
              <>
                {JSON.stringify(communityId)}
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </>
            ))}
            {isFetching && !isLoading && <PostsLoading />}
          </>
        )
      )}
    </main>
  );
};

export default SearchCommunities;
