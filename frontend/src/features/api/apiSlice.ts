// PLUGINS IMPORTS //
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/////////////////////////////////////////////////////////////////////////////

const BASE_URL = "http://localhost:5000/api/";

// https://stackoverflow.com/questions/69243083/rtk-query-invalidate-cache-of-an-api-service-from-another-api-service
// one API slice per base URL
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: builder => ({}),
  tagTypes: ["Post", "User", "Auth", "Community"],
});
