import districts from "@/shared/data/korea_districts.json";

export interface Location {
  id: string;
  name: string;
  fullAddress: string;
}

export function searchLocations(query: string): Location[] {
  if (!query) return [];

  const q = query.toLowerCase();
  const results: Location[] = [];

  for (const item of districts as string[]) {
    const parts = item.split("-");
    const address = parts.join(" ");

    if (item.toLowerCase().includes(q) || address.toLowerCase().includes(q)) {
      results.push({
        id: item,
        name: parts[parts.length - 1],
        fullAddress: address,
      });
    }

    if (results.length >= 20) break;
  }

  return results;
}
