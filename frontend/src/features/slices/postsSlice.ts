import type { EntityId, Dictionary } from "@reduxjs/toolkit";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import type { IInfo, IPaginatedGetPosts, IPostsForUser } from "../../types";
// import { sub } from "date-fns";
import { postsApi } from "../api/postsApi";

const postsAdapter = createEntityAdapter({
  selectId: post => post.postId,
  sortComparer: (a: IPostsForUser, b: IPostsForUser) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = postsAdapter.getInitialState({
  info: {
    currentPage: 0,
    numberOfPosts: 0,
    pageSize: 0,
    pages: 0,
    next: null,
    previous: null,
  },
});

export const extendedApiSlice = postsApi.injectEndpoints({
  endpoints: builder => ({
    // we are getting a response of type IPaginatedGetPosts but we are transforming that response when normalizing state
    // so this is the new return type of the query
    getPosts: builder.query<
      {
        info: IInfo;
        ids: EntityId[];
        entities: Dictionary<IPostsForUser>;
      },
      void
    >({
      query: () => {
        return {
          // allow httpOnly cookies to be sent
          credentials: "include",
          method: "GET",
          url: "/get-posts",
        };
      },
      transformResponse: (rawResult: IPaginatedGetPosts) => {
        // set initial state to rawResult.postsForUser and also set info from initialState to rawResult.info
        return postsAdapter.setAll({ ...initialState, info: rawResult.info }, rawResult.postsForUser);
      },
      providesTags: result => {
        if (result) {
          // result is object of entities ids and info
          // entities is an object with keys of ids and values of posts
          // we need to turn it into an array of posts
          return [
            //! check if we are correctly providing tags
            // * I want to be able to invalidate this query using tags from different slices
            // * check will this do the trick
            ...Object.values(result.entities).map(post => ({ type: "Post" as const, postId: post.postId, userId: post.User.userId })),
            { type: "Post", postId: "LIST", userId: "LIST" },
          ];
        }
        return [{ type: "Post", postId: "LIST", userId: "LIST" }];
      },
    }),
  }),
});

export const { useGetPostsQuery } = extendedApiSlice;

// returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

// Creates memoized selector
const selectPostsData = createSelector(
  selectPostsResult,
  postsResult => postsResult.data, // normalized state object with ids & entities
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => selectPostsData(state) ?? initialState);
