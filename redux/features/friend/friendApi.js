import { api } from "../../api/api";

const friendApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sentFriendRequest: builder.mutation({
      query: ({ data = {}, id }) => ({
        url: `/friends/sent-request/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["friends"],
    }),

    cancelFriendRequest: builder.mutation({
      query: ({ data = {}, id }) => ({
        url: `/friends/cancel-request/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["friends"],
    }),

    rejectFriendRequest: builder.mutation({
      query: ({ data = {}, id }) => ({
        url: `/friends/request-rejected/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["friends"],
    }),

    acceptFriendRequest: builder.mutation({
      query: ({ data = {}, id }) => ({
        url: `/friends/request-accept/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["friends"],
    }),

    checkStatus: builder.mutation({
      query: ({ data = {}, id }) => ({
        url: `/friends/status/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["friends"],
    }),
  }),
});

export const {
  useSentFriendRequestMutation,
  useCancelFriendRequestMutation,
  useRejectFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useCheckStatusMutation,
} = friendApi;
