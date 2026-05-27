import { createPublicClient, http } from 'viem';
import { getWalletClient as getWagmiWalletClient } from 'wagmi/actions';
import { USDRHManagerABI, ERC20ABI } from './abi';
import { USDRHManagerAddress } from './config';
import { robinhoodChain, wagmiConfig } from './wagmi';

export const chain = robinhoodChain;

// Create public client for read operations
export const publicClient = createPublicClient({
  chain,
  transport: http('https://rpc.testnet.chain.robinhood.com')
});

export async function getWalletClient() {
  const walletClient = await getWagmiWalletClient(wagmiConfig);
  if (!walletClient) {
    throw new Error('No connected wallet found');
  }
  return walletClient;
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
