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
import { CustomImage } from "~/components/custom-image/custom-image";
import { compactNumber } from "~/lib/convert";
import { RechartsToolTip } from "~/types/type";
import { RTItem } from "./rt-chart";

type RTChartItemProps = {
  data: { [key: string]: unknown; name: string }[];
  list: RTItem[];
  lines: { name: string; fill: string }[];
};

export default function RTChartItem({ data, list, lines }: RTChartItemProps) {
  return (
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
  );
}

function CustomTooltip(props: any) {
  const { active, payload, list } = props as RechartsToolTip<{
    [key: string]: number;
  }> & { list: RTItem[] };

  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="bg-black/50 dark:bg-white/50 font-bold p-1 rounded">
      {payload.map((item) => {
        const detail = list.find(({ encodeId }) => encodeId == item.name);
        if (!detail) return null;

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
