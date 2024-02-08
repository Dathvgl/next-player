import { RootState } from "../store";

export function messageChatListSelector(state: RootState) {
  return state.message.chatList;
}

export function messageChatNotifySelector(state: RootState) {
  return state.message.chatNotify;
}
