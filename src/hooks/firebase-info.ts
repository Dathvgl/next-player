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
    async function init() {
      const token = await authContext?.idToken();
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/firebaseUser/${uid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ).then(async (res) => {
        setData(await res.json());
      });
    }

    init();
  }, [uid, authContext]);

  if (!authContext) return;
  return data;
}

export function useFirebaseInfos(uids: string[], list?: PersonType[]) {
  const authContext = useAuth();
  const [data, setData] = useState<PersonType[]>();

  useEffect(() => {
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

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/firebaseUser/${item}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          list.push(await res.json());
        }

        setData(list);
      }
    }

    try {
      init();
    } catch (error) {
      console.error(error);
    }
  }, [uids.sort().toString(), authContext]);

  if (!authContext) return;
  return data;
}
