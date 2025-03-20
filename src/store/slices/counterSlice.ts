import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: "noname",
    lastName: "noname",
    age: 0,
    isOnline: false,
  },
  reducers: {
    renameUser: (
      state,
      action: { payload: { firstName: string; lastName: string } }
    ) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    changeStatus: (state) => {
      state.isOnline = !state.isOnline;
    },
    setAge: (state, action: { payload: { age: number } }) => {
      state.age = action.payload.age;
    },
  },
});

export const { renameUser, changeStatus, setAge } = userSlice.actions;

export default userSlice.reducer;
