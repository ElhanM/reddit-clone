// PLUGINS IMPORTS //
import type { EntityId, Dictionary } from "@reduxjs/toolkit";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import type { IPostInfo, IPaginatedGetPosts, ISearchCommunity, IPaginatedSearchCommunities } from "types/features";
import { apiSlice } from "../api/apiSlice";
import { RootState, useAppSelector } from "app/store";

/////////////////////////////////////////////////////////////////////////////

const searchCommunitiesAdapter = createEntityAdapter({
  selectId: community => community.communityId,
  sortComparer: (a: ISearchCommunity, b: ISearchCommunity) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = searchCommunitiesAdapter.getInitialState({
  info: {
    currentPage: 0,
    numberOfPosts: 0,
    pageSize: 0,
    pages: 0,
    next: null,
    previous: null,
  },
});

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    searchCommunities: builder.query<
      {
        info: IPostInfo;
        ids: EntityId[];
        entities: Dictionary<ISearchCommunity>;
      },
      {
        pageNumber: number;
        searchQuery?: string;
      }
    >({
      query: ({ pageNumber, searchQuery }) => {
        return {
          credentials: "include",
          method: "GET",
          url: `communities/search-communities?page=${pageNumber}&name=${searchQuery}`,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      transformResponse: (rawResult: IPaginatedSearchCommunities) => {
        return searchCommunitiesAdapter.setAll({ ...initialState, info: rawResult.info }, rawResult.communities);
      },
      merge: (currentCache, newItems) => {
        return searchCommunitiesAdapter.upsertMany(currentCache, newItems.entities);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: result =>
        result
          ? [
              ...Object.values(result.entities).map(community => ({
                type: "SearchCommunities" as const,
                communityId: community.communityId,
              })),
              { type: "SearchCommunities", communityId: "LIST" },
            ]
          : [{ type: "SearchCommunities", communityId: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useSearchCommunitiesQuery } = extendedApiSlice;

// returns the query result object
export const selectSearchCommunitiesResult = extendedApiSlice.endpoints.searchCommunities.select(null);
export const selectSearchCommunitiesInfo = createSelector(
  selectSearchCommunitiesResult,
  searchCommunitiesResult => searchCommunitiesResult.data?.info,
);

// Creates memoized selector
const selectSearchCommunitiesData = createSelector(
  selectSearchCommunitiesResult,
  searchCommunitiesResult => {
    return searchCommunitiesResult.data;
  }, // normalized state object with ids & entities
);

export const {
  selectAll: selectAllSearchCommunities,
  selectById: selectSearchCommunitiesById,
  selectIds: selectSearchCommunitiesIds,
} = searchCommunitiesAdapter.getSelectors((state: RootState) => selectSearchCommunitiesData(state) ?? initialState);
