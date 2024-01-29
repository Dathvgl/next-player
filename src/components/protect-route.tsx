"use client";

import { redirect } from "next/navigation";
import { useUpdateEffect } from "usehooks-ts";
import { useAppSelector } from "~/redux/hook";
import { userRolesSelector } from "~/redux/selectors/user-selector";
import { ChildReact } from "~/types/type";

export function AuthProtect({
  children,
  filter,
}: ChildReact & { filter?: string[] }) {
  const roles = useAppSelector(userRolesSelector);

  useUpdateEffect(() => {
    if (!roles) {
      redirect("/");
    }
  }, [JSON.stringify(roles)]);

  if (!roles) {
    return null;
  } else return <>{children}</>;
}
