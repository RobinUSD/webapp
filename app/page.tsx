import Link from 'next/link';

const stockTickers = ['TSLA', 'AMZN', 'PLTR', 'NFLX', 'AMD'];

const features = [
  {
    title: 'Real Asset Backing',
    desc: 'Every USDRh is backed by real stock tokens, ensuring intrinsic value',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Decentralized',
    desc: 'No central authority controls the protocol — it runs on smart contracts',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Transparent',
    desc: 'All transactions and collateral are visible on the blockchain',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Flexible',
    desc: 'Deposit, mint, send, or redeem at any time with full control of your assets',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    ),
  },
];

const steps = [
  { num: '1', title: 'Deposit Stock Tokens', desc: 'Connect your wallet and deposit supported stock tokens as collateral' },
  { num: '2', title: 'Mint USDRh', desc: 'Receive USDRh stablecoins equal to the value of your collateral' },
  { num: '3', title: 'Use in DeFi protocols', desc: 'Use your USDRh stablecoins in DeFi protocols to earn interest or trade' },
  { num: '4', title: 'Send or redeem', desc: 'Send USDRh to others or burn it to redeem your stock tokens' },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-accent-500/5 to-zinc-50 dark:from-brand-950 dark:via-accent-950 dark:to-zinc-950" />
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950/50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:text-brand-300 mb-8">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            Live on Robinhood Chain
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-7xl">
            <span className="bg-gradient-to-r from-brand-500 via-brand-600 to-accent-500 bg-clip-text text-transparent">
              RobinUSD
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
            A decentralized stablecoin backed by real stock tokens — mint, send, and redeem USDRh
            with full transparency on Robinhood Chain.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/app"
              className="rounded-xl bg-brand-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition-all duration-200 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/30 hover:-translate-y-0.5"
            >
              Launch Platform
            </Link>
            <Link
              href="#how-it-works"
              className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-8 py-3.5 text-base font-semibold text-zinc-700 dark:text-zinc-300 transition-all duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:-translate-y-0.5"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stock Ticker */}
      <section className="relative border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-4 overflow-hidden">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {[...stockTickers, ...stockTickers].map((ticker, i) => (
            <span
              key={`${ticker}-${i}`}
              className="inline-flex items-center gap-3 text-sm font-semibold text-zinc-400 dark:text-zinc-500"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {ticker}
            </span>
          ))}
        </div>
      </section>

      {/* What is RobinUSD */}
      <section className="relative py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
              What is RobinUSD?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              RobinUSD <span className="font-bold text-md">(USDRh)</span> is a
              decentralized stablecoin backed by real stock tokens. By depositing stock tokens as
              collateral, users can mint USDRh stablecoins that maintain a stable value while being
              fully collateralized by real assets.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="relative py-24 bg-white dark:bg-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-500/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-white sm:text-4xl mb-16">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.num} className="relative text-center animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg shadow-brand-500/20">
                  <span className="text-2xl font-bold text-white">{step.num}</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-zinc-300 dark:text-zinc-700">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image*/}
      <section className="relative py-24 flex justify-center items-center">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <img src="/images/image_robinusd_1.png" alt="RobinUSD" width={400} height={400} className="rounded-2xl" />
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-white sm:text-4xl mb-16">
            Benefits
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 transition-all duration-200 hover:shadow-lg hover:border-brand-200 dark:hover:border-brand-800"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Tokens */}
      <section className="relative py-24 bg-white dark:bg-zinc-900">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-white sm:text-4xl mb-16">
            Supported Stock Tokens
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {stockTickers.map((token) => (
              <div
                key={token}
                className="flex h-20 w-20 items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 font-bold text-zinc-900 dark:text-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                {token}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 to-accent-500/5" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Connect your wallet and start minting USDRh stablecoins today
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition-all duration-200 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/30 hover:-translate-y-0.5"
          >
            Launch Platform
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-8">
        <div className="mx-auto max-w-5xl px-6 flex flex-col items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            RobinUSD
          </span>
          <p>&copy; {new Date().getFullYear()} RobinUSD. Built on Robinhood Chain.</p>
        </div>
      </footer>
    </div>
  );
}
