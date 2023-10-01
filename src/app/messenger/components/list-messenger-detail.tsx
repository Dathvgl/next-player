import Link from "next/link";
import { CustomImage } from "~/components/custom-image";
import { timeFromNow } from "~/lib/convert";
import { ChatPeopleType } from "~/types/messenger";

interface ListMessengerDetailProps {
  person: ChatPeopleType;
  currentUid: string | null;
}

export default function ListMessengerDetail({
  person,
  currentUid,
}: ListMessengerDetailProps) {
  const isFocused = currentUid == person.uid;

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
        src={person.photoURL ?? ""}
        alt={person.displayName ?? "Người lạ"}
      />
      <Link
        href={isFocused ? "" : `/messenger?uid=${person.uid}`}
        className="flex-1"
      >
        <b>{person.displayName}</b>
        <div className="flex justify-between gap-2">
          <p>Message</p>
          {person.status == "online" ? (
            <i className="text-green-500">Online</i>
          ) : (
            <i className="text-gray-500 dark:text-gray-400">
              {timeFromNow(person.lastOnline / 1000)}
            </i>
          )}
        </div>
      </Link>
    </li>
  );
}
