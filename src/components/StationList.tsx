import { useStationsStore } from "../store/useStationsStore";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, SearchX } from "lucide-react";
import clsx from "clsx";
import { StationListSkeleton } from "./StationListSkeleton";

export default function StationList() {
  const stations = useStationsStore((s) => s.filtered);
  const selected = useStationsStore((s) => s.selected);
  const selectStation = useStationsStore((s) => s.selectStation);
  const setCity = useStationsStore((s) => s.setCity);
  const loading = useStationsStore((s) => s.loading);

  if (loading) return <StationListSkeleton />;

  if (stations.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-full mb-4">
          <SearchX size={32} className="text-gray-400" />
        </div>
        <p className="text-gray-500">No stations found in this city.</p>
        <button onClick={() => setCity("")} className="mt-2 text-indigo-500 hover:underline">
          Clear filter
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3 p-1">
      <AnimatePresence mode="popLayout">
        {stations.map((s) => (
          <motion.div
            key={s.id}
            layout // This handles the smooth sliding of other items
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => selectStation(s)}
            className={clsx("p-4 rounded-xl border cursor-pointer transition-colors relative", selected?.id === s.id ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 shadow-md" : "bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 shadow-sm")}
          >
            <h3 className="font-bold dark:text-white">{s.name}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400">
              <MapPin size={12} /> {s.city}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
