"use client";

import { Droplet, GaugeCircle, Wind } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { CustomImage } from "~/components/custom-image";
import LIcon from "~/components/lucide-icon";
import useGeolocation from "~/hooks/geolocation";
import useWeather, { WeatherIcon } from "~/hooks/weather";
import { capitalize } from "~/lib/convert";

export default function DailyWork() {
  return (
    <div className="flex-1 flex flex-col max-md:w-full items-center gap-4 p-2 border shadow-custom rounded bg-gradient-to-b from-cyan-300 to-blue-300 dark:from-cyan-600 dark:to-blue-600">
      <TimeWork />
      <WeatherWork />
    </div>
  );
}

function TimeWork() {
  const [state, setState] = useState(new Date());
  const time = moment(state).format("ddd h:mm:ss a");

  useEffect(() => {
    const interval = setInterval(() => setState(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return <div className="text-lg font-bold">{time}</div>;
}

function WeatherWork() {
  const geolocation = useGeolocation();
  const weather = useWeather({ coords: geolocation.coords });

  if (!weather) return <></>;

  return (
    <div className="flex items-center justify-center max-md:gap-28 max-lg:gap-10 gap-28">
      <div className="flex flex-col">
        <div>{weather.sys.country}</div>
        <div>{capitalize(weather.weather[0].description)}</div>
        <div className="flex items-center">
          <CustomImage
            className="w-16 h-16"
            src={WeatherIcon(weather.weather[0].icon)}
            alt={weather.weather[0].description}
          />
          <div className="text-3xl font-bold">
            {weather.main.temp}
            <sup>O</sup>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <LIcon icon={Wind} /> {weather.wind.speed}kph
        </div>
        <div className="flex gap-4">
          <LIcon icon={Droplet} /> {weather.main.humidity}%
        </div>
        <div className="flex gap-4">
          <LIcon icon={GaugeCircle} /> {weather.main.pressure}hPa
        </div>
      </div>
    </div>
  );
}
