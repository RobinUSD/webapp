'use client';

import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { pay } from '../../actions/pay';
import { AppShell } from '@/components/AppShell';
import { BalanceCard } from '@/components/BalanceCard';
import { FormInput } from '@/components/FormInput';
import { useToast } from '@/components/Toast';

export default function PayPage() {
  const { account, usdrhBalance, connectWallet } = useWallet();
  const { showToast } = useToast();
  const [toAddress, setToAddress] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [pending, setPending] = useState(false);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account || !toAddress || !payAmount) return;

    setPending(true);
    try {
      await pay(toAddress, payAmount);
      showToast('Payment sent successfully!', 'success');
      setToAddress('');
      setPayAmount('');
    } catch (error) {
      console.error('Payment failed:', error);
      showToast('Payment failed. Please try again.', 'error');
    } finally {
      setPending(false);
    }
  };

  if (!account) {
    return (
      <AppShell title="Pay with USDRh" subtitle="Send USDRh stablecoins to another address">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-zinc-500 dark:text-zinc-400 mb-4">Connect your wallet to send USDRh</p>
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

  return (
    <AppShell title="Pay with USDRh" subtitle="Send USDRh stablecoins to another address">
      <div className="grid gap-6 animate-slide-up">
        <BalanceCard label="Your USDRh Balance" value={usdrhBalance} variant="brand" />

        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-5">
            Send USDRh Tokens
          </h2>
          <form onSubmit={handlePay} className="flex flex-col gap-4">
            <FormInput
              label="Recipient Address"
              type="text"
              placeholder="0x..."
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              hint="Enter the recipient's wallet address"
              required
            />
            <FormInput
              label="Amount"
              type="number"
              step="0.000001"
              placeholder="0.00"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              hint={`Balance: ${usdrhBalance} USDRh`}
              required
            />
            <button
              type="submit"
              disabled={pending}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-accent-500/20 transition-all hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
                'Send Payment'
              )}
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
