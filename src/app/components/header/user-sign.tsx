"use client";

import { useAppSelector } from "~/redux/hook";
import { userSelector } from "~/redux/selectors/user-selector";
import UserSignOff from "./user-sign-off";
import UserSignOn from "./user-sign-on";

export default function UserSign() {
  const user = useAppSelector(userSelector);
  if (!user) return <UserSignOff />;
  else return <UserSignOn />;
}
