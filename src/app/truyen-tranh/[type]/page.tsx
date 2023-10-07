import { capitalize } from "~/lib/convert";
import MangaList from "./components/manga-list";

interface PageProps {
  params: { type: string };
}

export function generateMetadata({ params: { type } }: PageProps) {
  return { title: capitalize(type) };
}

export default function Page({ params }: { params: { type: string } }) {
  const { type } = params;

  return (
    <>
      <MangaList type={type} />
    </>
  );
}
