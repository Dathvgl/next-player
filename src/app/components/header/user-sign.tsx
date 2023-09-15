"use client";

import { useAuth } from "~/contexts/auth-context";
import UserSignOff from "./user-sign-off";
import UserSignOn from "./user-sign-on";

export default function UserSign() {
  const authContext = useAuth();
  if (!authContext) return <></>;

  const { user, handleSignOut, ...rest } = authContext;
  if (!authContext.user) return <UserSignOff {...rest} />;

  return <UserSignOn user={user!} handleSignOut={handleSignOut} />;
}
