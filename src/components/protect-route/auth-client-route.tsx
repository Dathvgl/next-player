"use client";

import { useAppSelector } from "~/redux/hook";
import { userSelector } from "~/redux/selectors/user-selector";
import { ChildReact } from "~/types/type";

export default function AuthClientRoute({ children }: ChildReact) {
  const user = useAppSelector(userSelector);
  if (!user) return null;
  else return children;
}
