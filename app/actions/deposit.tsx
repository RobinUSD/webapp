'use client';

import { parseUnits, maxUint256 } from 'viem';
import { getWalletClient, publicClient, getManagerContract, getERC20Contract } from '@/lib/viem';
import { USDRHManagerAddress } from '@/lib/config';

export async function approveToken(tokenAddress: string, amount: bigint) {
  const walletClient = await getWalletClient();
  const [account] = await walletClient.getAddresses();

  const { request } = await publicClient.simulateContract({
    address: tokenAddress as `0x${string}`,
    abi: getERC20Contract(tokenAddress).abi,
    functionName: 'approve',
    args: [USDRHManagerAddress as `0x${string}`, amount],
    account
  });

  const hash = await walletClient.writeContract(request);
  await publicClient.waitForTransactionReceipt({ hash });
  return hash;
}

export async function depositAndMint(tokenAddress: string, amount: string) {
  const walletClient = await getWalletClient();
  const [account] = await walletClient.getAddresses();

  // Convert amount to wei (assuming 18 decimals)
  const amountInWei = parseUnits(amount, 18);

  // Check current allowance
  const currentAllowance = await publicClient.readContract({
    address: tokenAddress as `0x${string}`,
    abi: getERC20Contract(tokenAddress).abi,
    functionName: 'allowance',
    args: [account, USDRHManagerAddress as `0x${string}`]
  });

  // Approve if needed
  if (currentAllowance < amountInWei) {
    await approveToken(tokenAddress, maxUint256);
  }

  // Deposit and mint
  const { request } = await publicClient.simulateContract({
    address: USDRHManagerAddress as `0x${string}`,
    abi: getManagerContract().abi,
    functionName: 'depositAndMint',
    args: [tokenAddress as `0x${string}`, amountInWei],
    account
  });

  const hash = await walletClient.writeContract(request);
  await publicClient.waitForTransactionReceipt({ hash });
  return hash;
}
