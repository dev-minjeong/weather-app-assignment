import axios from "axios";
import districts from "@/shared/data/korea_districts.json";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// 시/도 → 영문명
const cityNames: Record<string, string> = {
  서울특별시: "Seoul",
  부산광역시: "Busan",
  대구광역시: "Daegu",
  인천광역시: "Incheon",
  광주광역시: "Gwangju",
  대전광역시: "Daejeon",
  울산광역시: "Ulsan",
  세종특별자치시: "Sejong",
  경기도: "Suwon", // 경기도는 수원으로
  강원도: "Chuncheon",
  강원특별자치도: "Chuncheon",
  충청북도: "Cheongju",
  충청남도: "Daejeon",
  전라북도: "Jeonju",
  전북특별자치도: "Jeonju",
  전라남도: "Mokpo",
  경상북도: "Daegu",
  경상남도: "Changwon",
  제주특별자치도: "Jeju",
};

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
  if (!API_KEY) return null;
  if (!(districts as string[]).includes(id)) return null;

  const parts = id.split("-");
  const city = parts[0];
  const query = cityNames[city] || city;

  try {
    const { data } = await axios.get(
      "https://api.openweathermap.org/geo/1.0/direct",
      { params: { q: `${query}, KR`, limit: 1, appid: API_KEY } }
    );

    if (!data?.[0]) return null;

    return {
      id,
      name: parts[parts.length - 1],
      fullAddress: parts.join(" "),
      lat: data[0].lat,
      lon: data[0].lon,
    };
  } catch {
    return null;
  }
}
