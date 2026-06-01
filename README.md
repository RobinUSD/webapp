# RobinUSD (USDRh)

A decentralized stablecoin dApp backed by real stock tokens, built on the **Robinhood Chain**. Users can deposit stock tokens as collateral, mint USDRh stablecoins, send them to others, and burn them to redeem their collateral — all through a modern web interface.

## Features

- **Deposit & Mint** — Deposit supported stock tokens (TSLA, AMZN, PLTR, NFLX, AMD) as collateral and mint USDRh stablecoins at the current collateral ratio
- **Burn & Redeem** — Burn USDRh tokens to redeem your deposited stock tokens
- **Send** — Transfer USDRh to any address
- **Status** — View total USDRh supply, protocol reserves, and accumulated fees
- **Wallet** — Connect via MetaMask (injected) or WalletConnect
- **Dark mode** — Automatic system-preference-based dark theme

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [wagmi v3](https://wagmi.sh/) + [viem v2](https://viem.sh/) — Ethereum interaction
- [WalletConnect](https://walletconnect.com/) — Wallet connection
- [TanStack React Query](https://tanstack.com/query/latest) — Server state management

## Network

Robin USD runs on the **Robinhood Chain Testnet**, a custom Arbitrum L2.

| Property | Value |
|---|---|
| Chain ID | `46630` |
| RPC URL | `https://rpc.testnet.chain.robinhood.com` |
| Native Currency | ETH (18 decimals) |

## Smart Contracts

All contracts are deployed on Robinhood Chain Testnet.

### Main Contracts

| Contract | Address |
|---|---|
| USDRH Token | [`0xb9cA08D3B4289BbEEA6d933A6CA61A25b2868A90`](https://explorer.testnet.chain.robinhood.com/address/0xb9cA08D3B4289BbEEA6d933A6CA61A25b2868A90) |
| USDRH Manager | [`0xde4CBfA3d414647dEF3C3c89Dcd8BcE4d4213c83`](https://explorer.testnet.chain.robinhood.com/address/0xde4CBfA3d414647dEF3C3c89Dcd8BcE4d4213c83) |

### Supported Stock Tokens

| Ticker | Address |
|---|---|
| TSLA | [`0xC9f9c86933092BbbfFF3CCb4b105A4A94bf3Bd4E`](https://explorer.testnet.chain.robinhood.com/address/0xC9f9c86933092BbbfFF3CCb4b105A4A94bf3Bd4E) |
| AMZN | [`0x5884aD2f920c162CFBbACc88C9C51AA75eC09E02`](https://explorer.testnet.chain.robinhood.com/address/0x5884aD2f920c162CFBbACc88C9C51AA75eC09E02) |
| PLTR | [`0x1FBE1a0e43594b3455993B5dE5Fd0A7A266298d0`](https://explorer.testnet.chain.robinhood.com/address/0x1FBE1a0e43594b3455993B5dE5Fd0A7A266298d0) |
| NFLX | [`0x3b8262A63d25f0477c4DDE23F83cfe22Cb768C93`](https://explorer.testnet.chain.robinhood.com/address/0x3b8262A63d25f0477c4DDE23F83cfe22Cb768C93) |
| AMD | [`0x71178BAc73cBeb415514eB542a8995b82669778d`](https://explorer.testnet.chain.robinhood.com/address/0x71178BAc73cBeb415514eB542a8995b82669778d) |


## Project Structure

```
├── app/
│   ├── actions/          # Contract interaction functions
│   │   ├── deposit.tsx   #   depositAndMint
│   │   ├── pay.tsx       #   transfer
│   │   ├── return.tsx    #   burnAndRedeem + getUserCollateralInfo
│   │   └── status.tsx    #   totalSupply, getTotalReservesBalances, totalFees
│   ├── app/              # App pages (dashboard, deposit, pay, return, status)
│   ├── globals.css       # Global styles + design tokens
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Landing page
├── components/           # Shared UI components
│   ├── ActionCard.tsx    #   Dashboard navigation card
│   ├── AppShell.tsx      #   Shared page layout
│   ├── BalanceCard.tsx   #   Token balance display card
│   ├── FormInput.tsx     #   Form input + select
│   ├── Skeleton.tsx      #   Loading placeholder
│   ├── StockIcon.tsx     #   Stock ticker avatar
│   └── Toast.tsx         #   Toast notification system
├── contexts/
│   ├── WalletContext.tsx # Wallet connection + balance state
│   └── Web3Provider.tsx  # Wagmi + React Query provider
├── lib/
│   ├── abi.ts            # Contract ABIs
│   ├── config.ts         # Contract addresses
│   ├── viem.ts           # Viem client setup
│   └── wagmi.ts          # Wagmi config + chain definition
├── .env.example          # Environment variables template
├── next.config.ts        # Next.js configuration
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A wallet (MetaMask or WalletConnect-compatible wallet) connected to Robinhood Chain Testnet

### Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | No* | WalletConnect Project ID (needed for WalletConnect QR modal) |

\* Skip if you only plan to use MetaMask (injected connector).

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Usage Flow

1. **Connect your wallet** — Click "Connect Wallet" and select MetaMask or WalletConnect
2. **Deposit stock tokens** — Navigate to Deposit & Mint, select a token (e.g. TSLA), enter the amount, and confirm the transaction
3. **USDRh is minted** — You receive USDRh tokens proportional to your deposited collateral (minus any mint fee)
4. **Send USDRh** — Use the Pay page to transfer USDRh to any address
5. **Burn & Redeem** — On the Return page, burn USDRh to get your stock tokens back
6. **Monitor** — The Status page shows total supply, protocol reserves, and accumulated fees

## Design

Custom design system with:
- **Brand palette** — Robinhood green (`#00C805`) primary with Arbitrum blue accents
- **Glass morphism** — Card components with backdrop blur and subtle shadows
- **Animations** — Fade-in, slide-up, marquee ticker, loading shimmer
- **Responsive** — Adapts from mobile to desktop
- **Dark mode** — Automatic via `prefers-color-scheme`

Built entirely with Tailwind CSS v4 — no external component library.
