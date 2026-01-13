import { useQuery } from "@tanstack/react-query";
import { getWeather } from "@/entities/weather/api/weather-api";
import { getLocationById } from "@/entities/location/api/get-location";

export function useWeatherByLocation(locationId: string) {
  const query = useQuery({
    queryKey: ["weather", "detail", locationId],
    queryFn: async () => {
      const loc = await getLocationById(locationId);
      if (!loc) throw new Error("위치 없음");
      const weather = await getWeather(loc.lat, loc.lon);
      return { location: loc, weather };
    },
  });

  return {
    data: query.data?.weather,
    location: query.data?.location,
    isLoading: query.isLoading,
    error: query.error,
  };
}
