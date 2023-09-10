import Link from "next/link";
import { CustomImage } from "~/components/custom-image";
import { ScrollArea } from "~/components/ui/scroll-area";
import { timeFromNow } from "~/lib/convert";

export default function ListMessenger() {
  return (
    <ScrollArea className="w-[25%] h-full">
      <ul className="p-2">
        {Array(5)
          .fill({
            uid: "unique",
            displayName: "fsfssfssfsfsfs",
            photoURL:
              "https://lh3.googleusercontent.com/a/ACg8ocLuNcpOVttPvUEXFVOgIbRw16UGELWJHuk44vtmvRMoMKlT=s288-c-no",
            message: "Hahaha",
            timestamp: 1694325710889,
          })
          .map((item) => (
            <li
              key={item.uid}
              className="flex items-center rounded overflow-hidden p-2 gap-4 hover:bg-black hover:bg-opacity-20"
            >
              <CustomImage
                className="w-14 h-14 rounded-full overflow-hidden"
                src={item.photoURL}
                alt={item.displayName}
              />
              <Link href="" className="flex-1">
                <b>{item.displayName}</b>
                <div className="flex justify-between gap-2">
                  <p>{item.message}</p>
                  <i className="text-gray-500 dark:text-gray-400">
                    {timeFromNow(item.timestamp / 1000)}
                  </i>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </ScrollArea>
  );
}
