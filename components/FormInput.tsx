import { InputHTMLAttributes, SelectHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
};

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
        <input
          ref={ref}
          className={`rounded-lg border bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:ring-brand-400/40 ${
            error
              ? 'border-red-400 focus:ring-red-400/40 focus:border-red-400'
              : 'border-zinc-300 dark:border-zinc-700'
          } ${className ?? ''}`}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        {hint && !error && <p className="text-xs text-zinc-400">{hint}</p>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export function FormSelect({ label, options, error, className, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <select
        className={`rounded-lg border bg-white px-3 py-2.5 text-sm text-zinc-900 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:ring-brand-400/40 ${
          error
            ? 'border-red-400 focus:ring-red-400/40 focus:border-red-400'
            : 'border-zinc-300 dark:border-zinc-700'
        } ${className ?? ''}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
