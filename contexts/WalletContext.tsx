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
  const [balances, setBalances] = useState<Record<StockToken, string>>({
    TSLA: '0',
    AMZN: '0',
    PLTR: '0',
    NFLX: '0',
    AMD: '0'
  });
  const [usdrhBalance, setUsdrhBalance] = useState('0');

  const connectWallet = async () => {
    try {
      const connector =
        connectors.find((item) => item.id === 'injected') ?? connectors[0];

      if (!connector) {
        throw new Error('No wallet connectors available');
      }

      try {
        await connectAsync({ connector, chainId: robinhoodChain.id });
      } catch (injectedError) {
        const walletConnectConnector = connectors.find(
          (item) => item.id === 'walletConnect',
        );
        if (!walletConnectConnector) {
          throw injectedError;
        }
        await connectAsync({
          connector: walletConnectConnector,
          chainId: robinhoodChain.id,
        });
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Check wallet permissions and network.');
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnectAsync();
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
