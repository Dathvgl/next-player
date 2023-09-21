import { mangaTypes } from "../page";
import MangaList from "./components/manga-list";

export function generateStaticParams() {
  return mangaTypes.map((item) => ({ type: item.type }));
}

export default function Page({ params }: { params: { type: string } }) {
  const { type } = params;

  return (
    <>
      <MangaList type={type} />
    </>
  );
}
