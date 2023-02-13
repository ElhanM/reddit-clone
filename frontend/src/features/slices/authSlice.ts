// PLUGINS IMPORTS //

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { apiSlice } from "../api/apiSlice";
import { IExtendedUserAuth, IReqInfo, IUserAuth, IUserBody } from "types/features";
import { setUser, logout } from "./userSlice";

/////////////////////////////////////////////////////////////////////////////

// create extendedApiSlice with login endpoint that takes email and password as arguments and returns IUserAuth
// url is auth/login

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // we need getMe to be a mutation/post request in order to be able to dispatch it once
    getMe: builder.mutation<IUserAuth, null>({
      query() {
        return {
          url: "/user/get-me",
          credentials: "include",
          method: "POST",
        };
      },
      transformResponse: (rawResult: IExtendedUserAuth) => {
        return rawResult.user;
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.log("getMe error:", { error });
        }
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
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          // add cookie on successful login
          // resolve queryFulfilled promise
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.log("login error:", { error });
        }
      },
    }),
    // we need logout to be a mutation/post request in order to be able to dispatch logout action
    logout: builder.mutation<IReqInfo, null>({
      query: () => {
        return {
          method: "POST",
          credentials: "include",
          url: "auth/logout",
          // i don't really need to invalidate Auth tags, since I am handling the logout logic seperately on the frontend
          // so I will have logout mutation also just provide "Auth" as a tag, cus it helps keep track of requests
          tags: ["Auth"],
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          console.log("LOGOUT AUTH SLICE");
          // "optimistic" logout, which will delete the cookie on the frontend before the backend request
          // that way the user gets redirected to the login page immediately, and also the navbar gets removed and routes updated
          dispatch(logout());
          await queryFulfilled;
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation, useGetMeMutation, useLogoutMutation } = extendedApiSlice;
