'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { getTotalSupply, getTotalReservesInBalances, getTotalFees } from '../../actions/status';
import { AppShell } from '@/components/AppShell';
import { BalanceCard } from '@/components/BalanceCard';

export default function StatusPage() {
  const { account, connectWallet } = useWallet();
  const [totalSupply, setTotalSupply] = useState<string | undefined>();
  const [totalCollateral, setTotalCollateral] = useState<Record<string, string>>({});
  const [totalFees, setTotalFees] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      try {
        const [supply, collateral, fees] = await Promise.all([
          getTotalSupply(),
          getTotalReservesInBalances(),
          getTotalFees(),
        ]);
        setTotalSupply(supply);
        setTotalCollateral(collateral);
        setTotalFees(fees);
      } catch (error) {
        console.error('Failed to fetch status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (!account) {
    return (
      <AppShell title="Protocol Status" subtitle="View total USDRh supply and protocol reserves">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-zinc-500 dark:text-zinc-400 mb-4">Connect your wallet to view protocol status</p>
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
    <AppShell title="Protocol Status" subtitle="View total USDRh supply and protocol reserves">
      <div className="grid gap-6 animate-slide-up">
        <div className="grid gap-4 sm:grid-cols-2">
          <BalanceCard label="Total USDRh Supply" value={totalSupply} loading={loading} variant="brand" />
          <BalanceCard label="Total Fees (USDRh)" value={totalFees} loading={loading} variant="accent" />
        </div>

        <div>
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
            Total Collateral in Reserves
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.keys(totalCollateral).length > 0
              ? Object.entries(totalCollateral).map(([symbol, balance]) => (
                  <BalanceCard
                    key={symbol}
                    label={symbol}
                    value={balance}
                    symbol={symbol}
                    loading={loading}
                  />
                ))
              : !loading && (
                  <p className="text-sm text-zinc-400 dark:text-zinc-500 col-span-full py-4">
                    No collateral data available.
                  </p>
                )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
