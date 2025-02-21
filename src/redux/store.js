import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";
import estimationReducer from "./slices/estimationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    estimation: estimationReducer,
  },
});

export default store;
