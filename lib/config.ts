export const USDRHManagerAddress = "0x758AB6eC7992E8752c5f43b5e4Eb619643312079";
export const USDRHTokenAddress = "0x641D5c4c02C63755FB97A2BCc59623451cA7D825";

export const EXPLORER_URL = "https://explorer.testnet.chain.robinhood.com";

// Stocks tokens
export const stocksTokens = {
  "TSLA": "0xC9f9c86933092BbbfFF3CCb4b105A4A94bf3Bd4E",
  "AMZN": "0x5884aD2f920c162CFBbACc88C9C51AA75eC09E02",
  "PLTR": "0x1FBE1a0e43594b3455993B5dE5Fd0A7A266298d0",
  "NFLX": "0x3b8262A63d25f0477c4DDE23F83cfe22Cb768C93",
  "AMD": "0x71178BAc73cBeb415514eB542a8995b82669778d"
} as const;

export type StockToken = keyof typeof stocksTokens;
