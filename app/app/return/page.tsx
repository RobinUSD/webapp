'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { stocksTokens, StockToken } from '@/lib/config';
import { burnAndRedeem, getUserCollateralInfo } from '../../actions/return';
import { AppShell } from '@/components/AppShell';
import { BalanceCard } from '@/components/BalanceCard';
import { FormInput, FormSelect } from '@/components/FormInput';
import { useToast } from '@/components/Toast';

export default function ReturnPage() {
  const { account, usdrhBalance, connectWallet, refreshBalances } = useWallet();
  const { showToast } = useToast();
  const [returnToken, setReturnToken] = useState<StockToken>('TSLA');
  const [returnAmount, setReturnAmount] = useState('');
  const [collateralByUser, setCollateralByUser] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (account) {
      getUserCollateralInfo()
        .then((collateral) => setCollateralByUser(collateral))
        .catch(console.error);
    }
  }, [account]);

  const handleReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account || !returnAmount) return;

    setPending(true);
    try {
      const tokenAddress = stocksTokens[returnToken];
      await burnAndRedeem(tokenAddress, returnAmount);
      showToast('Burn & redeem successful!', 'success');
      setReturnAmount('');
      refreshBalances();
    } catch (error) {
      console.error('Return failed:', error);
      showToast('Return failed. Please try again.', 'error');
    } finally {
      setPending(false);
    }
  };

  if (!account) {
    return (
      <AppShell title="Burn & Redeem" subtitle="Burn USDRh to redeem your stock tokens">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-zinc-500 dark:text-zinc-400 mb-4">Connect your wallet to burn and redeem</p>
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
    <AppShell title="Burn & Redeem" subtitle="Burn USDRh stablecoins and redeem your stock tokens">
      <div className="grid gap-6 animate-slide-up">
        <BalanceCard label="Your USDRh Balance" value={usdrhBalance} variant="brand" />

        <div className="grid gap-4 sm:grid-cols-2">
          {Object.entries(collateralByUser).map(([symbol, balance]) => (
            <BalanceCard
              key={symbol}
              label={`${symbol} in Collateral`}
              value={balance}
              symbol={symbol}
            />
          ))}
        </div>

        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-5">
            Burn USDRh & Redeem Stock Tokens
          </h2>
          <form onSubmit={handleReturn} className="flex flex-col gap-4">
            <FormSelect
              label="Select Token"
              value={returnToken}
              onChange={(e) => setReturnToken(e.target.value as StockToken)}
              options={tokenOptions}
            />
            <FormInput
              label="USDRh Amount"
              type="number"
              step="0.000001"
              placeholder="0.00"
              value={returnAmount}
              onChange={(e) => setReturnAmount(e.target.value)}
              hint={`Available: ${collateralByUser[returnToken] ?? '0'} ${returnToken}`}
              required
            />
            <button
              type="submit"
              disabled={pending}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
                'Burn & Redeem'
              )}
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
