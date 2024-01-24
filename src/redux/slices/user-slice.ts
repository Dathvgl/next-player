import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "~/types/user";

type UserType = User | null;

type UserState = {
  user: UserType;
};

const initialState: UserState = { user: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInitial(state, action: PayloadAction<UserType>) {
      state.user = action.payload;
    },
  },
});

export const { userInitial } = userSlice.actions;
