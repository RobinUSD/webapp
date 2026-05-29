'use client';

import { formatEther, formatUnits } from 'viem';
import { getWalletClient, publicClient, getERC20Contract, getManagerContract } from '@/lib/viem';
import { USDRHTokenAddress, USDRHManagerAddress, stocksTokens } from '@/lib/config';


export async function getTotalSupply() {
  const totalSupply = await publicClient.readContract({
        address: USDRHTokenAddress as `0x${string}`,
        abi: getERC20Contract(USDRHTokenAddress).abi,
        functionName: 'totalSupply',
        args: []
      });

  const totalSupplyFormatted = formatEther(totalSupply);

  return totalSupplyFormatted;
}

export async function getTotalReservesInBalances() {
  const walletClient = await getWalletClient();
  const [account] = await walletClient.getAddresses();

  const totalCollateral: Record<string, string> = {};

  const totalCollateralInfo = await publicClient.readContract({
    address: USDRHManagerAddress as `0x${string}`,
    abi: getManagerContract().abi,
    functionName: 'getTotalReservesBalances',
      args: [],
      account
    });
  
  const [tokens, amounts] = totalCollateralInfo;

  const tokenMap = new Map(
    Object.entries(stocksTokens).map(([key, value]) => [value.toLowerCase(), key])
  );

  for (let i = 0; i < tokens.length; i++) {
    const tokenAmount = formatUnits(amounts[i],18);
    const ticker = tokenMap.get(tokens[i].toLowerCase());
    if (ticker) {
      totalCollateral[ticker] = tokenAmount.toString();
    }
  }

  return totalCollateral;
}

export async function getTotalFees() {
  const totalFees = await publicClient.readContract({
        address: USDRHManagerAddress as `0x${string}`,
        abi: getManagerContract().abi,
        functionName: 'totalFees',
        args: []
      });

  const totalFeesFormatted = formatEther(totalFees);

  return totalFeesFormatted;
}