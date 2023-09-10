import MangaList from "./components/manga-list";

export default function Page({ params }: { params: { type: string } }) {
  const { type } = params;

  return (
    <>
      <MangaList type={type} />
    </>
  );
}
