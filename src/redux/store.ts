import { configureStore } from "@reduxjs/toolkit";
import picture from "./reducers/userDataSlice";

export const store = configureStore({
  reducer: {
    avatarStore: picture,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
