import { useEffect, useState } from "react";
import { CurrentWeatherData } from "~/types/weather";

interface UseWeatherProps {
  coords: {
    lat: number;
    lon: number;
  };
}

export default function useWeather(props: UseWeatherProps) {
  const { coords } = props;
  
  const [data, setData] = useState<CurrentWeatherData>();
  
  useEffect(() => {
    async function init() {
      const link = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
      const res = await fetch(link);
      const data = await res.json();
      setData(data);
    }

    init();
  }, [coords.lat, coords.lon]);

  return data;
}

export function WeatherIcon(icon: string) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
