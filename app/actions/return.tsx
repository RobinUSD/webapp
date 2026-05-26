'use client';

import { parseUnits, formatUnits } from 'viem';
import { getWalletClient, publicClient, getManagerContract } from '@/lib/viem';
import { USDRHManagerAddress, stocksTokens } from '@/lib/config';

export async function burnAndRedeem(tokenAddress: string, stableAmount: string) {
  const walletClient = getWalletClient();
  const [account] = await walletClient.getAddresses();

  // Convert amount to wei (assuming 18 decimals)
  const amountInWei = parseUnits(stableAmount, 18);

  // Burn and redeem
  const { request } = await publicClient.simulateContract({
    address: USDRHManagerAddress as `0x${string}`,
    abi: getManagerContract().abi,
    functionName: 'burnAndRedeem',
    args: [tokenAddress as `0x${string}`, amountInWei],
    account
  });

  const hash = await walletClient.writeContract(request);
  await publicClient.waitForTransactionReceipt({ hash });
  return hash;
}

export async function getUserCollateralInfo() {
  const walletClient = getWalletClient();
  const [account] = await walletClient.getAddresses();

  const collateralAvailable: Record<string, string> = {};

  for (const [symbol, tokenAddress] of Object.entries(stocksTokens)) {

    const userCollateralInfo = await publicClient.readContract({
      address: USDRHManagerAddress as `0x${string}`,
      abi: getManagerContract().abi,
      functionName: 'collateralBalance',
      args: [account, tokenAddress as `0x${string}`],
      account
    });

    const tokenAmount = formatUnits(userCollateralInfo,18);
    if(tokenAmount !== "0") {
      collateralAvailable[symbol] = tokenAmount.toString();
    }
  }

  return collateralAvailable;
}