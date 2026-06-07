'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { USDRHTokenAddress, USDRHManagerAddress, EXPLORER_URL, stocksTokens } from '@/lib/config';

function CopyButton({ text }: { text: string }) {
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <button
      onClick={copy}
      className="shrink-0 rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
    >
      Copy
    </button>
  );
}

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 mb-6 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">Developers</h1>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
            Smart contract addresses and technical reference for RobinUSD.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">Overview</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
            RobinUSD (<span className="font-mono text-sm">USDRh</span>) is a decentralized stablecoin
            protocol on the <strong>Robinhood Chain</strong>.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Users deposit supported stock tokens as collateral to mint USDRh stablecoins. The protocol
            tracks collateral, manages minting/redeeming, and collects fees through two core smart
            contracts: the <strong>USDRH Token</strong> (ERC-20) and the{' '}
            <strong>USDRH Manager</strong>.
          </p>
        </section>

        {/* Token Contract */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">USDRH Token</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            The ERC-20 stablecoin token minted when users deposit collateral and burned when they redeem.
          </p>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                    Contract Address (Testnet)
                  </p>
                  <code className="text-sm font-mono text-zinc-900 dark:text-zinc-50 break-all">
                    {USDRHTokenAddress}
                  </code>
                </div>
                <CopyButton text={USDRHTokenAddress} />
              </div>
            </div>
            <div className="border-t border-zinc-200 dark:border-zinc-800 px-5 py-3 bg-zinc-50 dark:bg-zinc-800/50">
              <a
                href={`${EXPLORER_URL}/address/${USDRHTokenAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent-600 dark:text-accent-400 hover:underline"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View on Explorer
              </a>
            </div>
          </div>
        </section>

        {/* Manager Contract */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">USDRH Manager</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            The core protocol contract that handles deposits, minting, burning, redeeming, liquidations,
            and price feeds.
          </p>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                    Contract Address (Testnet)
                  </p>
                  <code className="text-sm font-mono text-zinc-900 dark:text-zinc-50 break-all">
                    {USDRHManagerAddress}
                  </code>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(USDRHManagerAddress)}
                  className="ml-4 shrink-0 rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
            <div className="border-t border-zinc-200 dark:border-zinc-800 px-5 py-3 bg-zinc-50 dark:bg-zinc-800/50 space-y-2">
              <a
                href={`${EXPLORER_URL}/address/${USDRHManagerAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent-600 dark:text-accent-400 hover:underline"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View on Explorer
              </a>
            </div>
          </div>
        </section>

        {/* Key Functions */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">Key Functions</h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
                  <th className="text-left px-5 py-3 font-semibold text-zinc-900 dark:text-zinc-50">Contract</th>
                  <th className="text-left px-5 py-3 font-semibold text-zinc-900 dark:text-zinc-50">Function</th>
                  <th className="text-left px-5 py-3 font-semibold text-zinc-900 dark:text-zinc-50">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                  <td className="px-5 py-3 font-mono text-xs text-zinc-500">Manager</td>
                  <td className="px-5 py-3 font-mono text-sm text-zinc-900 dark:text-zinc-50">depositAndMint(token, amount)</td>
                  <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">Deposit stock tokens and mint USDRh</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                  <td className="px-5 py-3 font-mono text-xs text-zinc-500">Manager</td>
                  <td className="px-5 py-3 font-mono text-sm text-zinc-900 dark:text-zinc-50">burnAndRedeem(token, stableAmount)</td>
                  <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">Burn USDRh and redeem stock tokens</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                  <td className="px-5 py-3 font-mono text-xs text-zinc-500">Manager</td>
                  <td className="px-5 py-3 font-mono text-sm text-zinc-900 dark:text-zinc-50">getUserCollateralInfo(user)</td>
                  <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">Get all collateral positions for a user</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                  <td className="px-5 py-3 font-mono text-xs text-zinc-500">Manager</td>
                  <td className="px-5 py-3 font-mono text-sm text-zinc-900 dark:text-zinc-50">getTotalReservesBalances()</td>
                  <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">Get total protocol reserves across all tokens</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                  <td className="px-5 py-3 font-mono text-xs text-zinc-500">Manager</td>
                  <td className="px-5 py-3 font-mono text-sm text-zinc-900 dark:text-zinc-50">getLatestPrice(token)</td>
                  <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">Get the current price for a token</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                  <td className="px-5 py-3 font-mono text-xs text-zinc-500">Manager</td>
                  <td className="px-5 py-3 font-mono text-sm text-zinc-900 dark:text-zinc-50">totalFees()</td>
                  <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">Get accumulated protocol fees</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                  <td className="px-5 py-3 font-mono text-xs text-zinc-500">Token</td>
                  <td className="px-5 py-3 font-mono text-sm text-zinc-900 dark:text-zinc-50">totalSupply()</td>
                  <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">Total USDRh tokens in circulation</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                  <td className="px-5 py-3 font-mono text-xs text-zinc-500">Token</td>
                  <td className="px-5 py-3 font-mono text-sm text-zinc-900 dark:text-zinc-50">balanceOf(account)</td>
                  <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">USDRh balance of an address</td>
                </tr>
                <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                  <td className="px-5 py-3 font-mono text-xs text-zinc-500">Token</td>
                  <td className="px-5 py-3 font-mono text-sm text-zinc-900 dark:text-zinc-50">transfer(to, amount)</td>
                  <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">Transfer USDRh to another address</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Stock Tokens */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">Supported Stock Tokens</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            These ERC-20 tokens represent real stock shares on Robinhood Chain and are accepted as
            collateral in the protocol.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(stocksTokens).map(([symbol, address]) => (
              <div
                key={symbol}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4"
              >
                <p className="text-lg font-bold text-zinc-900 dark:text-white mb-1">{symbol}</p>
                <code className="text-xs font-mono text-zinc-500 break-all">{address}</code>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(address)}
                    className="text-xs text-accent-600 dark:text-accent-400 hover:underline"
                  >
                    Copy
                  </button>
                  <a
                    href={`${EXPLORER_URL}/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent-600 dark:text-accent-400 hover:underline"
                  >
                    Explorer
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Network Info */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">Network</h2>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="px-5 py-3 font-medium text-zinc-700 dark:text-zinc-300">Chain Name</td>
                  <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">Robinhood Chain Testnet</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-medium text-zinc-700 dark:text-zinc-300">Chain ID</td>
                  <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">
                    <code className="rounded bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5">46630</code>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-medium text-zinc-700 dark:text-zinc-300">RPC URL</td>
                  <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">
                    <code className="rounded bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 text-xs">https://rpc.testnet.chain.robinhood.com</code>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-medium text-zinc-700 dark:text-zinc-300">Native Currency</td>
                  <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">ETH (18 decimals)</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-medium text-zinc-700 dark:text-zinc-300">Explorer</td>
                  <td className="px-5 py-3">
                    <a
                      href={EXPLORER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-600 dark:text-accent-400 hover:underline"
                    >
                      {EXPLORER_URL}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-12">
          <div className="flex flex-col items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <Link href="/" className="font-semibold text-zinc-700 dark:text-zinc-300 hover:underline">
              RobinUSD
            </Link>
            <p>&copy; {new Date().getFullYear()} RobinUSD. Built on Robinhood Chain.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
