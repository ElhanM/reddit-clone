// PLUGINS IMPORTS //
import { createSelector } from "@reduxjs/toolkit";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { apiSlice } from "../api/apiSlice";
import type { RootState } from "app/store";
import { IExtendedUserAuth, IUserAuth, IUserBody } from "types/features";
import { setUser } from "./userSlice";

/////////////////////////////////////////////////////////////////////////////

// create extendedApiSlice with login endpoint that takes email and password as arguments and returns IUserAuth
// url is auth/login

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<IUserAuth, null>({
      query() {
        return {
          url: "users/get-me",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: { user: IUserAuth } }) => result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    // in order to have a user state which holds the user data, I needed to create a new userSlice
    // since unlike in my postsSlice where I can get user data from the getPosts query, I can't get user data from the login mutation, and also
    // user data depends on multiple endpoints
    login: builder.mutation<IUserAuth, IUserBody>({
      query: ({ email, password }) => {
        return {
          method: "POST",
          // we need to include credentials in order to be able to even set the cookie on the backend
          credentials: "include",
          url: "auth/login",
          body: { email, password },
          // i don't ever need to invalidate an auth request
          // but I will still provide "Auth" as a tag
          // this way, I can easily filter and identify requests related to authentication
          tags: ["Auth"],
        };
      },
      transformResponse: (rawResult: IExtendedUserAuth) => {
        return rawResult.user;
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          // add cookie on successful login
          // resolve queryFulfilled promise
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation } = extendedApiSlice;
