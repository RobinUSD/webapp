'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { stocksTokens, StockToken } from '@/lib/config';
import { burnAndRedeem, getUserCollateralInfo } from '../actions/return';
import Link from 'next/link';

export default function ReturnPage() {
  const { account, balances, usdrhBalance, connectWallet, refreshBalances } = useWallet();
  const [returnToken, setReturnToken] = useState<StockToken>('TSLA');
  const [returnAmount, setReturnAmount] = useState('');
  const [collateralByUser, setCollateralByUser] = useState<Record<string, string>>({});

  useEffect(() => {
    if (account) {
      getUserCollateralInfo()
        .then((collateral) => {
          setCollateralByUser(collateral);
        })
        .catch(console.error);
    }
  }, [account]);

  

  const handleReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account || !returnAmount) return;

    try {
      const tokenAddress = stocksTokens[returnToken];
      await burnAndRedeem(tokenAddress, returnAmount);
      
      alert('Return successful!');
      setReturnAmount('');
      refreshBalances();
    } catch (error) {
      console.error('Return failed:', error);
      alert('Return failed. Please try again.');
    }
  };

  if (!account) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
        <main className="flex flex-col w-full max-w-2xl items-center gap-8 py-16 px-8 bg-white dark:bg-black">
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            Burn & Redeem
          </h1>
          <button
            onClick={connectWallet}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Connect Wallet
          </button>
          <Link href="/" className="text-blue-600 hover:underline">
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
            Burn & Redeem
          </h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>

        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </div>

        {/* Balances */}
        <div className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 text-black dark:text-zinc-50">
            Your USDRh Balance
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">USDRh:</span>
              <span className="text-black dark:text-zinc-50">{usdrhBalance}</span>
            </div>
          </div>
        </div>

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

        {/* Collateral by user */}
        <div className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 text-black dark:text-zinc-50">
            Your Stock Token in collateral for USDRh
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(collateralByUser).map(([symbol, balance]) => (
              <div key={symbol} className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">{symbol}:</span>
                <span className="text-black dark:text-zinc-50">{balance}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Return Form */}
        <div className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 text-black dark:text-zinc-50">
            Burn USDRh & Redeem Stock Tokens
          </h2>
          <form onSubmit={handleReturn} className="flex flex-col gap-3">
            <select
              value={returnToken}
              onChange={(e) => setReturnToken(e.target.value as StockToken)}
              className="px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black text-black dark:text-zinc-50"
            >
              {Object.keys(stocksTokens).map((symbol) => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
              ))}
            </select>
            <input
              type="number"
              step="0.000001"
              placeholder="USDRh Amount"
              value={returnAmount}
              onChange={(e) => setReturnAmount(e.target.value)}
              className="px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black text-black dark:text-zinc-50"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Burn & Redeem
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
