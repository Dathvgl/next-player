"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CustomImage } from "~/components/custom-image/custom-image";
import { timeFromNow } from "~/lib/convert";
import { cn } from "~/lib/utils";
import { useAppSelector } from "~/redux/hook";
import { messageChatNotifySelector } from "~/redux/selectors/message-selector";
import { userUIDSelector } from "~/redux/selectors/user-selector";
import { postMessageRoom } from "~/services/message-service";
import { ChatMessageUser } from "~/types/message";
import { UserMessage } from "~/types/user";

type ListMessageDetailProps =
  | {
      extra?: false;
      data: UserMessage;
    }
  | {
      extra: true;
      data: ChatMessageUser;
    };

export default function ListMessageDetail({
  extra,
  data,
}: ListMessageDetailProps) {
  const router = useRouter();

  const uid = useAppSelector(userUIDSelector);
  const roomId = useSearchParams().get("room");

  async function onLink() {
    const result = await postMessageRoom({ uids: [uid, data.uid] });
    if (!result || roomId == result.messageRoomId) return;
    router.push(`/message?room=${result.messageRoomId}&uid=${data.uid}`);
  }

  if (!roomId) return null;

  return (
    <li
      className="flex cursor-pointer items-center rounded overflow-hidden p-2 gap-4 hover:bg-black/20 dark:hover:bg-white/20"
      onClick={onLink}
    >
      <CustomImage
        className="w-14 h-14 rounded-full overflow-hidden"
        src={data.thumnail}
        alt={data.name}
      />
      <div className={cn("flex-1", extra ? "" : "text-left")}>
        <b>{data.name}</b>
        {extra && <ListMessageDetailInfo roomId={roomId} data={data} />}
      </div>
    </li>
  );
}

type ListMessageDetailInfoProps = {
  roomId: string;
  data: ChatMessageUser;
};

function ListMessageDetailInfo({ roomId, data }: ListMessageDetailInfoProps) {
  const chatNotify = useAppSelector(messageChatNotifySelector);

  const message =
    chatNotify.find((item) => item.roomId == roomId)?.content ?? "...";

  return (
    <div className="flex justify-between items-center gap-2">
      <p className="flex-1 line-clamp-1">{message}</p>
      {data.status ? (
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
        </span>
      ) : (
        <i className="text-gray-500 dark:text-gray-400">
          {timeFromNow(data.lastOnline / 1000)}
        </i>
      )}
    </div>
  );
}
