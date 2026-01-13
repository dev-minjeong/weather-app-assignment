import type { HourlyWeather } from "../api/weather-api";
import { WeatherIcon } from "@/shared/lib/weather-icons";

export function HourlyForecast({ data }: { data: HourlyWeather[] }) {
  return (
    <div className="card p-0 overflow-hidden">
      <div className="flex overflow-x-auto">
        {data.map((hour, i) => (
          <div
            key={i}
            className="flex flex-col items-center py-4 px-5 border-r border-amber-100 last:border-0"
          >
            <p className="text-sm text-gray-500">{hour.time}</p>
            <WeatherIcon
              code={hour.icon}
              className="w-8 h-8 text-orange-400 my-2"
            />
            <p className="font-medium">{hour.temp}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}
