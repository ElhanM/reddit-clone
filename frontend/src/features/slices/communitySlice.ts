// PLUGINS IMPORTS //
import type { EntityId, Dictionary } from "@reduxjs/toolkit";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import type { ICommunity, ICommunityPostReq, ICommunityRes, IGetCommunities, IGetCommunity } from "types/features";
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
    // I have a PostPage with ViewPost and PostPageAside components
    // i called getPost in ViewPost page
    // so, in order to access the post data in PostPageAside (get the communityId of the community the post is posted in)
    // I needed to create a seperate selector for it in the postsSlice
    // now that I have the communityId, I can use the getCommunity query to select the community data
    // I could have also used the data from the getPost query directly, but I need this query later on when making my search communities featuer
    // so I decided to create a seperate query for it now and use that
    // this way I also need to fetch less data about the community in the getPost query, so performance is better
    // as to why I did not use the getPosts query for all of this, the reason is stated in the postsSlice, under green line
    getCommunity: builder.query<ICommunityRes, string>({
      query: communityId => {
        return {
          credentials: "include",
          method: "GET",
          url: `communities/get-community/${communityId}`,
        };
      },
      transformResponse: (rawResult: IGetCommunity) => {
        // the default behavior of queries is to keep on trying to fetch the data until they get a 200 response
        // to avoid this, I will return errors with 200 response but handle them here
        if (!rawResult.success) {
          throw new Error(rawResult.msg);
        }
        return rawResult.community;
      },
      providesTags: result => [{ type: "Community", communityId: result.communityId }],
    }),
    joinCommunity: builder.mutation<ICommunityPostReq, string>({
      query: communityId => {
        return {
          credentials: "include",
          method: "POST",
          url: "communities/community/join",
          body: { communityId },
        };
      },
      invalidatesTags: [{ type: "Post" }],
    }),
    leaveCommunity: builder.mutation<ICommunityPostReq, string>({
      query: communityId => {
        return {
          credentials: "include",
          method: "POST",
          url: "communities/community/leave",
          body: { communityId },
        };
      },
      invalidatesTags: [{ type: "Post" }],
    }),
  }),
});

export const { useGetUserCommunitiesQuery, useGetCommunityQuery, useJoinCommunityMutation, useLeaveCommunityMutation } = extendedApiSlice;

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
