'use client';

import Link from 'next/link';
import { useWallet } from '@/contexts/WalletContext';

export default function Home() {
  const { account, balances, connectWallet } = useWallet();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <main className="flex flex-col w-full max-w-2xl items-center gap-8 py-16 px-8 bg-white dark:bg-black">
        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
          Robin USD
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 text-center">
          Mint USDRh stablecoins by depositing stock tokens as collateral
        </p>

        {!account ? (
          <button
            onClick={connectWallet}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </div>

            {/* Balances */}
            <div className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-black dark:text-zinc-50">
                Your Stock Token Balances
              </h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(balances).map(([symbol, balance]) => (
                  <div key={symbol} className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">{symbol}:</span>
                    <span className="text-black dark:text-zinc-50">{balance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Cards */}
            <div className="w-full grid grid-cols-1 gap-4">
              <Link
                href="/deposit"
                className="block p-6 bg-zinc-100 dark:bg-zinc-900 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              >
                <h3 className="text-xl font-semibold text-black dark:text-zinc-50 mb-2">
                  Deposit & Mint
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Deposit stock tokens as collateral and mint USDRh stablecoins
                </p>
              </Link>

              <Link
                href="/return"
                className="block p-6 bg-zinc-100 dark:bg-zinc-900 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              >
                <h3 className="text-xl font-semibold text-black dark:text-zinc-50 mb-2">
                  Burn & Redeem
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Burn USDRh stablecoins and redeem your stock tokens
                </p>
              </Link>

              <Link
                href="/pay"
                className="block p-6 bg-zinc-100 dark:bg-zinc-900 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              >
                <h3 className="text-xl font-semibold text-black dark:text-zinc-50 mb-2">
                  Pay
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Send USDRh stablecoins to another address
                </p>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
