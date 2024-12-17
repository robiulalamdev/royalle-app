/* eslint-disable no-unused-vars */

import { api } from "../../api/api";
import { setChats } from "./conversationSlice";

const conversationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: ({ data }) => ({
        url: `/chats/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["chats"],
    }),

    sendMessage: builder.mutation({
      query: ({ data }) => ({
        url: `/messages/create`,
        method: "POST",
        body: data,
      }),
    }),

    removeChatById: builder.mutation({
      query: ({ data, id }) => ({
        url: `/chats/${id}`,
        method: "DELETE",
        body: data,
      }),
      // invalidatesTags: ["chats", "messages"],
    }),

    myChats: builder.query({
      query: () => `/chats/me`,
      providesTags: ["chats"],
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        const result = await queryFulfilled;
        if (result?.data?.data) {
          dispatch(setChats(result?.data?.data));
        }
      },
    }),

    unseenToSeen: builder.mutation({
      query: ({ data = {}, chatId }) => ({
        url: `/messages/unseen-to-seen/${chatId}`,
        method: "PATCH",
        body: data,
      }),
    }),

    getMessageByChatId: builder.query({
      query: (chatId) => `/messages/${chatId}`,
      providesTags: ["messages"],
    }),

    getChatById: builder.query({
      query: (chatId = "") => `/chats/${chatId}`,
      providesTags: ["messages", "chats"],
    }),
  }),
});

export const {
  useCreateChatMutation,
  useSendMessageMutation,
  useMyChatsQuery,
  useGetMessageByChatIdQuery,

  // get
  useGetChatByIdQuery,

  // Patch
  useUnseenToSeenMutation,

  // DELETE
  useRemoveChatByIdMutation,
} = conversationApi;
