import { PlayCircle } from "lucide-react";
import { CustomImage } from "~/components/custom-image";
import LIcon from "~/components/lucide-icon";
import { MotionDiv } from "~/lib/motion";
import { ZingMP3ArtistObject } from "~/types/music/zingMP3/artist";
import { ZingMP3PlaylistObject } from "~/types/music/zingMP3/playlist";

export default function FourItemHome(props: {
  data?: unknown | undefined;
  row?: number;
}) {
  const { data, row } = props;
  if (!data) return <></>;
  const item = data as { title: string; items: ZingMP3PlaylistObject[] };

  return (
    <div className="mt-9 flex flex-col gap-2">
      <div className="font-bold text-2xl">{item.title}</div>
      <div className="grid grid-cols-4 gap-4">
        {item.items
          ?.slice(0, 4 * (row ?? item.items.length))
          .map((child, index) => (
            <div key={index} className="flex flex-col gap-2">
              <MotionDiv
                className="relative group rounded-lg w-full aspect-square overflow-hidden"
                whileHover="hover"
              >
                <div className="absolute z-20 w-full h-full rounded-lg hidden group-hover:flex items-center gap-3 justify-center group-hover:bg-black group-hover:bg-opacity-30 text-7xl text-white text-opacity-50">
                  <LIcon icon={PlayCircle} size={75} />
                </div>
                <MotionDiv
                  variants={{
                    hover: { scale: 1.2, transition: { duration: 0.35 } },
                  }}
                >
                  <CustomImage src={child.thumbnailM} alt={child.encodeId} />
                </MotionDiv>
              </MotionDiv>
              {child?.uid != undefined ? (
                <FourItemExtend title={child.title} data={child.artists} />
              ) : (
                <div className="line-clamp-2">{child.sortDescription}</div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

function FourItemExtend(props: { title: string; data: any }) {
  const { title, data } = props;
  const item = data as ZingMP3ArtistObject[];

  return (
    <div className="flex flex-col gap-1">
      <div className="line-clamp-1 font-semibold">{title}</div>
      <div className="text-sm line-clamp-2">
        {item.map(({ name }) => name).join(", ")}
      </div>
    </div>
  );
}
