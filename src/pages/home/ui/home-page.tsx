import { Layout } from "@/shared/ui/layout";
import { SearchLocation } from "@/features/search-location";
import { CurrentWeather } from "@/widgets/current-weather";
import { FavoritesList } from "@/widgets/favorites-list";

export function HomePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <SearchLocation />
        <CurrentWeather />
        <FavoritesList />
      </div>
    </Layout>
  );
}
