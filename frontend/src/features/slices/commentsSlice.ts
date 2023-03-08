// PLUGINS IMPORTS //
import type { EntityId, Dictionary } from "@reduxjs/toolkit";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { apiSlice } from "../api/apiSlice";
import type { RootState } from "app/store";
import IGetComments from "types/features/slices/comments/IGetComments";
import { IGetComment } from "types/features";

/////////////////////////////////////////////////////////////////////////////

const commentsAdapter = createEntityAdapter({
  selectId: comment => comment.commentId,
  sortComparer: (a: IGetComment, b: IGetComment) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = commentsAdapter.getInitialState({
  success: false,
  data: [],
});

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getComments: builder.query<
      {
        success: boolean;
        ids: EntityId[];
        entities: Dictionary<IGetComment>;
      },
      string
    >({
      query: postId => {
        return {
          credentials: "include",
          method: "GET",
          url: `comments/get-comments/${postId}`,
        };
      },
      // we need to implement same logic here as we did for the postsSlice getPosts pagination
      // because we are getting comments multiple times for multiple posts
      // without this "pagination" logic, our selectors don't work
      // serializeQueryArgs: ({ endpointName }) => {
      //   return endpointName;
      // },
      transformResponse: (rawResult: IGetComments) => {
        return commentsAdapter.setAll({ ...initialState, success: rawResult.success }, rawResult.data);
      },
      // merge: (currentCache, newItems) => {
      //   return commentsAdapter.upsertMany(currentCache, newItems.entities);
      // },
      // forceRefetch({ currentArg, previousArg }) {
      //   return currentArg !== previousArg;
      // },
      providesTags: result =>
        result
          ? [
              ...Object.values(result.entities).map(comment => ({
                type: "Comment" as const,
                commentId: comment.commentId,
                userId: comment.User.userId,
              })),
              { type: "Comment", commentId: "LIST", userId: "LIST" },
            ]
          : [{ type: "Comment", commentId: "LIST", userId: "LIST" }],
    }),
  }),
  // overrideExisting: false,
});

export const { useGetCommentsQuery } = extendedApiSlice;

// we need to keep in mind that there are multiple instances of the getComments query, because it gets called seperately for each post, with a new postId as a key
// so we need a way to pass a postId argument to the our selectors
// so that we can get the comments for that specific post
export const selectCommentsByPostId = (postId: string) => {
  const selectCommentsResult = extendedApiSlice.endpoints.getComments.select(postId);

  const selectCommentsData = createSelector(selectCommentsResult, commentsResult => commentsResult.data);

  const {
    selectAll: selectAllComments,
    selectById: selectCommentById,
    selectIds: selectCommentIds,
  } = commentsAdapter.getSelectors((state: RootState) => selectCommentsData(state) ?? initialState);

  return { selectAllComments, selectCommentById, selectCommentIds };
};
