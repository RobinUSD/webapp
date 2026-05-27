'use client';

import { parseUnits } from 'viem';
import { getWalletClient, publicClient, getERC20Contract } from '@/lib/viem';
import { USDRHTokenAddress } from '@/lib/config';

export async function pay(toAddress: string, amount: string) {
  const walletClient = await getWalletClient();
  const [account] = await walletClient.getAddresses();

  // Convert amount to wei (assuming 18 decimals)
  const amountInWei = parseUnits(amount, 18);

  // Transfer USDRh tokens
  const { request } = await publicClient.simulateContract({
    address: USDRHTokenAddress as `0x${string}`,
    abi: getERC20Contract(USDRHTokenAddress).abi,
    functionName: 'transfer',
    args: [toAddress as `0x${string}`, amountInWei],
    account
  });

  const hash = await walletClient.writeContract(request);
  await publicClient.waitForTransactionReceipt({ hash });
  return hash;
}
