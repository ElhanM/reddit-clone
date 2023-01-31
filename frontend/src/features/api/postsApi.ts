import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Todo create global variable for this
const BASE_URL = "http://localhost:5000/api/posts";

export const postsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: builder => ({}),
  reducerPath: "postsApi",
  tagTypes: ["Post"],
});
