import type { Weather } from "../api/weather-api";
import { WeatherIcon } from "@/shared/lib/weather-icons";
import { Droplets, Wind, Thermometer } from "lucide-react";

interface Props {
  weather: Weather;
  showDetail?: boolean;
}

export function WeatherCard({ weather, showDetail }: Props) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-100 rounded-2xl">
            <WeatherIcon
              code={weather.icon}
              className="w-12 h-12 text-orange-500"
            />
          </div>
          <div>
            <p className="text-4xl font-bold">{weather.temp}°</p>
            <p className="text-gray-500">{weather.description}</p>
          </div>
        </div>
        <div className="text-right text-sm">
          <p className="text-orange-500">최고 {weather.tempMax}°</p>
          <p className="text-sky-500">최저 {weather.tempMin}°</p>
        </div>
      </div>

      {showDetail && (
        <div className="mt-6 pt-6 border-t border-amber-100 grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-orange-400" />
            <div>
              <p className="text-xs text-gray-400">체감</p>
              <p className="font-medium">{weather.feelsLike}°</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-sky-400" />
            <div>
              <p className="text-xs text-gray-400">습도</p>
              <p className="font-medium">{weather.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">풍속</p>
              <p className="font-medium">{weather.windSpeed}m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
