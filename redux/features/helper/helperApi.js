import { api } from "../../api/api";

const helperApi = api.injectEndpoints({
  endpoints: (builder) => ({
    generateAiMessage: builder.mutation({
      query: ({ data = {} }) => ({
        url: `/helpers/generate-message`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const { useGenerateAiMessageMutation } = helperApi;
