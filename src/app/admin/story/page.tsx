"use client";

import { useEffect, useState } from "react";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { externalApi } from "~/lib/api";
import { capitalize } from "~/lib/convert";
import handleFetch from "~/lib/fetch";
import { MangaDetailAdmin, MangaListAdmin, MangaType } from "~/types/manga";
import MangaDetail from "./components/manga-detail";
import MangaForm from "./components/manga-form";
import { ScrollArea } from "~/components/ui/scroll-area";

const mangaTypes: MangaType[] = ["blogtruyen", "nettruyen"];

export default function Page() {
  const [mangaType, setMangaType] = useState<MangaType>("nettruyen");
  const [mangaData, setMangaData] = useState<Omit<MangaListAdmin, "data">>();
  const [mangas, setMangas] = useState<MangaDetailAdmin[]>([]);

  useEffect(() => {
    async function init() {
      const data = await handleFetch<MangaListAdmin>(
        `${externalApi.manga}/list?type=${mangaType}&sort=desc&order=lastest&admin=true`,
        { next: { revalidate: 3600 } }
      );

      if (data) {
        const { data: mangas, ...rest } = data;
        setMangas(data.data);

        setMangaData(rest);
      } else setMangaData(data);
    }

    init();
  }, [mangaType]);

  return (
    <section className="flex flex-col gap-4">
      <section className="flex p-4 gap-4 rounded-lg border border-solid border-black dark:border-white">
        <div className="py-2">
          <RadioGroup
            className="flex flex-col gap-4"
            value={mangaType}
            onValueChange={(value) => setMangaType(value as MangaType)}
          >
            {mangaTypes.map((item, index) => (
              <div key={item} className="flex items-center space-x-2">
                <RadioGroupItem value={item} id={index.toString()} />
                <Label htmlFor={index.toString()}>{capitalize(item)}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <MangaForm type={mangaType} />
      </section>
      <section>
        <ScrollArea className="h-[300px]">
          <ul className="flex flex-col gap-8">
            {mangas.map((item) => (
              <li key={item._id}>
                <MangaDetail manga={item} />
              </li>
            ))}
          </ul>
        </ScrollArea>
      </section>
    </section>
  );
}
