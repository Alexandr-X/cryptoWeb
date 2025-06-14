import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}
export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    name: "",
    email: "",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAlg1-ZKpUt0a2506DkhjtkH8zHdDtnyUySA&s",
    wallet: 0,
  },
  reducers: {
    changeName: (state, action: { payload: { name: string } }) => {
      state.name = action.payload.name;
    },
    changeEmail: (state, action: { payload: { email: string } }) => {
      state.email = action.payload.email;
    },
    changeLogo: (state, action: { payload: { logo: string } }) => {
      state.logo = action.payload.logo;
    },
    changeWallet: (state, action: { payload: { wallet: number } }) => {
      state.wallet = action.payload.wallet;
    },
  },
});

export const { changeName, changeEmail, changeLogo, changeWallet } =
  userDataSlice.actions;

export default userDataSlice.reducer;
