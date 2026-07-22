"use client";

import { useCheckout } from "@/hooks/use-checkout";
import type { CheckoutSession } from "@/types/checkout";

export function DemoButton({ session }: { session: CheckoutSession }) {
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
