export type ChatPeopleType = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  status: "online" | "offline";
  lastOnline: number;
};

export type ChatNotifyType = {
  messageId: string;
  seen: boolean;
  sender: string;
  content: string;
  timestamp: number;
};
