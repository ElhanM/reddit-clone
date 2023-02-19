// PLUGINS IMPORTS //
import type { EntityId, Dictionary } from "@reduxjs/toolkit";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import type { ICommunity, IGetCommunities } from "types/features";
import { apiSlice } from "../api/apiSlice";
import type { RootState } from "app/store";

/////////////////////////////////////////////////////////////////////////////

const communityAdapter = createEntityAdapter({
  selectId: community => community.communityId,
  sortComparer: (a: ICommunity, b: ICommunity) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = communityAdapter.getInitialState({});

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUserCommunities: builder.query<
      {
        ids: EntityId[];
        entities: Dictionary<ICommunity>;
      },
      null
    >({
      query: () => {
        return {
          credentials: "include",
          method: "GET",
          url: "communities/get-user-communities",
        };
      },
      transformResponse: (rawResult: IGetCommunities) => {
        return communityAdapter.setAll({ ...initialState }, rawResult.communities);
      },
      providesTags: result =>
        result
          ? [
              ...Object.values(result.entities).map(community => ({
                type: "Community" as const,
                communityId: community.communityId,
              })),
              { type: "Community", postId: "LIST" },
            ]
          : [{ type: "Community", postId: "LIST" }],
    }),
  }),
});

export const { useGetUserCommunitiesQuery } = extendedApiSlice;

// returns the query result object
export const selectCommunityResult = extendedApiSlice.endpoints.getUserCommunities.select(null);

// Creates memoized selector
const selectCommunityData = createSelector(
  selectCommunityResult,
  communityResult => communityResult.data, // normalized state object with ids & entities
);

export const {
  selectAll: selectAllCommunities,
  selectById: selectCommunityById,
  selectIds: selectCommunityIds,
} = communityAdapter.getSelectors((state: RootState) => selectCommunityData(state) ?? initialState);
