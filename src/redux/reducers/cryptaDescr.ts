import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}
export const cryptaDescr = createSlice({
  name: "userData",
  initialState: {
    name: "",
    descr: "",
    logo: "",
    symbol: "",
    first_data_at: "",
  },
  reducers: {
    descrpUpd(
      state,
      action: {
        payload: {
          name: string;
          descr: string;
          logo: string;
          symbol: string;
          first_data_at: string;
        };
      }
    ) {
      state.descr = action.payload.descr;
      state.name = action.payload.name;
      state.logo = action.payload.logo;
      state.symbol = action.payload.symbol;
      state.first_data_at = action.payload.first_data_at;
    },
  },
});

export const { descrpUpd } = cryptaDescr.actions;

export default cryptaDescr.reducer;
