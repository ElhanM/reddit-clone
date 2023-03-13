// PLUGINS IMPORTS //
import type { EntityId, Dictionary } from "@reduxjs/toolkit";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import type { IPostInfo, IPaginatedGetPosts, IPostsForUser, ICreatePost, IGetPostResponse } from "types/features";
import { apiSlice } from "../api/apiSlice";
import { RootState, useAppSelector } from "app/store";

/////////////////////////////////////////////////////////////////////////////

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

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // we are getting a response of type IPaginatedGetPosts but we are transforming that response when normalizing state
    // so this is the new return type of the query
    // pagination:
    // https://stackoverflow.com/questions/72530121/rtk-query-infinite-scrolling-retaining-existing-data
    getPosts: builder.query<
      {
        info: IPostInfo;
        ids: EntityId[];
        entities: Dictionary<IPostsForUser>;
      },
      // pass number of pages
      number
    >({
      query: pageNumber => {
        return {
          // allow httpOnly cookies to be sent
          credentials: "include",
          method: "GET",
          url: `posts/get-posts?page=${pageNumber}`,
        };
      },
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      transformResponse: (rawResult: IPaginatedGetPosts) => {
        // transforme response gets called on every request
        // set initial state to rawResult.postsForUser and also set info from initialState to rawResult.info
        return postsAdapter.setAll({ ...initialState, info: rawResult.info }, rawResult.postsForUser);
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        /* 
        The transformResponse function is used to initialize the state of the data in the Redux store. The first time it is called, it sets the state to rawResult.postsForUser and
        also sets the information from initialState to rawResult.info. The subsequent calls to transformResponse do not overwrite the state, but instead transform the response and
        pass the transformed response to the merge function.

        The merge function then adds the new items (in the form of a normalized state object with ids and entities) to the current cache by calling postsAdapter.upsertMany, which
        updates the existing state with the new items without overwriting the existing state. This allows the cache to be updated with new data without losing the existing data.
        */
        // merge gets called on every request after the first one
        // newItems are normalized state object with ids & entities (they get normalized in transformResponse)
        // add them to state
        return postsAdapter.upsertMany(currentCache, newItems.entities);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      // result is object of entities ids and info
      // entities is an object with keys of ids and values of posts
      // we need to turn it into an array of posts
      providesTags: result =>
        result
          ? [
              ...Object.values(result.entities).map(post => ({ type: "Post" as const, postId: post.postId, userId: post.User.userId })),
              { type: "Post", postId: "LIST", userId: "LIST" },
            ]
          : [{ type: "Post", postId: "LIST", userId: "LIST" }],
    }),
    // from stack overflow: https://stackoverflow.com/questions/68647833/redux-rtk-query-invalidating-only-single-element-from-list
    // Can we invalidate only single element from a list
    // No. RTK-Query is a document cache (full response = document), not a normalized cache

    createPost: builder.mutation<IPostsForUser, ICreatePost>({
      query: ({ title, description, communityId }) => {
        return {
          // allow httpOnly cookies to be sent
          credentials: "include",
          method: "POST",
          url: "posts/create-post",
          body: { title, description, communityId },
        };
      },
      invalidatesTags: [{ type: "Post" }],
    }),
    //*-------------------------------------------------------------*//
    // i have a seperate route for getting a single post
    // this way I reduce the amount of data that I need to fetch on inital render
    // on top of that, if I were to rely on the getPosts query for displaying a single post, I would not work unless user accesses a post from the home page
    // if user navigates straight to a post using the url, the getPosts query would not be called and the post would not be displayed
    // unless I were to call the getPosts query in app.tsx, but that would decrease performance of initial render of other pages
    getPost: builder.query<IPostsForUser, string>({
      query: postId => {
        return {
          credentials: "include",
          method: "GET",
          url: `posts/post/${postId}`,
        };
      },
      transformResponse: (rawResult: IGetPostResponse) => {
        // the default behavior of queries is to keep on trying to fetch the data until they get a 200 response
        // to avoid this, I will return errors with 200 response but handle them here
        if (!rawResult.success) {
          throw new Error(rawResult.msg);
        }
        return rawResult.data;
      },
      providesTags: result => [{ type: "Post", postId: result.postId, userId: result.User.userId }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostsQuery, useCreatePostMutation, useGetPostQuery } = extendedApiSlice;

// returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select(null);

// Creates memoized selector
const selectPostsData = createSelector(
  selectPostsResult,
  postsResult => {
    return postsResult.data;
  }, // normalized state object with ids & entities
);
// select info from state
export const selectPostsInfo = createSelector(selectPostsResult, postsResult => postsResult.data?.info);
// select

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => selectPostsData(state) ?? initialState);

export const selectCommunityIdByPostId = (postId: string) => {
  const selectGetPostResult = extendedApiSlice.endpoints.getPost.select(postId);

  // we return the function, and then get the id using useAppSelector
  return createSelector(selectGetPostResult, postData => postData.data?.Community.communityId);
};
