import { useNavigate } from "react-router-dom";
import { useWeatherByLocation } from "@/features/weather/hooks/use-weather-by-location";
import { useFavorites } from "@/entities/favorites/model/store";
import { WeatherCard } from "@/entities/weather/ui/weather-card";
import { HourlyForecast } from "@/entities/weather/ui/hourly-forecast";
import { ArrowLeft, Star, StarOff, MapPin } from "lucide-react";

export function WeatherDetail({ locationId }: { locationId: string }) {
  const navigate = useNavigate();
  const { data, location, isLoading, error } = useWeatherByLocation(locationId);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const isFav = isFavorite(locationId);
  const canAdd = favorites.length < 6;

  const toggleFav = () => {
    if (isFav) {
      removeFavorite(locationId);
    } else if (canAdd && location) {
      addFavorite({
        id: locationId,
        name: location.name,
        fullAddress: location.fullAddress,
        lat: location.lat,
        lon: location.lon,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 w-48 bg-amber-100 rounded" />
        <div className="card h-48 bg-amber-100" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500">
          <ArrowLeft className="w-5 h-5" /> 뒤로
        </button>
        <div className="card text-center py-12 text-gray-500">
          해당 장소의 정보가 제공되지 않습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-amber-50 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-500" />
            <h1 className="text-xl font-bold">{location?.name}</h1>
          </div>
        </div>
        <button
          onClick={toggleFav}
          disabled={!isFav && !canAdd}
          className={`p-2 rounded-lg ${isFav ? "bg-amber-100 text-amber-600" : "hover:bg-amber-50 text-gray-400"}`}
        >
          {isFav ? <Star className="w-6 h-6 fill-current" /> : <StarOff className="w-6 h-6" />}
        </button>
      </div>

      {location && <p className="text-gray-400 text-sm ml-12">{location.fullAddress}</p>}

      <WeatherCard weather={data.current} showDetail />
      {data.hourly.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-semibold">시간대별</h2>
          <HourlyForecast data={data.hourly} />
        </div>
      )}
    </div>
  );
}
