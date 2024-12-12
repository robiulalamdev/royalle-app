import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  feeds: [],
};

const userSlice = createSlice({
  name: "user slice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFeeds: (state, action) => {
      state.feeds = action.payload;
    },
  },
});

export const { setUser, setFeeds } = userSlice.actions;

export default userSlice.reducer;
