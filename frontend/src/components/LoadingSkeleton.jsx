function LoadingSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="h-40 rounded-xl bg-slate-200" />
      <div className="mt-3 h-4 w-2/3 rounded bg-slate-200" />
      <div className="mt-2 h-4 w-1/2 rounded bg-slate-200" />
      <div className="mt-4 h-8 rounded-full bg-slate-200" />
    </div>
  );
}

export default LoadingSkeleton;
