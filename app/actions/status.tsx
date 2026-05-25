'use client';

import { formatEther } from 'viem';
import { getWalletClient, publicClient, getManagerContract, getERC20Contract } from '@/lib/viem';
import { USDRHTokenAddress } from '@/lib/config';


export async function getTotalSupply() {
  const walletClient = getWalletClient();
  const [account] = await walletClient.getAddresses();

  const totalSupply = await publicClient.readContract({
        address: USDRHTokenAddress as `0x${string}`,
        abi: getERC20Contract(USDRHTokenAddress).abi,
        functionName: 'totalSupply',
        args: []
      });

  const totalSupplyFormatted = formatEther(totalSupply);

  return totalSupplyFormatted;
}