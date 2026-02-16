import FilterBar from "./FilterBar";
import StationList from "./StationList";
import ThemeToggle from "./ThemeToggle";
import { TrainFront } from "lucide-react"; // Train Icon
import { motion } from "framer-motion";

export default function Sidebar() {
  return (
    <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} className="w-full md:w-[400px] flex flex-col h-full bg-white dark:bg-slate-900 ...">
      <div className="w-full md:w-[400px] lg:w-[450px] flex flex-col h-full bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 shadow-xl z-10 transition-colors duration-300">
        {/* Header Area */}
        <div className="p-6 border-b border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <TrainFront size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                  PANTO<span className="text-indigo-600 dark:text-indigo-400">health</span>
                </h1>
                <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">German Rail Network</p>
              </div>
            </div>
            <ThemeToggle />
          </div>

          <FilterBar />
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-900/50 p-4 custom-scrollbar">
          <StationList />
        </div>
      </div>
    </motion.div>
  );
}
