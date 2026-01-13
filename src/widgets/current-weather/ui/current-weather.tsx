import { useCurrentWeather } from "@/features/weather/hooks/use-current-location-weather";
import { WeatherCard } from "@/entities/weather/ui/weather-card";
import { HourlyForecast } from "@/entities/weather/ui/hourly-forecast";
import { MapPin, RefreshCw } from "lucide-react";

function getErrorMessage(error: Error | null) {
  const msg = String(error);
  if (msg.includes("DENIED")) return "위치 권한을 허용해주세요";
  if (msg.includes("UNAVAILABLE")) return "위치 정보를 사용할 수 없습니다";
  if (msg.includes("TIMEOUT"))
    return "위치 정보를 가져오는 데 시간이 너무 오래 걸립니다";
  return "날씨를 불러올 수 없습니다";
}

export function CurrentWeather() {
  const { data, locationName, isLoading, error, refetch } = useCurrentWeather();

  if (isLoading) {
    return (
      <div className="card animate-pulse">
        <div className="h-6 w-32 bg-amber-100 rounded mb-4" />
        <div className="h-32 bg-amber-100 rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="card text-center py-8">
        <p className="text-gray-500 mb-4">{getErrorMessage(error)}</p>
        <button onClick={refetch} className="btn-primary">
          <RefreshCw className="w-4 h-4 inline mr-2" />
          다시 시도
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amber-500" />
          <h2 className="font-semibold">{locationName}</h2>
        </div>
        <button onClick={refetch} className="p-2 hover:bg-amber-50 rounded-lg">
          <RefreshCw className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <WeatherCard weather={data.current} />
      {data.hourly.length > 0 && <HourlyForecast data={data.hourly} />}
    </div>
  );
}
