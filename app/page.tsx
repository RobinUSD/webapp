import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            Robin USD
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            A stablecoin backed by real stock tokens on Robinhood Chain
          </p>
          <Link
            href="/app"
            className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Launch Platform
          </Link>
        </div>
      </section>

      {/* What is Robin USD */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            What is Robin USD?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            Robin USD (USDRh) is a decentralized stablecoin backed by real stock tokens. 
            By depositing stock tokens as collateral, users can mint USDRh stablecoins that 
            maintain a stable value while being fully collateralized by real assets.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Built on the Robinhood Chain, Robin USD provides a transparent and 
            secure way to access stable value without relying on traditional fiat reserves.
          </p>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white dark:bg-slate-800 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            How It Works
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Deposit Stock Tokens
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Connect your wallet and deposit supported stock tokens as collateral
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Mint USDRh
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Receive USDRh stablecoins equal to the value of your collateral
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Use or Redeem
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Send USDRh to others or burn it to redeem your stock tokens
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Real Asset Backing
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Every USDRh is backed by real stock tokens, ensuring intrinsic value
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Decentralized
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                No central authority controls the protocol - it runs on smart contracts
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Transparent
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                All transactions and collateral are visible on the blockchain
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Flexible
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Deposit, mint, send, or redeem at any time with full control
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Tokens */}
      <section className="bg-white dark:bg-slate-800 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            Supported Stock Tokens
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6">
            {['TSLA', 'AMZN', 'PLTR', 'NFLX', 'AMD'].map((token) => (
              <div key={token} className="text-center">
                <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-6 mb-3">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">{token}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Connect your wallet and start minting USDRh stablecoins today
          </p>
          <Link
            href="/app"
            className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Launch Platform
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2026 Robin USD. Built on Robinhood Chain.</p>
        </div>
      </footer>
    </div>
  );
}
