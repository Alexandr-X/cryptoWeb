import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}
export const arrOfBoughtSlice = createSlice({
  name: "userData",
  initialState: "[]",
  reducers: {
    changeArr: (state, action: { payload: { arr: string } }) => {
      return (state = action.payload.arr);
    },
  },
});

export const { changeArr } = arrOfBoughtSlice.actions;

export default arrOfBoughtSlice.reducer;
