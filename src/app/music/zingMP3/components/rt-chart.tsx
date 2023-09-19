"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomImage } from "~/components/custom-image";
import { compactNumber, strToHex } from "~/lib/convert";
import { ZingMP3RTChartSection } from "~/types/music/zingMP3/rtChart";
import { RechartsToolTip } from "~/types/type";

interface RTItem {
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
}

export default function RTChart(props: { data?: unknown | undefined }) {
  const { data } = props;
  if (!data) return <></>;
  const item = data as ZingMP3RTChartSection;
  const list: RTItem[] = item.items.slice(0, 3).map((x) => {
    const obj = item.chart.items[x.encodeId];
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
        <RTChartLine list={list} times={item.chart.times} />
      </div>
    </div>
  );
}

interface RTChartLineProps {
  list: RTItem[];
  times: {
    hour: string;
  }[];
}

function RTChartLine({ list, times }: RTChartLineProps) {
  const lines: { name: string; fill: string }[] = [];

  const data: { name: string; [key: string]: unknown }[] = times.map(
    ({ hour }) => ({ name: `${hour}:00` })
  );

  list.map((item) => {
    lines.push({ name: item.encodeId, fill: strToHex(item.encodeId) });
    item.chart.forEach((x, index) => {
      data[index][item.encodeId] = x.counter;
    });
  });

  return (
    <div className="w-full h-full flex items-center">
      <ResponsiveContainer width="99%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" className="[&_tspan]:fill-white" />
          <YAxis className="[&_tspan]:fill-white" axisLine={false} />
          <Tooltip
            content={(props) => <CustomTooltip {...props} list={list} />}
          />
          {lines.map((item) => {
            return (
              <Line
                key={item.name}
                type="monotone"
                dataKey={item.name}
                dot={<></>}
                strokeWidth={3}
                stroke={item.fill}
                fill={item.fill}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip(props: any) {
  const { active, payload, list } = props as RechartsToolTip<{
    [key: string]: number;
  }> & { list: RTItem[] };

  if (!active || !payload || !payload.length) {
    return <></>;
  }

  return (
    <div className="bg-black/50 dark:bg-white/50 font-bold p-1 rounded">
      {payload.map((item) => {
        const detail = list.find(({ encodeId }) => encodeId == item.name);
        if (!detail) return <></>;

        return (
          <div key={item.name} className="flex gap-2 px-2 py-1 w-64">
            <div className="w-10 h-10 rounded overflow-hidden">
              <CustomImage
                className="h-full"
                src={detail.thumbnail}
                alt={detail.title}
              />
            </div>
            <div className="flex flex-col flex-1">
              <p className="line-clamp-1">{detail.title}</p>
              <p>{compactNumber(item.value)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
