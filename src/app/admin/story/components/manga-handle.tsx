"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { capitalize } from "~/lib/convert";
import { MangaType } from "~/types/manga";

const mangaTypes: MangaType[] = ["blogtruyen", "nettruyen"];

export default function MangaHandle({ type }: { type: MangaType }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  function handlePage(type: MangaType) {
    params.set("type", type);
    router.replace(pathname + "?" + params.toString());
  }

  return (
    <div className="py-2">
      <RadioGroup
        className="flex flex-col gap-4"
        value={type}
        onValueChange={(value) => handlePage(value as MangaType)}
      >
        {mangaTypes.map((item, index) => (
          <div key={item} className="flex items-center space-x-2">
            <RadioGroupItem value={item} id={index.toString()} />
            <Label htmlFor={index.toString()}>{capitalize(item)}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
