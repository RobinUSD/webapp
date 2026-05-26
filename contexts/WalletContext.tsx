'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { formatUnits } from 'viem';
import { getWalletClient, publicClient, getERC20Contract } from '@/lib/viem';
import { stocksTokens, StockToken } from '@/lib/config';

interface WalletContextType {
  account: `0x${string}` | null;
  balances: Record<StockToken, string>;
  connectWallet: () => Promise<void>;
  refreshBalances: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<`0x${string}` | null>(null);
  const [balances, setBalances] = useState<Record<StockToken, string>>({
    TSLA: '0',
    AMZN: '0',
    PLTR: '0',
    NFLX: '0',
    AMD: '0'
  });

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

  const refreshBalances = async () => {
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

    setBalances(newBalances);
  };

  useEffect(() => {
    if (account) {
      refreshBalances();
    }
  }, [account]);

  return (
    <WalletContext.Provider value={{ account, balances, connectWallet, refreshBalances }}>
      {children}
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
