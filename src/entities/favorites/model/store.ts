import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Favorite {
  id: string;
  name: string;
  customName?: string;
  fullAddress: string;
  lat: number;
  lon: number;
}

interface Store {
  favorites: Favorite[];
  addFavorite: (fav: Omit<Favorite, "customName">) => boolean;
  removeFavorite: (id: string) => void;
  updateName: (id: string, name: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavorites = create<Store>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (fav) => {
        const { favorites } = get();
        if (favorites.length >= 6 || favorites.find((f) => f.id === fav.id)) {
          return false;
        }
        set({ favorites: [...favorites, fav] });
        return true;
      },
      removeFavorite: (id) => {
        set((s) => ({ favorites: s.favorites.filter((f) => f.id !== id) }));
      },
      updateName: (id, customName) => {
        set((s) => ({
          favorites: s.favorites.map((f) =>
            f.id === id ? { ...f, customName } : f
          ),
        }));
      },
      isFavorite: (id) => !!get().favorites.find((f) => f.id === id),
    }),
    { name: "favorites" }
  )
);
