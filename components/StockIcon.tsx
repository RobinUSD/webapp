const tokenColors: Record<string, string> = {
  TSLA: 'bg-red-500',
  AMZN: 'bg-amber-500',
  PLTR: 'bg-violet-500',
  NFLX: 'bg-rose-600',
  AMD: 'bg-emerald-500',
};

export function StockIcon({ symbol, size = 'md' }: { symbol: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' };
  const colorClass = tokenColors[symbol] ?? 'bg-zinc-500';

  return (
    <div
      className={`${sizeClasses[size]} ${colorClass} flex items-center justify-center rounded-full font-bold text-white shadow-sm`}
    >
      {symbol.slice(0, 2)}
    </div>
  );
}
