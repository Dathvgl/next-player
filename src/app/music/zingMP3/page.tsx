import { Metadata } from "next";
import { externalApi } from "~/lib/api";
import { ZingMP3Home } from "~/types/music/zingMP3/zingMP3";
import FourItemHome from "./components/four-item-home";
import RTChart from "./components/rt-chart";
import ZingMP3NewRelease from "./components/zing-mp3-new-release";
import ZingMP3Player from "./components/zing-mp3-player";
import ZingMP3Search from "./components/zing-mp3-search";
import handleFetch from "~/lib/fetch";

export const metadata: Metadata = {
  title: "Zing MP3",
};

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