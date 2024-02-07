import { RootState } from "../store";

export function messageChatListSelector(state: RootState) {
  return state.message.chatList;
}
