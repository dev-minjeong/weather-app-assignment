import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useFavorites, type Favorite } from "../model/store";
import { getWeather } from "@/entities/weather/api/weather-api";
import { WeatherIcon } from "@/shared/lib/weather-icons";
import { Trash2, Edit2, Check, X } from "lucide-react";

export function FavoriteCard({ item }: { item: Favorite }) {
  const navigate = useNavigate();
  const { removeFavorite, updateName } = useFavorites();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(item.customName || item.name);

  const { data, isLoading } = useQuery({
    queryKey: ["weather", "fav", item.id],
    queryFn: () => getWeather(item.lat, item.lon),
  });

  return (
    <div
      onClick={() =>
        !editing && navigate(`/detail/${encodeURIComponent(item.id)}`)
      }
      className="card cursor-pointer hover:scale-[1.02] transition-transform group"
    >
      <div className="flex justify-between mb-3">
        {editing ? (
          <div
            className="flex gap-2 flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-2 py-1 border rounded text-sm"
              autoFocus
            />
            <button
              onClick={() => {
                updateName(item.id, name);
                setEditing(false);
              }}
            >
              <Check className="w-4 h-4 text-green-500" />
            </button>
            <button onClick={() => setEditing(false)}>
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ) : (
          <>
            <div>
              <h3 className="font-semibold">{item.customName || item.name}</h3>
              <p className="text-xs text-gray-400">{item.fullAddress}</p>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditing(true);
                }}
                className="p-1"
              >
                <Edit2 className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(item.id);
                }}
                className="p-1"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </>
        )}
      </div>

      {isLoading ? (
        <div className="h-12 bg-amber-100 rounded animate-pulse" />
      ) : data ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <WeatherIcon
              code={data.current.icon}
              className="w-10 h-10 text-orange-400"
            />
            <span className="text-2xl font-bold">{data.current.temp}°</span>
          </div>
          <div className="text-sm text-right">
            <p className="text-orange-500">↑{data.current.tempMax}°</p>
            <p className="text-sky-500">↓{data.current.tempMin}°</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
