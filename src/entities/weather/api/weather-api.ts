import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export interface Weather {
  temp: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  description: string;
  icon: string;
  windSpeed: number;
  feelsLike: number;
}

export interface HourlyWeather {
  time: string;
  temp: number;
  icon: string;
}

export interface WeatherData {
  current: Weather;
  hourly: HourlyWeather[];
}

interface ForecastItem {
  dt: number;
  main: { temp: number };
  weather: { icon: string }[];
}

export async function getWeather(
  lat: number,
  lon: number
): Promise<WeatherData> {
  if (!API_KEY) throw new Error("API 키가 없습니다");

  const [weather, forecast] = await Promise.all([
    axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: { lat, lon, appid: API_KEY, units: "metric", lang: "kr" },
    }),
    axios.get("https://api.openweathermap.org/data/2.5/forecast", {
      params: { lat, lon, appid: API_KEY, units: "metric", lang: "kr", cnt: 8 },
    }),
  ]);

  const w = weather.data;
  return {
    current: {
      temp: Math.round(w.main.temp),
      tempMin: Math.round(w.main.temp_min),
      tempMax: Math.round(w.main.temp_max),
      humidity: w.main.humidity,
      description: w.weather[0].description,
      icon: w.weather[0].icon,
      windSpeed: w.wind.speed,
      feelsLike: Math.round(w.main.feels_like),
    },
    hourly: forecast.data.list.map((item: ForecastItem) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      temp: Math.round(item.main.temp),
      icon: item.weather[0].icon,
    })),
  };
}
