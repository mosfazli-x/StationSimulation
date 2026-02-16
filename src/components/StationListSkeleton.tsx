export function StationListSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-20 bg-gray-200 dark:bg-slate-800 rounded-xl" />
      ))}
    </div>
  );
}