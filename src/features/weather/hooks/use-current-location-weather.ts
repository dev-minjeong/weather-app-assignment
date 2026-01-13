import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getWeather } from "@/entities/weather/api/weather-api";
import { reverseGeocode } from "@/entities/location/api/reverse-geocode";

// 기본 위치 (서울)
const DEFAULT_LOCATION = {
  lat: 37.5665,
  lon: 126.978,
  name: "서울특별시",
};

function getPosition(): Promise<{ lat: number; lon: number; name: string }> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      // 위치 지원 안하면 서울로
      resolve(DEFAULT_LOCATION);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const name = await reverseGeocode(lat, lon);
        resolve({ lat, lon, name });
      },
      () => {
        // 에러나면 서울로 fallback
        resolve(DEFAULT_LOCATION);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000, // 5초
        maximumAge: 600000,
      }
    );
  });
}

export function useCurrentWeather() {
  const [key, setKey] = useState(0);

  const location = useQuery({
    queryKey: ["location", key],
    queryFn: getPosition,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const weather = useQuery({
    queryKey: ["weather", location.data?.lat, location.data?.lon],
    queryFn: () => getWeather(location.data!.lat, location.data!.lon),
    enabled: !!location.data,
  });

  return {
    data: weather.data,
    locationName: location.data?.name,
    isLoading: location.isLoading || weather.isLoading,
    error: weather.error, // 위치 에러는 무시 (fallback으로 처리됨)
    refetch: () => setKey((k) => k + 1),
  };
}
