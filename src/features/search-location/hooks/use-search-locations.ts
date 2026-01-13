import { useMemo } from "react";
import { searchLocations } from "@/entities/location/api/search-locations";

export function useSearch(query: string) {
  const results = useMemo(() => {
    return query.length > 0 ? searchLocations(query) : [];
  }, [query]);

  return results;
}
