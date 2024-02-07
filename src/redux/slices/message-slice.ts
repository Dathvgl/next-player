import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserMessage } from "~/types/user";

type MessageState = {
  chatList: UserMessage[];
};

const initialState: MessageState = {
  chatList: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    messageChatList(state, action: PayloadAction<UserMessage[]>) {
      state.chatList = action.payload;
    },
  },
});

export const { messageChatList } = messageSlice.actions;
