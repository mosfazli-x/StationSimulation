import { useEffect } from "react";
import { useStationsStore } from "../store/useStationsStore";
import { Search, MapPin, X } from "lucide-react";

export default function FilterBar() {
  const city = useStationsStore((s) => s.city);
  useEffect(() => {
    document.getElementById("sidebar-scroll")?.scrollTo({ top: 0, behavior: "smooth" });
  }, [city]);
  const setCity = useStationsStore((s) => s.setCity);
  const stations = useStationsStore((s) => s.stations);

  // Get unique cities and sort them
  const cities = [...new Set(stations.map((s) => s.city))].sort();

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
        <input type="text" placeholder="Search by city name..." value={city} onChange={(e) => setCity(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-800 border focus:border-indigo-500 rounded-xl text-sm outline-none transition-all text-gray-900 dark:text-gray-100 placeholder-gray-500" />
        {city && (
          <button onClick={() => setCity("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Quick Dropdown (Optional if you want both) */}
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <select value={cities.includes(city) ? city : ""} onChange={(e) => setCity(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-800 border focus:border-indigo-500 rounded-xl text-sm outline-none transition-all text-gray-900 dark:text-gray-100 appearance-none cursor-pointer">
          <option value="">Filter by City (All)</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
