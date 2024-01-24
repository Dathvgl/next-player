import { RootState } from "../store";

export function userSelector(state: RootState) {
  return state.user.user;
}

export function userUIDSelector(state: RootState) {
  return state.user.user!.uid;
}
