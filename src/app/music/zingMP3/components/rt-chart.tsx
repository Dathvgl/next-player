import { CustomImage } from "~/components/custom-image/custom-image";
import { strToHex } from "~/lib/convert";
import { ZingMP3RTChartSection } from "~/types/music/zingMP3/rtChart";
import RTChartItem from "./rt-chart-item";

export type RTItem = {
  encodeId: string;
  title: string;
  score: number;
  thumbnail: string;
  thumbnailM: string;
  chart: {
    time: number;
    hour: string;
    counter: number;
  }[];
};

export default function RTChart({ data }: { data?: ZingMP3RTChartSection }) {
  if (!data) return null;

  const list: RTItem[] = data.items.slice(0, 3).map((x) => {
    const obj = data.chart.items[x.encodeId];

    return {
      encodeId: x.encodeId,
      title: x.title,
      score: x.score,
      thumbnail: x.thumbnail,
      thumbnailM: x.thumbnailM,
      chart: obj,
    };
  });

  return (
    <div className="mt-9 flex max-md:flex-col gap-8 p-8 text-white bg-gradient-to-b from-cyan-500 to-blue-500 rounded-lg">
      <div className="w-80 max-md:w-full font-semibold">
        <div className="text-3xl">#zingchart</div>
        <br />
        <div className="flex flex-col gap-4">
          {list.map((item, index) => (
            <div
              key={index}
              className="w-full rounded-lg p-4 gap-4 bg-white bg-opacity-20 flex items-center"
            >
              <div className="flex items-center">
                <div
                  style={{ color: strToHex(item.encodeId) }}
                  className="px-4"
                >
                  #{index + 1}
                </div>
                <div className="w-12 h-12 rounded overflow-hidden">
                  <CustomImage
                    className="h-full"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                </div>
              </div>
              <div className="flex-1 line-clamp-2">{item.title}</div>
            </div>
          ))}
          <button className="border border-white rounded-3xl px-6 py-2 row-center">
            Xem thêm
          </button>
        </div>
      </div>
      <div className="flex-1">
        <RTChartLine list={list} times={data.chart.times} />
      </div>
    </div>
  );
}

type RTChartLineProps = {
  list: RTItem[];
  times: {
    hour: string;
  }[];
};

function RTChartLine({ list, times }: RTChartLineProps) {
  const lines: { name: string; fill: string }[] = [];

  const data: { name: string; [key: string]: unknown }[] = times.map(
    ({ hour }) => ({ name: `${hour}:00` })
  );

  list.forEach((item) => {
    lines.push({ name: item.encodeId, fill: strToHex(item.encodeId) });
    item.chart.forEach((x, index) => {
      data[index][item.encodeId] = x.counter;
    });
  });

  return (
    <div className="w-full h-full flex items-center">
      <RTChartItem data={data} list={list} lines={lines} />
    </div>
  );
}
