import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function reverseGeocode(
  lat: number,
  lon: number
): Promise<string> {
  if (!API_KEY) return "현재 위치";

  try {
    const res = await axios.get(
      "https://api.openweathermap.org/geo/1.0/reverse",
      {
        params: { lat, lon, limit: 1, appid: API_KEY },
      }
    );

    if (res.data?.[0]) {
      const loc = res.data[0];
      const name = loc.local_names?.ko || loc.name;
      return loc.state ? `${loc.state} ${name}` : name;
    }
    return "현재 위치";
  } catch {
    return "현재 위치";
  }
}
