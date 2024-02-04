import { TableCell } from "~/components/ui/table";
import { compactNumber } from "~/lib/convert";
import { getMangaFollow } from "~/services/manga-service";
import { MangaType } from "~/types/manga";

type MangaFollowCeilProps = {
  id: string;
  type: MangaType;
  followed: number;
};

export default async function MangaFollowCeil({
  id,
  type,
  followed,
}: MangaFollowCeilProps) {
  const data = await getMangaFollow({ id, type });
  return <TableCell>{compactNumber(data?.followed ?? followed)}</TableCell>;
}
