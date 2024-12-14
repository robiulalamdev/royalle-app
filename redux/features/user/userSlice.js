import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  feeds: [],
  bestMatches: [],
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
    setBestMatches: (state, action) => {
      state.bestMatches = action.payload;
    },
  },
});

export const { setUser, setFeeds, setBestMatches } = userSlice.actions;

export default userSlice.reducer;
