import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "~/firebase/firebase";
import { userInitial } from "~/redux/slices/user-slice";
import { store } from "~/redux/store";
import {
  getUser,
  postAuthSignIn,
  postAuthSignOut,
} from "~/services/user-service";

export async function authGoogle() {
  const provider = new GoogleAuthProvider();

  const { user } = await signInWithPopup(auth, provider);
  const idToken = await user.getIdToken();

  await postAuthSignIn(idToken);
  const data = await getUser();

  store.dispatch(userInitial(data ?? null));
}

export async function authOut() {
  await postAuthSignOut();
  store.dispatch(userInitial(null));
}