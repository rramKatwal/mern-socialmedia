import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "",
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", JSON.stringify(state.token));
    },
    removeUser: (state) => {
      state.user = "";
      state.token = "";
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    updatefollowing: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          following: action.payload,
        };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    followers: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          followers: action.payload,
        };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          profileImg: action.payload,
        };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    updateCover: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          coverImg: action.payload,
        };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const {
  addUser,
  removeUser,
  updatefollowing,
  updateProfile,
  updateCover,
  followers,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
