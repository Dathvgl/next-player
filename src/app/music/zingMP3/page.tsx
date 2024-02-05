import { Metadata } from "next";
import { BreakPoint } from "~/components/break-point";
import { getZingMP3Detail, getZingMP3Home } from "~/services/music-service";
import { ParamReact } from "~/types/type";
import FourItemHome from "./components/four-item-home";
import PlayerAudio from "./components/player-audio";
import PlayerInfo from "./components/player-info";
import PlayerLast from "./components/player-last";
import RTChart from "./components/rt-chart";
import ZingMP3NewRelease from "./components/zing-mp3-new-release";
import ZingMP3Player from "./components/zing-mp3-player";
import ZingMP3Search from "./components/zing-mp3-search";

export async function generateMetadata({
  searchParams: { id },
}: ParamReact): Promise<Metadata> {
  if (typeof id != "string") {
    return { title: "Zing MP3" };
  }

  const data = await getZingMP3Detail(id);

  if (!data || data.err != 0) {
    return { title: "Zing MP3" };
  }

  return {
    title: `Zing MP3 - ${data.data.title}`,
    description: data.data.title,
  };
}

export default async function Page() {
  const data = await getZingMP3Home();

  if (!data) return null;
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
      <ZingMP3Player>
        <div className="w-full px-4 py-2 absolute bottom-0 flex max-md:flex-col items-center md:h-24 max-md:h-40 md:gap-4 bg-white dark:bg-black z-[16]">
          <div className="flex max-md:gap-4 max-md:justify-between max-md:w-full lg:basis-1/4">
            <PlayerInfo />
            <BreakPoint base={["md"]} reverse>
              <PlayerLast />
            </BreakPoint>
          </div>
          <PlayerAudio />
          <BreakPoint base={["md"]}>
            <PlayerLast />
          </BreakPoint>
        </div>
      </ZingMP3Player>
    </>
  );
}
