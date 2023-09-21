"use client";

import Wave from "react-wavify";
import {
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import tinycolor from "tinycolor2";
import { useReadLocalStorage } from "usehooks-ts";
import { capitalize, strToHex } from "~/lib/convert";
import { RechartsToolTip, WebLinkType, WebStat } from "~/types/type";

export default function ChartStat() {
  const stat = useReadLocalStorage<WebStat>("web-stats");

  const data = Object.keys(stat?.stats ?? {}).map((key) => ({
    name: capitalize(key),
    value: stat?.stats[key as WebLinkType] ?? 0,
    fill: strToHex(key),
  }));

  return (
    <section className="flex max-md:flex-col items-center md:h-[250px] gap-8">
      <div className="relative flex-1 max-md:w-full max-md:h-[250px] md:h-full border rounded-md shadow-custom bg-gradient-to-r from-cyan-500 to-blue-500">
        <p className="absolute font-bold top-2 left-6 text-lg">
          Hoạt động lướt website
        </p>
        <ul className="absolute top-1/2 -translate-y-1/2 left-6">
          {data.map((item) => (
            <li key={item.name} className="flex items-center gap-2">
              <div
                style={{ backgroundColor: item.fill }}
                className="w-4 h-4 rounded"
              />
              <span className="font-bold">{item.name}</span>
            </li>
          ))}
          <li className="font-bold">Total: {stat?.total ?? 0}</li>
        </ul>
        <ResponsiveContainer width="99%" height="100%">
          <RadialBarChart
            innerRadius="30%"
            cx="60%"
            data={data}
            startAngle={180}
            endAngle={-180}
          >
            <RadialBar dataKey="value" background />
            <Tooltip content={CustomTooltip} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 md:h-full max-md:w-full max-md:h-[250px] [&>div]:h-full rounded overflow-hidden shadow-custom">
        <Wave
          fill="#f79902"
          paused={false}
          style={{ display: "flex" }}
          options={{
            height: 100,
            amplitude: 10,
            speed: 0.3,
            points: 5,
          }}
        />
      </div>
    </section>
  );
}

function CustomTooltip(props: any) {
  const { active, payload } = props as RechartsToolTip<{
    fill: string;
    name: string;
    value: number;
  }>;

  if (!active || !payload || !payload.length) {
    return <></>;
  }

  const data = payload[0].payload;

  return (
    <div
      style={{ color: data.fill }}
      className="bg-black/50 dark:bg-white/50 font-bold p-1 rounded"
    >
      <p
        style={{
          backgroundColor: tinycolor(data.fill).isDark() ? "white" : "black",
        }}
        className="px-2 py-1"
      >
        {data.name}: {data.value}
      </p>
    </div>
  );
}
