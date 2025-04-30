import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/userDataSlice";
import boughtsCrpt from "./reducers/arrOfBoughts.reducer";
import pinArr from "./reducers/arrOfPinCrpt.reducer";

export const store = configureStore({
  reducer: {
    userDataStore: user,
    arrOfBoughts: boughtsCrpt,
    arrOfPinCrpt: pinArr,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
