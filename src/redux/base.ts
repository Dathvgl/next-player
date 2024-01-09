import type { BaseQueryApi } from "@reduxjs/toolkit/query";
import { RootState } from "./store";

type GetState = Pick<
  BaseQueryApi,
  "getState" | "extra" | "endpoint" | "type" | "forced"
>;

export function prepareHeadersCustom(headers: Headers, { getState }: GetState) {
  // const roles = (getState() as RootState).personnelSlice.user?.roles;

  // if (roles) {
  //   headers.set("roles", roles.join("|"));
  // }

  return headers;
}
