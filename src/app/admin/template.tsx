"use client";

import { redirect } from "next/navigation";
import { useAppSelector } from "~/redux/hook";
import { userRolesSelector } from "~/redux/selectors/user-selector";
import { ChildReact } from "~/types/type";

export default function Template({ children }: ChildReact) {
  const roles = useAppSelector(userRolesSelector);
  if (!roles) redirect("/");
  return <div>{children}</div>;
}
