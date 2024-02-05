"use client";

import { useRouter } from "next/navigation";
import { useAppSelector } from "~/redux/hook";
import {
  musicZingMP3IdSelector,
  musicZingMP3ListSelector,
  musicZingMP3LoopSelector,
} from "~/redux/selectors/music-selector";
import { ChildReact } from "~/types/type";

export default function PlayerAudioButton({
  children,
  increment,
}: ChildReact & { increment: number }) {
  const router = useRouter();

  const id = useAppSelector(musicZingMP3IdSelector);
  const list = useAppSelector(musicZingMP3ListSelector);
  const loop = useAppSelector(musicZingMP3LoopSelector);

  function onClick() {
    if (loop == "one" || loop == "loop-one") return;
    const result = list.findIndex((item) => item == id);
    if (result < 0) return;

    const { length } = list;
    const url = new URL(location.href);

    if (loop == "all") {
      if (result + increment != length && result + increment != -1) {
        url.searchParams.set("id", list[result + 1]);
        router.push(url.href);
      }
    } else {
      if (result + increment == length) {
        url.searchParams.set("id", list[0]);
      } else if (result + increment == -1) {
        url.searchParams.set("id", list[length - 1]);
      } else {
        url.searchParams.set("id", list[result + 1]);
      }

      router.push(url.href);
    }
  }

  return <button onClick={onClick}>{children}</button>;
}
