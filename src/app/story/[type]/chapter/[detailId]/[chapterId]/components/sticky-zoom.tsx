"use client";

import { ZoomIn, ZoomOut } from "lucide-react";
import LIcon from "~/components/lucide-icon";
import { Button } from "~/components/ui/button";
import { useAppDispatch } from "~/redux/hook";
import { mangaZoom } from "~/redux/slices/manga-slice";

export default function StickyZoom() {
  const dispatch = useAppDispatch();

  return (
    <div className="max-md:hidden">
      <Button
        className="rounded-3xl"
        variant="outline"
        size="icon"
        onClick={() => dispatch(mangaZoom("plus"))}
      >
        <LIcon icon={ZoomIn} />
      </Button>
      <Button
        className="rounded-3xl"
        variant="outline"
        size="icon"
        onClick={() => dispatch(mangaZoom("minus"))}
      >
        <LIcon icon={ZoomOut} />
      </Button>
    </div>
  );
}
