import { externalApi } from "~/lib/api";
import handleFetch from "~/lib/fetch";
import { ZingMP3SongResponse } from "~/types/music/zingMP3/song";
import { ZingMP3Home } from "~/types/music/zingMP3/zingMP3";
import FourItemHome from "./components/four-item-home";
import RTChart from "./components/rt-chart";
import ZingMP3NewRelease from "./components/zing-mp3-new-release";
import ZingMP3Player from "./components/zing-mp3-player";
import ZingMP3Search from "./components/zing-mp3-search";

export async function generateMetadata({
  searchParams: { id },
}: {
  searchParams: { id?: string };
}) {
  if (!id) return { title: "Zing MP3" };

  const data = await handleFetch<ZingMP3SongResponse>(
    `${externalApi.musicZingMP3}/infoSong/${id}`
  );

  if (!data || data.err != 0) return { title: "Zing MP3" };
  return {
    title: `Zing MP3 - ${data.data.title}`,
    description: data.data.title,
  };
}

export default async function Page() {
  const data = await handleFetch<ZingMP3Home>(
    `${externalApi.musicZingMP3}/home`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!data) return <></>;
  const { items } = data.data;

  return (
    <>
      <div className="flex-1 min-h-0 p-8">
        <ZingMP3Search />
        <ZingMP3NewRelease
          data={items.find((item) => {
            return item?.sectionType == "new-release";
          })}
        />
        <FourItemHome
          data={items.find((item) => {
            return (
              item?.sectionId == "hEditorTheme2" &&
              item?.sectionType == "playlist"
            );
          })}
          row={1}
        />
        <FourItemHome
          data={items.find((item) => {
            return (
              item?.sectionId == "hEditorTheme" &&
              item?.sectionType == "playlist"
            );
          })}
          row={1}
        />
        <RTChart
          data={items.find((item) => {
            return item?.sectionId == "hZC" && item?.sectionType == "RTChart";
          })}
        />
        <FourItemHome
          data={items.find((item) => {
            return (
              item?.sectionId == "hArtistTheme" &&
              item?.sectionType == "playlist"
            );
          })}
          row={1}
        />
        <FourItemHome
          data={items.find((item) => {
            return item?.sectionId == "h100" && item?.sectionType == "playlist";
          })}
          row={1}
        />
        <FourItemHome
          data={items.find((item) => {
            return (
              item?.sectionId == "hAlbum" && item?.sectionType == "playlist"
            );
          })}
          row={1}
        />
      </div>
      <ZingMP3Player />
    </>
  );
}
