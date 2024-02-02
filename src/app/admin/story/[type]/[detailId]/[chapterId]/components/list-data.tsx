"use client";

import { ArrowDownCircle, ArrowUpCircle, X } from "lucide-react";
import { Fragment, useState } from "react";
import { CustomImage } from "~/components/custom-image/custom-image";
import { cn } from "~/lib/utils";
import { MangaChapterImage, MangaType } from "~/types/manga";
import ImageInput from "./image-input";
import { nanoid } from "nanoid";
import ImageDisplay from "./image-display";
import { Button } from "~/components/ui/button";
import { putMangaAdminChapterImage } from "~/services/manga-service";

type MoreType = {
  id: string;
  type: "up" | "down";
  index: number;
  position: number;
  file: File;
};

type ListDataProps = {
  type: MangaType;
  detailId: string;
  chapterId: string;
  data: MangaChapterImage[];
};

export default function ListData({
  type,
  detailId,
  chapterId,
  data,
}: ListDataProps) {
  const [list, setList] = useState(data);
  const [more, setMore] = useState<MoreType[]>([]);

  function onIndex(type: "up" | "down", index: number) {
    const position = type == "up" ? index - 1 : index + 1;
    if (position < 0 || position >= list.length) return;
    const array = structuredClone(list);
    [array[index], array[position]] = [array[position], array[index]];
    setList(array);
  }

  function onFile(type: "up" | "down", index: number, file?: File) {
    if (!file) return;

    const orders = ["up", "down"];
    const array = structuredClone(more);

    const lastIndex = array.findLastIndex(
      (item) => item.index == index && item.type == type
    );

    const position = lastIndex == -1 ? 1 : array[lastIndex].position + 1;

    const obj: MoreType = { id: nanoid(), type, index, position, file };
    array.splice(lastIndex == -1 ? 0 : lastIndex + 1, 0, obj);

    array.sort((a, b) => {
      const sortIndex = a.index - b.index;
      const sortType = orders.indexOf(a.type) - orders.indexOf(b.type);
      return sortIndex || sortType;
    });

    setMore(array);
  }

  async function onSubmit() {
    const formData = new FormData();

    formData.append("type", type);

    more.forEach(({ index }) => {
      formData.append("alts", `${index}`);
    });

    list.map(({ _id }) => {
      formData.append("orders", _id);
    });

    more.forEach(({ file }) => {
      formData.append("files", file);
    });

    await putMangaAdminChapterImage({ detailId, chapterId, data: formData });
  }

  return (
    <section className="flex flex-col gap-2">
      <section className="text-right">
        <Button variant="ghost" onClick={onSubmit}>
          Cập nhật
        </Button>
      </section>
      <ul className="select-none">
        {list.map((item, index) => (
          <Fragment key={item._id}>
            {more
              .filter((item) => item.index == index && item.type == "up")
              .map((item) => (
                <li
                  key={item.id}
                  className="relative flex items-center justify-center"
                >
                  <ImageDisplay file={item.file} />
                  <div className="absolute transform top-1/2 -translate-y-1/2 right-0 flex items-center gap-2">
                    <button
                      className="rounded-full p-2 bg-red-600"
                      onClick={() => {
                        setMore(more.filter(({ id }) => id != item.id));
                      }}
                    >
                      <X />
                    </button>
                  </div>
                </li>
              ))}
            <li className="relative flex items-center justify-center">
              <CustomImage src={item.src} alt={item._id} />
              <div className="absolute transform top-1/2 -translate-y-1/2 right-0 flex items-center gap-2">
                <div className="flex flex-col gap-2">
                  <ImageInput
                    onChange={(value) => onFile("up", index, value)}
                  />
                  <ImageInput
                    onChange={(value) => onFile("down", index, value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    className={cn(
                      "rounded-full p-2",
                      index == 0 ? "bg-green-600" : "bg-green-400"
                    )}
                    onClick={() => onIndex("up", index)}
                    disabled={index == 0}
                  >
                    <ArrowUpCircle />
                  </button>
                  <button
                    className="rounded-full p-2 bg-red-600"
                    onClick={() => {
                      setList(list.filter(({ _id }) => _id != item._id));
                    }}
                  >
                    <X />
                  </button>
                  <button
                    className={cn(
                      "rounded-full p-2",
                      index == list.length - 1 ? "bg-green-600" : "bg-green-400"
                    )}
                    onClick={() => onIndex("down", index)}
                    disabled={index == list.length - 1}
                  >
                    <ArrowDownCircle />
                  </button>
                </div>
              </div>
            </li>
            {more
              .filter((item) => item.index == index && item.type == "down")
              .map((item) => (
                <li
                  key={item.id}
                  className="relative flex items-center justify-center"
                >
                  <ImageDisplay file={item.file} />
                  <div className="absolute transform top-1/2 -translate-y-1/2 right-0 flex items-center gap-2">
                    <button
                      className="rounded-full p-2 bg-red-600"
                      onClick={() => {
                        setMore(more.filter(({ id }) => id != item.id));
                      }}
                    >
                      <X />
                    </button>
                  </div>
                </li>
              ))}
          </Fragment>
        ))}
      </ul>
    </section>
  );
}
