import { externalApi } from "~/lib/api";
import { ZingMP3Home } from "~/types/music/zingMP3/zingMP3";
import FourItemHome from "./components/four-item-home";
import ZingMP3NewRelease from "./components/zing-mp3-new-release";
import ZingMP3Search from "./components/zing-mp3-search";
import ZingMP3Player from "./components/zing-mp3-player";
import RTChart from "./components/rt-chart";

export default async function Page() {
  const res = await fetch(`${externalApi.musicZingMP3}/home`);
  const data: ZingMP3Home = await res.json();
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
