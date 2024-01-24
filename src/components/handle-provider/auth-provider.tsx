"use client";

import { useEffect } from "react";
import { useAppDispatch } from "~/redux/hook";
import { userInitial } from "~/redux/slices/user-slice";
import { getUser } from "~/services/user-service";

export default function AuthProvider() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function init() {
      const data = await getUser();
      dispatch(userInitial(data ?? null));
    }

    init();
  }, []);

  return null;
}
