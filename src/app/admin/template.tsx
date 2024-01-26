"use client";

import { redirect } from "next/navigation";
import { useUpdateEffect } from "usehooks-ts";
import { useAppSelector } from "~/redux/hook";
import { userRolesSelector } from "~/redux/selectors/user-selector";
import { ChildReact } from "~/types/type";

export default function Template({ children }: ChildReact) {
  const roles = useAppSelector(userRolesSelector);

  useUpdateEffect(() => {
    if (!roles) {
      redirect("/");
    }
  }, [roles]);

  if (!roles) return null;
  else return children;
}
