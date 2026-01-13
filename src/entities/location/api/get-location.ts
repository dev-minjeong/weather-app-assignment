import axios from "axios";
import districts from "@/shared/data/korea_districts.json";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export interface LocationInfo {
  id: string;
  name: string;
  fullAddress: string;
  lat: number;
  lon: number;
}

export async function getLocationById(
  id: string
): Promise<LocationInfo | null> {
  if (!(districts as string[]).includes(id)) return null;

  const parts = id.split("-");
  const fullAddress = parts.join(" ");
  const name = parts[parts.length - 1];

  // geocoding api로 좌표 가져오기
  const coords = await getCoords(fullAddress);
  if (!coords) return null;

  return { id, name, fullAddress, ...coords };
}

async function getCoords(address: string) {
  if (!API_KEY) return null;

  try {
    const res = await axios.get(
      "https://api.openweathermap.org/geo/1.0/direct",
      {
        params: { q: `${address}, KR`, limit: 1, appid: API_KEY },
      }
    );

    if (res.data?.[0]) {
      return { lat: res.data[0].lat, lon: res.data[0].lon };
    }

    // 동 단위로 못찾으면 시/구로 재시도
    const parts = address.split(" ");
    if (parts.length > 2) {
      const res2 = await axios.get(
        "https://api.openweathermap.org/geo/1.0/direct",
        {
          params: {
            q: `${parts.slice(0, 2).join(" ")}, KR`,
            limit: 1,
            appid: API_KEY,
          },
        }
      );
      if (res2.data?.[0]) {
        return { lat: res2.data[0].lat, lon: res2.data[0].lon };
      }
    }
    return null;
  } catch {
    return null;
  }
}
