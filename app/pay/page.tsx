'use client';

import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { pay } from '../actions/pay';
import Link from 'next/link';

export default function PayPage() {
  const { account, usdrhBalance, connectWallet } = useWallet();
  const [toAddress, setToAddress] = useState('');
  const [payAmount, setPayAmount] = useState('');

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account || !toAddress || !payAmount) return;

    try {
      await pay(toAddress, payAmount);
      alert('Payment successful!');
      setToAddress('');
      setPayAmount('');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  if (!account) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
        <main className="flex flex-col w-full max-w-2xl items-center gap-8 py-16 px-8 bg-white dark:bg-black">
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            Pay
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
            Pay with USDRh
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

        {/* Pay Form */}
        <div className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 text-black dark:text-zinc-50">
            Send USDRh Tokens
          </h2>
          <form onSubmit={handlePay} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Recipient Address"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              className="px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black text-black dark:text-zinc-50"
              required
            />
            <input
              type="number"
              step="0.000001"
              placeholder="USDRh Amount"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              className="px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black text-black dark:text-zinc-50"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Send Payment
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
