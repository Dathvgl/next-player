"use client";

import { useEffect, useState } from "react";
import { CustomImage } from "~/components/custom-image";
import useGridBreak from "~/hooks/grid-break";
import { MotionLi, MotionUl } from "~/lib/motion";
import { MangaChapterDetail } from "~/types/manga";
import BodyHandle from "./body-handle";
import StickySelect from "./sticky-select";

interface BodyPageProps {
  type: string;
  mangaId: string;
  chapterId: string;
  data: MangaChapterDetail;
}

export default function BodyPage(props: BodyPageProps) {
  const { type, mangaId, chapterId, data } = props;
  const { current, ...rest } = data;

  const gridBreak = useGridBreak(["xs", "lg", "xl"]);
  const [zoom, setZoom] = useState(50);

  useEffect(() => {
    if (gridBreak == "sm") {
      setZoom(100);
    } else {
      setZoom(50);
    }
  }, [gridBreak]);

  function onZoom(str: "plus" | "minus") {
    if (str == "plus") {
      if (zoom + 5 <= 100) {
        setZoom(zoom + 5);
      }
    } else {
      if (zoom - 5 > 0) {
        setZoom(zoom - 5);
      }
    }
  }

  return (
    <article className="select-none">
      <BodyHandle {...props} />
      <StickySelect
        {...rest}
        id={mangaId}
        type={type}
        currentId={chapterId}
        onZoom={onZoom}
      />
      <section className="w-full flex justify-center">
        <MotionUl animate={{ width: `${zoom}%` }}>
          {data.current?.chapters.map((item) => (
            <MotionLi
              key={item._id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <CustomImage src={item.src} alt={item.chapterIndex} />
            </MotionLi>
          ))}
        </MotionUl>
      </section>
    </article>
  );
}
