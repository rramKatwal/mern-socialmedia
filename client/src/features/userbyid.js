import { createSlice } from "@reduxjs/toolkit";

const userByIdSlice = createSlice({
  name: "UserById",
  initialState: { usersById: "" },
  reducers: {
    addUsers: (state, action) => {
      state.usersById = action.payload.usersById;
    },
    remove: (state, action) => {
      state.usersById = "";
    },
    updateFollowers: (state, action) => {
      if (state.usersById) {
        state.usersById = {
          ...state.usersById,
          followers: action.payload,
        };
      }
    },
    Followings: (state, action) => {
      if (state.usersById) {
        state.usersById = {
          ...state.usersById,
          following: action.payload,
        };
      }
    },
    updateCoverimg: (state, action) => {
      if (state.usersById) {
        state.usersById = {
          ...state.usersById,
          coverImg: action.payload,
        };
      }
    },
    updateprofileimg: (state, action) => {
      if (state.usersById) {
        state.usersById = {
          ...state.usersById,
          profileImg: action.payload,
        };
      }
    },
  },
});

export const {
  addUsers,
  remove,
  updateCoverimg,
  updateprofileimg,
  updateFollowers,
  Followings,
} = userByIdSlice.actions;
export const userByIdReducer = userByIdSlice.reducer;

const postByIdSlice = createSlice({
  name: "PostById",
  initialState: { posts: {} },
  reducers: {
    addPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
  },
});

export const { addPosts } = postByIdSlice.actions;
export const postByIdReducer = postByIdSlice.reducer;
