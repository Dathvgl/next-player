"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CustomImage } from "~/components/custom-image";
import { useAuth } from "~/contexts/auth-context";
import { timeFromNow } from "~/lib/convert";

interface PeopleType {
  uid: string;
  status: "online" | "offline";
  lastTimeOnline: number;
}

interface PersonType {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
}

interface ListMessengerDetailProps {
  person: PeopleType;
  currentUid: string | null;
}

export default function ListMessengerDetail({
  person,
  currentUid,
}: ListMessengerDetailProps) {
  const authContext = useAuth();
  const [data, setData] = useState<PersonType>();

  useEffect(() => {
    try {
      init();
    } catch (error) {
      console.error(error);
    }
  }, [person.uid]);

  async function init() {
    const token = await authContext?.idToken();

    const res = await fetch(`api/user/firebaseUser/${person.uid}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setData(await res.json());
  }

  if (!data) return <></>;

  const isFocused = currentUid == data.uid;

  return (
    <li
      className={`flex items-center rounded overflow-hidden p-2 gap-4 ${
        isFocused
          ? "bg-black/20 dark:bg-white/20"
          : "hover:bg-black/20 dark:hover:bg-white/20"
      }`}
    >
      <CustomImage
        className="w-14 h-14 rounded-full overflow-hidden"
        src={data?.photoURL ?? ""}
        alt={data?.displayName ?? "Người lạ"}
      />
      <Link
        href={isFocused ? "" : `/messenger?uid=${data.uid}`}
        className="flex-1"
      >
        <b>{data?.displayName}</b>
        <div className="flex justify-between gap-2">
          <p>Message</p>
          <i className="text-gray-500 dark:text-gray-400">
            {timeFromNow(person.lastTimeOnline / 1000)}
          </i>
        </div>
      </Link>
    </li>
  );
}
