import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Globe, Shield, Clock } from "lucide-react";
import { CheckoutModal } from "@/components/checkout/checkout-modal";

export const metadata: Metadata = {
  title: "ArcFlow Pay — Cross-Chain USDC Checkout",
  description:
    "Accept payments from any EVM chain. Your customers pay with any token; you receive USDC instantly on Arc Network.",
};

const FEATURES = [
  {
    icon: Globe,
    title: "Any Chain, Any Token",
    description:
      "Buyers can pay from Ethereum, Arbitrum, Optimism, or Polygon with ETH, MATIC, ARB, or USDC. Circle CCTP handles the cross-chain bridge automatically.",
  },
  {
    icon: Clock,
    title: "Sub-Second Settlement",
    description:
      "Arc Network's deterministic finality confirms transactions in under a second. Merchants receive USDC the moment the bridge completes.",
  },
  {
    icon: Shield,
    title: "Stable Fees, Always",
    description:
      "Arc's stablecoin-native fee model means predictable, low transaction costs — no volatile gas spikes, no surprises.",
  },
  {
    icon: Zap,
    title: "One Widget, Infinite Chains",
    description:
      "Drop the ArcFlow Pay modal into any e-commerce site with a few lines of code. Your customers never leave your store.",
  },
];

const DEMO_SESSION = {
  id: "demo-session",
  merchantId: "demo-merchant",
  orderId: "ORD-2024-001",
  amountUsdc: "50000000", // 50.00 USDC (6 decimals)
  merchantAddress: "0x1234567890123456789012345678901234567890" as `0x${string}`,
  status: "idle" as const,
  expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-20 pb-24">
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-24 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-[#ff385c]/5 blur-3xl" />
          <div className="absolute top-40 right-0 size-80 rounded-full bg-[#ff385c]/3 blur-2xl" />
        </div>

        <div className="mx-auto max-w-4xl px-6 text-center">
          {/* Badge */}
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ff385c]/20 bg-[#ff385c]/5 px-4 py-1.5 text-xs font-semibold text-[#ff385c]">
            <Zap className="size-3" />
            Arc Community Contribution
          </span>

          <h1 className="mb-6 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-[var(--color-ink)]">
            Cross-Chain Checkout,{" "}
            <span className="text-[#ff385c]">Powered by Arc</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
            Your customers pay with any EVM token from any chain. You receive{" "}
            <strong className="text-[var(--color-ink)]">USDC on Arc Network</strong> — instantly, with stable fees and
            sub-second finality.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/login"
              className="afp-btn-primary inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold text-white no-underline"
            >
              Get Started
              <ArrowRight className="size-4" />
            </Link>
            <DemoButton session={DEMO_SESSION} />
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            {["Circle CCTP", "Arc Network", "EVM Compatible", "Open Source"].map(
              (badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted)]"
                >
                  <span className="size-1.5 rounded-full bg-[#ff385c]" />
                  {badge}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[var(--color-surface-soft)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-[var(--color-ink)]">
              How it works
            </h2>
            <p className="text-[var(--color-muted)]">
              Three steps from any chain to USDC on Arc
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Buyer selects source",
                desc: "Customer picks their preferred chain (Arbitrum, Polygon, etc.) and token to pay with.",
              },
              {
                step: "02",
                title: "Circle bridges funds",
                desc: "Circle CCTP and Arc App Kit's Unified Balance automatically bridge and swap to USDC.",
              },
              {
                step: "03",
                title: "Merchant gets USDC",
                desc: "USDC arrives on Arc Testnet in seconds with deterministic finality. Webhook notifies your backend.",
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="afp-card relative overflow-hidden rounded-2xl bg-white p-6"
              >
                <span className="mb-4 block text-5xl font-black text-[#ff385c]/10">
                  {step}
                </span>
                <h3 className="mb-2 text-base font-semibold text-[var(--color-ink)]">
                  {title}
                </h3>
                <p className="text-sm text-[var(--color-muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-[var(--color-ink)]">
              Built for the onchain economy
            </h2>
            <p className="text-[var(--color-muted)]">
              Everything you need to accept stablecoin payments globally
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="afp-card rounded-2xl border border-[var(--color-hairline-soft)] bg-white p-6"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-[#ff385c]/10">
                  <Icon className="size-5 text-[#ff385c]" />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                  {title}
                </h3>
                <p className="text-xs leading-relaxed text-[var(--color-muted)]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--color-ink)] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Start accepting payments today
          </h2>
          <p className="mb-8 text-[var(--color-muted-soft)]">
            Connect your wallet, set your Arc address, and embed the widget in
            minutes.
          </p>
          <Link
            href="/signup"
            className="afp-btn-primary inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold text-white no-underline"
          >
            Create Free Account
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Checkout Modal (rendered globally) */}
      <CheckoutModal />
    </>
  );
}

// Client component just for demo button interaction
function DemoButton({
  session,
}: {
  session: typeof DEMO_SESSION;
}) {
  "use client";
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useCheckout } = require("@/hooks/use-checkout");
  const { startCheckout } = useCheckout();

  return (
    <button
      id="demo-checkout-btn"
      onClick={() => startCheckout(session)}
      className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-hairline)] bg-white px-8 py-3.5 text-base font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-soft)]"
    >
      Try Demo Checkout
    </button>
  );
}
