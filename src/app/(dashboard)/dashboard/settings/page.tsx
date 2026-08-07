import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-ink)]">Settings</h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Configure your merchant profile and Arc wallet address.
        </p>
      </div>

      {/* Merchant Wallet Section */}
      <section className="rounded-2xl border border-[var(--color-hairline-soft)] bg-white p-6">
        <h2 className="mb-1 text-base font-semibold text-[var(--color-ink)]">
          Arc Testnet Wallet
        </h2>
        <p className="mb-5 text-sm text-[var(--color-muted)]">
          All USDC payments will be delivered to this address on Arc Testnet
          (Chain ID: 5042002).
        </p>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="wallet-address"
              className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]"
            >
              Wallet Address
            </label>
            <input
              id="wallet-address"
              type="text"
              placeholder="0x..."
              pattern="^0x[a-fA-F0-9]{40}$"
              className="w-full rounded-xl border border-[var(--color-hairline)] bg-white px-4 py-3 font-mono text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-muted-soft)] focus:border-[#ff385c] focus:ring-2 focus:ring-[#ff385c]/20 transition-colors"
            />
            <p className="mt-1.5 text-xs text-[var(--color-muted)]">
              Enter your 0x Ethereum-compatible wallet address on Arc Testnet.
            </p>
          </div>
          <button
            type="button"
            className="afp-btn-primary rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
          >
            Save Wallet
          </button>
        </div>
      </section>

      {/* Webhook Section */}
      <section className="rounded-2xl border border-[var(--color-hairline-soft)] bg-white p-6">
        <h2 className="mb-1 text-base font-semibold text-[var(--color-ink)]">
          Webhook
        </h2>
        <p className="mb-5 text-sm text-[var(--color-muted)]">
          ArcFlow Pay will send a POST request to this URL when a payment is
          confirmed on Arc Testnet.
        </p>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="webhook-url"
              className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]"
            >
              Webhook URL
            </label>
            <input
              id="webhook-url"
              type="url"
              placeholder="https://your-store.com/api/webhooks/arcflow"
              className="w-full rounded-xl border border-[var(--color-hairline)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-muted-soft)] focus:border-[#ff385c] focus:ring-2 focus:ring-[#ff385c]/20 transition-colors"
            />
          </div>
          <button
            type="button"
            className="afp-btn-primary rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
          >
            Save Webhook
          </button>
        </div>
      </section>

      {/* Network info */}
      <section className="rounded-2xl border border-[var(--color-hairline-soft)] bg-[var(--color-surface-soft)] p-5">
        <h3 className="mb-3 text-sm font-semibold text-[var(--color-ink)]">
          Arc Testnet Network Details
        </h3>
        <dl className="grid gap-2 text-sm sm:grid-cols-2">
          {[
            ["Network", "Arc Testnet"],
            ["Chain ID", "5042002"],
            ["Currency", "USDC (native gas)"],
            ["RPC", "https://rpc.testnet.arc.network"],
            ["Explorer", "testnet.arcscan.app"],
            ["Faucet", "faucet.circle.com"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-2">
              <dt className="text-[var(--color-muted)]">{k}</dt>
              <dd className="font-mono text-xs font-medium text-[var(--color-ink)]">
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
