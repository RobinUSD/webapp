'use client';

import { createContext, useCallback, useContext, useState, useEffect, ReactNode } from 'react';
import { formatUnits } from 'viem';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { publicClient, getERC20Contract } from '@/lib/viem';
import { stocksTokens, StockToken, USDRHTokenAddress } from '@/lib/config';
import { robinhoodChain } from '@/lib/wagmi';

interface WalletContextType {
  account: `0x${string}` | null;
  balances: Record<StockToken, string>;
  usdrhBalance: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  refreshBalances: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const { address } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const account = (address as `0x${string}` | undefined) ?? null;
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [balances, setBalances] = useState<Record<StockToken, string>>({
    TSLA: '0',
    AMZN: '0',
    PLTR: '0',
    NFLX: '0',
    AMD: '0'
  });
  const [usdrhBalance, setUsdrhBalance] = useState('0');

  const connectWallet = async () => {
    setIsWalletModalOpen(true);
  };

  const connectWithConnector = async (connectorId: string) => {
    try {
      const connector = connectors.find((item) => item.id === connectorId);
      if (!connector) {
        throw new Error('Selected connector is not available');
      }

      await connectAsync({ connector, chainId: robinhoodChain.id });
      setIsWalletModalOpen(false);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Check wallet permissions and network.');
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnectAsync();
      setIsWalletModalOpen(false);
      setBalances({
        TSLA: '0',
        AMZN: '0',
        PLTR: '0',
        NFLX: '0',
        AMD: '0',
      });
      setUsdrhBalance('0');
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      alert('Failed to disconnect wallet.');
    }
  };

  const refreshBalances = useCallback(async () => {
    if (!account) return;

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
          args: [account]
        });
        newBalances[symbol as StockToken] = formatUnits(balance, 18);
      } catch (error) {
        console.error(`Failed to fetch balance for ${symbol}:`, error);
      }
    }

    try {
      const usdrhBalance = await publicClient.readContract({
        address: USDRHTokenAddress as `0x${string}`,
        abi: getERC20Contract(USDRHTokenAddress).abi,
        functionName: 'balanceOf',
        args: [account]
      });
      setUsdrhBalance(formatUnits(usdrhBalance, 18));
    } catch (error) {
      console.error('Failed to fetch USDRh balance:', error);
    }

    setBalances(newBalances);
  }, [account]);

  useEffect(() => {
    if (account) {
      setTimeout(() => {
        void refreshBalances();
      }, 0);
    }
  }, [account, refreshBalances]);

  return (
    <WalletContext.Provider value={{ account, balances, usdrhBalance, connectWallet, disconnectWallet, refreshBalances }}>
      {children}
      {isWalletModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-black dark:text-zinc-50">
                Connect Wallet
              </h2>
              <button
                onClick={() => setIsWalletModalOpen(false)}
                className="rounded px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Close
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {connectors.length === 0 ? (
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  No wallet options available.
                </p>
              ) : (
                connectors.map((connector) => (
                  <button
                    key={connector.id}
                    onClick={() => void connectWithConnector(connector.id)}
                    className="w-full rounded-lg border border-zinc-200 px-4 py-2 text-left text-sm text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
                  >
                    {connector.name}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
