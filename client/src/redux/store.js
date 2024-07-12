import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/authSlice";
import { timelineReducer } from "../features/timelinepostSlice";
import { postByIdReducer, userByIdReducer } from "../features/userbyid";

const store = configureStore({
  reducer: {
    auth: authReducer,
    timelinePost: timelineReducer,
    userById: userByIdReducer,
    postById: postByIdReducer,
  },
});

export default store;
