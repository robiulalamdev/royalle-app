// apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    // prepareHeaders: (headers) => {
    //   const token = `Bearer`;
    //   if (token) {
    //     headers.set("Authorization", token);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ["users"],
  endpoints: () => ({}),
});
