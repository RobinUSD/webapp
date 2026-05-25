'use client';

import { parseUnits } from 'viem';
import { getWalletClient, publicClient, getManagerContract } from '@/lib/viem';
import { USDRHManagerAddress } from '@/lib/config';

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
