import { createWalletClient, createPublicClient, custom, http } from 'viem';
import { arbitrumSepolia } from 'viem/chains';
import { USDRHManagerABI, ERC20ABI } from './abi';
import { USDRHManagerAddress } from './config';

// Arbitrum Sepolia chain configuration
export const chain = arbitrumSepolia;

// Create public client for read operations
export const publicClient = createPublicClient({
  chain,
  transport: http()
});

// Create wallet client for write operations (requires user wallet connection)
export function getWalletClient() {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    throw new Error('MetaMask not installed');
  }
  
  return createWalletClient({
    chain,
    transport: custom((window as any).ethereum)
  });
}

// Get Manager contract instance for read operations
export function getManagerContract() {
  return {
    address: USDRHManagerAddress as `0x${string}`,
    abi: USDRHManagerABI
  };
}

// Get ERC20 contract instance for a specific token
export function getERC20Contract(tokenAddress: string) {
  return {
    address: tokenAddress as `0x${string}`,
    abi: ERC20ABI
  };
}
