'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { stocksTokens, StockToken } from '@/lib/config';
import { depositAndMint } from '../../actions/deposit';
import { AppShell } from '@/components/AppShell';
import { BalanceCard } from '@/components/BalanceCard';
import { FormInput, FormSelect } from '@/components/FormInput';
import { useToast } from '@/components/Toast';
import { getLatestPrice } from '../../actions/status';

export default function DepositPage() {
  const { account, balances, usdrhBalance, refreshBalances, connectWallet } = useWallet();
  const { showToast } = useToast();
  const [depositToken, setDepositToken] = useState<StockToken>('TSLA');
  const [depositAmount, setDepositAmount] = useState('');
  const [latestPrice, setLatestPrice] = useState('');
  const [pending, setPending] = useState(false);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account || !depositAmount) return;

    setPending(true);
    try {
      const tokenAddress = stocksTokens[depositToken];
      await depositAndMint(tokenAddress, depositAmount);
      showToast('Deposit & mint successful!', 'success');
      setDepositAmount('');
      refreshBalances();
    } catch (error) {
      console.error('Deposit failed:', error);
      showToast('Deposit failed. Please try again.', 'error');
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    const fetchLatestPrice = async () => {
      try {
        const tokenAddress = stocksTokens[depositToken];
        const latestPriceData = await getLatestPrice(tokenAddress);
        setLatestPrice(latestPriceData);
      } catch (error) {
        console.error('Failed to fetch latest price:', error);
        setLatestPrice('0');
      }
    };

    fetchLatestPrice();
  }, [depositToken]);

  if (!account) {
    return (
      <AppShell title="Deposit & Mint" subtitle="Deposit stock tokens to mint USDRh">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-zinc-500 dark:text-zinc-400 mb-4">Connect your wallet to deposit stock tokens</p>
          <button
            onClick={connectWallet}
            className="rounded-xl bg-brand-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-600"
          >
            Connect Wallet
          </button>
        </div>
      </AppShell>
    );
  }

  const tokenOptions = Object.keys(stocksTokens).map((s) => ({ value: s, label: s }));

  return (
    <AppShell title="Deposit & Mint" subtitle="Deposit stock tokens as collateral and mint USDRh">
      <div className="grid gap-6 animate-slide-up">
        <div className="grid gap-4 sm:grid-cols-2">
          <BalanceCard label="Your USDRh Balance" value={usdrhBalance} variant="brand" />
          <BalanceCard
            label={`Your ${depositToken} Balance`}
            value={balances[depositToken]}
            symbol={depositToken}
          />
        </div>

        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-5">
            Deposit Stock Tokens & Mint USDRh
          </h2>
          <form onSubmit={handleDeposit} className="flex flex-col gap-4">
            <FormSelect
              label="Select Token"
              value={depositToken}
              onChange={(e) => setDepositToken(e.target.value as StockToken)}
              options={tokenOptions}
            />
            <div className="flex items-center gap-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 px-3 py-2 text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">Latest Price:</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                {latestPrice || '...'} USD per {depositToken} approximately
              </span>
            </div>
            <FormInput
              label="Amount"
              type="number"
              step="0.000001"
              placeholder="0.00"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              hint={`Balance: ${balances[depositToken]}`}
              required
            />
            <button
              type="submit"
              disabled={pending}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-500/20 transition-all hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pending ? (
                <>
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </>
              ) : (
                'Deposit & Mint USDRh'
              )}
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
