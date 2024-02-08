import { UserMessage } from "./user";

export type ChatPeopleType = {
  uid: string;
  status: boolean;
  lastOnline: number;
};

export type ChatNotifyType = {
  roomId: string;
  seen: boolean;
  sender: string;
  content: string;
  timestamp: number;
};

export type ChatMessageUser = ChatPeopleType & UserMessage;

export type MessageRoom = {
  uids: string[];
  type: "single" | "multiple";
  createdAt: number;
};
