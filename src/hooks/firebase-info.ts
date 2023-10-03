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
