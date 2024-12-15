import { api } from "../../api/api";
import { setNotifications } from "./notificationSlice";

const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    myNotifications: builder.query({
      query: () => "/notifications/me",
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        const result = await queryFulfilled;
        if (result?.data?.data) {
          dispatch(setNotifications(result?.data?.data));
        }
      },
      providesTags: ["notifications", "users"],
    }),
  }),
});

export const { useMyNotificationsQuery } = notificationApi;
