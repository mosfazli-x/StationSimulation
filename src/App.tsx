import { useEffect } from "react";
import { useStationsStore } from "./store/useStationsStore";
import { useThemeStore } from "./store/useThemeStore";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";

function App() {
  const fetchAll = useStationsStore((s) => s.fetchAll);
  const loading = useStationsStore((s) => s.loading);
  const error = useStationsStore((s) => s.error);
  const dark = useThemeStore((s) => s.dark);

  useEffect(() => {
    fetchAll();
  }, []);

  // Update body class for Tailwind Dark mode to work globally
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
            PANTO
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex items-center justify-center bg-red-50 text-red-600 font-semibold">
        Error: {error}
      </div>
    );

  return (
    <div className="flex flex-col-reverse md:flex-row h-screen w-full overflow-hidden bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Sidebar - Scrollable List & Filters */}
      <Sidebar />
      
      {/* Main Map Area - Takes remaining space */}
      <div className="flex-1 relative z-0 h-[50vh] md:h-full shadow-inner">
        <MapView />
      </div>
    </div>
  );
}

export default App;