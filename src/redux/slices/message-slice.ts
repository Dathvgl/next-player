import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatNotifyType } from "~/types/message";
import { UserMessage } from "~/types/user";

type MessageState = {
  chatList: UserMessage[];
  chatNotify: ChatNotifyType[];
};

const initialState: MessageState = {
  chatList: [],
  chatNotify: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    messageChatList(state, action: PayloadAction<UserMessage[]>) {
      state.chatList = action.payload;
    },
    messageChatNotify(state, action: PayloadAction<ChatNotifyType[]>) {
      state.chatNotify = action.payload;
    },
  },
});

export const { messageChatList, messageChatNotify } = messageSlice.actions;
