import Link from 'next/link';

interface ActionCardProps {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  variant?: 'default' | 'brand' | 'accent' | 'danger';
}

export function ActionCard({ href, title, description, icon, variant = 'default' }: ActionCardProps) {
  const variantClasses: Record<string, string> = {
    default:
      'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900',
    brand:
      'border-brand-200 dark:border-brand-900/50 hover:border-brand-300 dark:hover:border-brand-700 bg-gradient-to-br from-brand-50 to-white dark:from-brand-950/30 dark:to-zinc-900',
    accent:
      'border-accent-200 dark:border-accent-900/50 hover:border-accent-300 dark:hover:border-accent-700 bg-gradient-to-br from-accent-50 to-white dark:from-accent-950/30 dark:to-zinc-900',
    danger:
      'border-red-200 dark:border-red-900/50 hover:border-red-300 dark:hover:border-red-700 bg-gradient-to-br from-red-50 to-white dark:from-red-950/30 dark:to-zinc-900',
  };

  return (
    <Link
      href={href}
      className={`group flex items-center gap-4 rounded-xl border p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${variantClasses[variant]}`}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
      <svg
        className="h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
