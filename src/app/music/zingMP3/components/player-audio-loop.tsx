"use client";

import { Activity, LucideIcon, Repeat, Repeat1, Repeat2 } from "lucide-react";
import LIcon from "~/components/lucide-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { zingMP3Loop } from "~/redux/features/music-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hook";
import { ZingMP3Loop } from "~/types/music/zingMP3/zingMP3";

const loops: { name: string; value: ZingMP3Loop; icon: LucideIcon }[] = [
  { name: "Lặp tất cả", value: "loop-all", icon: Repeat },
  { name: "Lặp hiện tại", value: "loop-one", icon: Repeat1 },
  { name: "Phát tất cả", value: "all", icon: Repeat2 },
  { name: "Phát hiện tại", value: "one", icon: Activity },
];

export default function PlayerAudioLoop() {
  const loop = useAppSelector((state) => state.music.zingMP3.loop);
  const dispatch = useAppDispatch();

  function onSelect(selected: ZingMP3Loop) {
    dispatch(zingMP3Loop(selected));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <LIcon
            icon={
              loop == "loop-all"
                ? Repeat
                : loop == "loop-one"
                ? Repeat1
                : loop == "all"
                ? Repeat2
                : Activity
            }
            button
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {loops.map((item) => (
          <DropdownMenuItem
            key={item.value}
            className="flex gap-4"
            onClick={() => onSelect(item.value)}
          >
            <LIcon icon={item.icon} />
            <span>{item.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
