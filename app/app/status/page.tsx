'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { getTotalSupply } from '../../actions/status';
import Link from 'next/link';

export default function StatusPage() {
  const { account, connectWallet } = useWallet();
  const [totalSupply, setTotalSupply] = useState('0');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const supply = await getTotalSupply();
        setTotalSupply(supply);
      } catch (error) {
        console.error('Failed to fetch total supply:', error);
      }
    };

    fetchStatus();
  }, []);

  if (!account) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
        <main className="flex flex-col w-full max-w-2xl items-center gap-8 py-16 px-8 bg-white dark:bg-black">
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            Status
          </h1>
          <button
            onClick={connectWallet}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Connect Wallet
          </button>
          <Link href="/app" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <main className="flex flex-col w-full max-w-2xl items-center gap-8 py-16 px-8 bg-white dark:bg-black">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            Status
          </h1>
          <Link href="/app" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>

        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </div>

        {/* Total Supply */}
        <div className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 text-black dark:text-zinc-50">
            Total USDRh Supply
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">USDRh:</span>
              <span className="text-black dark:text-zinc-50">{totalSupply}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
