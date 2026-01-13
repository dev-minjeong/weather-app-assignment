import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../hooks/use-search-locations";
import { Search, X, MapPin } from "lucide-react";

export function SearchLocation() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const results = useSearch(query);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const select = (id: string) => {
    setQuery("");
    setOpen(false);
    navigate(`/detail/${encodeURIComponent(id)}`);
  };

  return (
    <div ref={ref} className="relative max-w-xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="지역 검색 (예: 서울, 강남구)"
          className="input pl-12 pr-10"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {open && query && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-lg border max-h-72 overflow-auto">
          {results.length > 0 ? (
            results.map((loc) => (
              <button
                key={loc.id}
                onClick={() => select(loc.id)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-amber-50 text-left"
              >
                <MapPin className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="font-medium">{loc.name}</p>
                  <p className="text-sm text-gray-400">{loc.fullAddress}</p>
                </div>
              </button>
            ))
          ) : (
            <p className="p-4 text-center text-gray-400">
              검색 결과가 없습니다
            </p>
          )}
        </div>
      )}
    </div>
  );
}
