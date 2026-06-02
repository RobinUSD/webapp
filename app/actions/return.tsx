'use client';

import { parseUnits, formatUnits } from 'viem';
import { getWalletClient, publicClient, getManagerContract } from '@/lib/viem';
import { USDRHManagerAddress, stocksTokens } from '@/lib/config';

export async function burnAndRedeem(tokenAddress: string, stableAmount: string) {
  const walletClient = await getWalletClient();
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
  const receipt =await publicClient.waitForTransactionReceipt({ hash });
  if(receipt.status !== "success") {
    throw new Error("Burn and redeem failed");
  }
  return hash;
}

// export async function getUserCollateralInfo() {
//   const walletClient = await getWalletClient();
//   const [account] = await walletClient.getAddresses();

//   const collateralAvailable: Record<string, string> = {};

//   for (const [symbol, tokenAddress] of Object.entries(stocksTokens)) {

//     const userCollateralInfo = await publicClient.readContract({
//       address: USDRHManagerAddress as `0x${string}`,
//       abi: getManagerContract().abi,
//       functionName: 'collateralBalance',
//       args: [account, tokenAddress as `0x${string}`],
//       account
//     });

//     const tokenAmount = formatUnits(userCollateralInfo,18);
//     if(tokenAmount !== "0") {
//       collateralAvailable[symbol] = tokenAmount.toString();
//     }
//   }

//   return collateralAvailable;
// }


export async function getUserCollateralInfo() {
  const walletClient = await getWalletClient();
  const [account] = await walletClient.getAddresses();

  const collateralAvailable: Record<string, string> = {};

  const userCollateralInfo = await publicClient.readContract({
    address: USDRHManagerAddress as `0x${string}`,
    abi: getManagerContract().abi,
    functionName: 'getUserCollateralInfo',
    args: [account],
    account
  });
  
  const [tokens, amounts] = userCollateralInfo;

  const tokenMap = new Map(
    Object.entries(stocksTokens).map(([key, value]) => [value.toLowerCase(), key])
  );

  for (let i = 0; i < tokens.length; i++) {
    const tokenAmount = formatUnits(amounts[i],18);
    const ticker = tokenMap.get(tokens[i].toLowerCase());
    if (ticker) {
      collateralAvailable[ticker] = tokenAmount.toString();
    }
  }

  return collateralAvailable;
}