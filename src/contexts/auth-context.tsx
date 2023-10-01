"use client";

import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  onceRealtime,
  setStore,
  updateRealTime,
  updateStore,
  writeRealTime,
} from "~/firebase/firebase";
import { timestampNow } from "~/lib/convert";
import { ChildReact } from "~/types/type";

export interface AuthContextProps {
  user: User | null;
  idToken: () => Promise<string | undefined>;
  googleSignIn: () => Promise<void>;
  handleSignOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider = ({ children }: ChildReact) => {
  const [user, setUser] = useState<User | null>(null);

  const handleSign = async (status: "online" | "offline") => {
    if (user) {
      const obj: Record<string, any> = { status };

      if (status == "offline") {
        obj.lastOnline = timestampNow();
      }

      await updateStore("users", user.uid, obj);
    }
  };

  const handleSignOut = async () => {
    await handleSign("offline");
    await signOut(auth);
  };

  const idToken = async () => {
    try {
      return user?.getIdToken();
    } catch (error) {
      console.error(error);
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await handleSign("online");

        const metadata = currentUser.metadata;
        if (metadata.creationTime == metadata.lastSignInTime) {
          await setStore("users", currentUser.uid, {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            status: "online",
            lastOnline: 0,
          });

          await setStore("chatFriends", currentUser.uid, {});
        }
      }
    });

    return () => {
      unsubscribe();
      handleSign("offline");
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, idToken, googleSignIn, handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
