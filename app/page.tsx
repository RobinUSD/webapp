'use client';

import { useState, useEffect } from 'react';
import { formatUnits } from 'viem';
import { getWalletClient, publicClient, getERC20Contract } from '@/lib/viem';
import { stocksTokens, StockToken } from '@/lib/config';
import { depositAndMint } from './actions/deposit';
import { burnAndRedeem } from './actions/return';

export default function Home() {
  const [account, setAccount] = useState<`0x${string}` | null>(null);
  const [balances, setBalances] = useState<Record<StockToken, string>>({
    TSLA: '0',
    AMZN: '0',
    PLTR: '0',
    NFLX: '0',
    AMD: '0'
  });

  // Deposit form state
  const [depositToken, setDepositToken] = useState<StockToken>('TSLA');
  const [depositAmount, setDepositAmount] = useState('');

  // Return form state
  const [returnToken, setReturnToken] = useState<StockToken>('TSLA');
  const [returnAmount, setReturnAmount] = useState('');

  const connectWallet = async () => {
    try {
      const walletClient = getWalletClient();
      const [address] = await walletClient.getAddresses();
      setAccount(address);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Please ensure MetaMask is installed.');
    }
  };

  const fetchBalances = async (address: `0x${string}`) => {
    const newBalances: Record<StockToken, string> = {
      TSLA: '0',
      AMZN: '0',
      PLTR: '0',
      NFLX: '0',
      AMD: '0'
    };

    for (const [symbol, tokenAddress] of Object.entries(stocksTokens)) {
      try {
        const balance = await publicClient.readContract({
          address: tokenAddress as `0x${string}`,
          abi: getERC20Contract(tokenAddress).abi,
          functionName: 'balanceOf',
          args: [address]
        });
        newBalances[symbol as StockToken] = formatUnits(balance, 18);
      } catch (error) {
        console.error(`Failed to fetch balance for ${symbol}:`, error);
      }
    }

    setBalances(newBalances);
  };

  useEffect(() => {
    if (account) {
      fetchBalances(account);
    }
  }, [account]);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account || !depositAmount) return;

    try {
      const tokenAddress = stocksTokens[depositToken];
      await depositAndMint(tokenAddress, depositAmount);
      alert('Deposit successful!');
      setDepositAmount('');
      fetchBalances(account);
    } catch (error) {
      console.error('Deposit failed:', error);
      alert('Deposit failed. Please try again.');
    }
  };

  const handleReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account || !returnAmount) return;

    try {
      const tokenAddress = stocksTokens[returnToken];
      await burnAndRedeem(tokenAddress, returnAmount);
      alert('Return successful!');
      setReturnAmount('');
      fetchBalances(account);
    } catch (error) {
      console.error('Return failed:', error);
      alert('Return failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <main className="flex flex-col w-full max-w-2xl items-center gap-8 py-16 px-8 bg-white dark:bg-black">
        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
          Robin USD
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 text-center">
          Mint USDRH stablecoins by depositing stock tokens as collateral
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

            {/* Deposit Form */}
            <div className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-black dark:text-zinc-50">
                Deposit & Mint
              </h2>
              <form onSubmit={handleDeposit} className="flex flex-col gap-3">
                <select
                  value={depositToken}
                  onChange={(e) => setDepositToken(e.target.value as StockToken)}
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
                  placeholder="Amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black text-black dark:text-zinc-50"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Deposit & Mint USDRH
                </button>
              </form>
            </div>

            {/* Return Form */}
            <div className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3 text-black dark:text-zinc-50">
                Burn & Redeem
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
                  placeholder="USDRH Amount"
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
          </>
        )}
      </main>
    </div>
  );
}
