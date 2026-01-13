import { useFavorites } from "@/entities/favorites/model/store";
import { FavoriteCard } from "@/entities/favorites/ui/favorite-card";
import { Star } from "lucide-react";

export function FavoritesList() {
  const { favorites } = useFavorites();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 text-amber-500" />
        <h2 className="font-semibold">즐겨찾기 ({favorites.length}/6)</h2>
      </div>

      {favorites.length === 0 ? (
        <div className="card text-center py-8 text-gray-400">
          즐겨찾기한 장소가 없습니다
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((fav) => (
            <FavoriteCard key={fav.id} item={fav} />
          ))}
        </div>
      )}
    </div>
  );
}
