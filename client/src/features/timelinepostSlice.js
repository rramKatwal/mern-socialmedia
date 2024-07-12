import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const timelineostSlice = createSlice({
  name: "timelinePosts",
  initialState,
  reducers: {
    addTimelinePosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    updateTimelinePosts: (state, action) => {
      state.posts = [action.payload.post, ...state.posts];
    },
  },
});

export const { addTimelinePosts, updateTimelinePosts } =
  timelineostSlice.actions;
export const timelineReducer = timelineostSlice.reducer;
