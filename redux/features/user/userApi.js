import { api } from "../../api/api";
import { setUser } from "./userSlice";

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    myInfo: builder.query({
      query: () => "/users/me",

      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        const result = await queryFulfilled;
        if (result?.data?.data) {
          dispatch(setUser(result?.data?.data));
        }
      },
      providesTags: ["users"],
    }),

    postLogin: builder.mutation({
      query: ({ data }) => ({
        url: `/users/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    createUser: builder.mutation({
      query: ({ data }) => ({
        url: `/users/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    checkEmailExist: builder.mutation({
      query: ({ data }) => ({
        url: `/users/check/email`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    updateUserInfo: builder.mutation({
      query: ({ data }) => ({
        url: `/users/update-info`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    updateUser: builder.mutation({
      query: ({ data }) => ({
        url: `/users/update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useMyInfoQuery,
  usePostLoginMutation,
  useCreateUserMutation,
  useCheckEmailExistMutation,
  useUpdateUserInfoMutation,
  useUpdateUserMutation,
} = usersApi;
