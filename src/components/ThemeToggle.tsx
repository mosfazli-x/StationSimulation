import { useThemeStore } from "../store/useThemeStore";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const dark = useThemeStore(s => s.dark);
  const toggle = useThemeStore(s => s.toggle);

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-indigo-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-slate-700"
      aria-label="Toggle Theme"
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}