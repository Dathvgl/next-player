"use client";

import { useEffect, useState } from "react";
import { useAuth } from "~/contexts/auth-context";

interface PersonType {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
}

export function useFirebaseInfo(uid: string) {
  const authContext = useAuth();
  const [data, setData] = useState<PersonType>();

  useEffect(() => {
    try {
      init();
    } catch (error) {
      console.error(error);
    }
  }, [uid]);

  async function init() {
    const token = await authContext?.idToken();

    const res = await fetch(`api/user/firebaseUser/${uid}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setData(await res.json());
  }

  if (!authContext) return;
  return data;
}

export function useFirebaseInfos(uids: string[], list?: PersonType[]) {
  const authContext = useAuth();
  const [data, setData] = useState<PersonType[]>();

  useEffect(() => {
    try {
      init();
    } catch (error) {
      console.error(error);
    }
  }, [uids.sort().toString()]);

  async function init() {
    const list: PersonType[] = [];

    const filter = uids.filter((item) => {
      const result = list?.find(({ uid }) => uid == item);
      return result == undefined;
    });

    const length = filter.length;

    if (length != 0) {
      const token = await authContext?.idToken();
      for (let index = 0; index < length; index++) {
        const item = filter[index];

        const res = await fetch(`${location.origin}/api/user/firebaseUser/${item}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        list.push(await res.json());
      }

      setData(list);
    }
  }

  if (!authContext) return;
  return data;
}
