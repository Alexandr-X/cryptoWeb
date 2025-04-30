import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}
export const arrOfPinCrptSlice = createSlice({
  name: "userData",
  initialState: "[]",
  reducers: {
    changeArrOfPinCrpt: (state, action: { payload: { arr: string } }) => {
      return (state = action.payload.arr);
    },
  },
});

export const { changeArrOfPinCrpt } = arrOfPinCrptSlice.actions;

export default arrOfPinCrptSlice.reducer;
