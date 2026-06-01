'use client';

import { useWallet } from '@/contexts/WalletContext';
import { AppShell } from '@/components/AppShell';
import { BalanceCard } from '@/components/BalanceCard';
import { ActionCard } from '@/components/ActionCard';

export default function Dashboard() {
  const { account, balances, usdrhBalance, refreshBalances } = useWallet();

  const hasBalance = Object.values(balances).some((b) => b !== '0' && b !== '0.0');

  return (
    <AppShell title="Dashboard" subtitle="Manage your Robin USD stablecoins" backHref="">
      {!account ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
            <svg className="h-10 w-10 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Connect Your Wallet
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
            Connect your wallet to deposit stock tokens, mint USDRh stablecoins, and manage your
            portfolio.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 animate-slide-up">
          {/* USDRh Balance */}
          <BalanceCard
            label="Your USDRh Balance"
            value={usdrhBalance}
            variant="brand"
          />

          {/* Stock Token Balances */}
          <div>
            <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
              Stock Token Balances
            </h2>
            {hasBalance ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(balances).map(([symbol, balance]) => (
                  <BalanceCard
                    key={symbol}
                    label={symbol}
                    value={balance}
                    symbol={symbol}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-400 dark:text-zinc-500 py-4">
                No stock token balances yet. Deposit tokens to get started.
              </p>
            )}
          </div>

          {/* Refresh */}
          <button
            onClick={refreshBalances}
            className="self-start flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Balances
          </button>

          {/* Action Cards */}
          <div className="grid gap-4 pt-2">
            <ActionCard
              href="/app/deposit"
              title="Deposit & Mint"
              description="Deposit stock tokens as collateral and mint USDRh stablecoins"
              variant="brand"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />

            <ActionCard
              href="/app/return"
              title="Burn & Redeem"
              description="Burn USDRh stablecoins and redeem your stock tokens"
              variant="danger"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />

            <ActionCard
              href="/app/pay"
              title="Pay"
              description="Send USDRh stablecoins to another address"
              variant="accent"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              }
            />

            <ActionCard
              href="/app/status"
              title="Status"
              description="View total USDRh supply and protocol status"
              variant="default"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              }
            />
          </div>
        </div>
      )}
    </AppShell>
  );
}
