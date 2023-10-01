export interface ChatPeopleType {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  status: "online" | "offline";
  lastOnline: number;
}

export interface ChatNotifyType {
  messageId: string;
  seen: boolean;
  sender: string;
  content: string;
  timestamp: number;
}
