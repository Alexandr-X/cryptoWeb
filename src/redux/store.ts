import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/userDataSlice";

export const store = configureStore({
  reducer: {
    userDataStore: user,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
