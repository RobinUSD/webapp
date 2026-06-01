'use client';

import Link from 'next/link';
import { useWallet } from '@/contexts/WalletContext';
import { ReactNode } from 'react';

interface AppShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  backHref?: string;
}

export function AppShell({ title, subtitle, children, backHref = '/app' }: AppShellProps) {
  const { account, disconnectWallet, connectWallet } = useWallet();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="sticky top-0 z-40 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-50"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-500 text-xs font-bold text-white">
                R
              </span>
              Robin USD
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {account ? (
              <>
                <div className="hidden sm:flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950 px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
                  <span className="text-sm font-mono text-brand-700 dark:text-brand-300">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={connectWallet}
                className="rounded-lg bg-brand-500 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 animate-fade-in">
        <div className="mb-6 flex items-center gap-4">
          {backHref && (
            <Link
              href={backHref}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{title}</h1>
            {subtitle && <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{subtitle}</p>}
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
