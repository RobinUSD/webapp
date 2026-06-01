import { Skeleton } from './Skeleton';
import { StockIcon } from './StockIcon';

interface BalanceCardProps {
  label: string;
  value: string | undefined;
  symbol?: string;
  loading?: boolean;
  variant?: 'default' | 'brand' | 'accent';
}

export function BalanceCard({ label, value, symbol, loading, variant = 'default' }: BalanceCardProps) {
  const variantClasses: Record<string, string> = {
    default: 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800',
    brand: 'bg-gradient-to-br from-brand-500/10 to-brand-500/5 border border-brand-200 dark:border-brand-800',
    accent: 'bg-gradient-to-br from-accent-500/10 to-accent-500/5 border border-accent-200 dark:border-accent-800',
  };

  return (
    <div className={`rounded-xl p-5 ${variantClasses[variant]} transition-shadow hover:shadow-md`}>
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
        {label}
      </p>
      {loading ? (
        <Skeleton className="h-7 w-28 mt-1" />
      ) : (
        <div className="flex items-center gap-3">
          {symbol && <StockIcon symbol={symbol} size="sm" />}
          <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 truncate">
            {value ?? '0'}
          </span>
        </div>
      )}
    </div>
  );
}
