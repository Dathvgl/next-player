"use client";

import { useEffect, useState } from "react";
import { useAuth } from "~/contexts/auth-context";
import { externalApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";

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

      const data = await handleFetch<PersonType>(
        `${externalApi.user}/firebaseUser/${uid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data) setData(data);
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

          const data = await handleFetch<PersonType>(
            `${externalApi.user}/firebaseUser/${item}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (data) list.push(data);
        }

        setData(list);
      }
    }

    init();
  }, [uids.sort().toString(), authContext]);

  if (!authContext) return;
  return data;
}
