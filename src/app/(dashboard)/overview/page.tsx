import type { Metadata } from "next";
import { TrendingUp, Zap, CreditCard, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Overview",
};

const STATS = [
  {
    id: "volume",
    label: "Total Volume",
    value: "—",
    unit: "USDC",
    icon: TrendingUp,
    color: "text-green-600 bg-green-50",
  },
  {
    id: "transactions",
    label: "Total Transactions",
    value: "—",
    unit: "",
    icon: Zap,
    color: "text-blue-600 bg-blue-50",
  },
  {
    id: "completed",
    label: "Completed",
    value: "—",
    unit: "",
    icon: CreditCard,
    color: "text-[#ff385c] bg-[#ff385c]/10",
  },
  {
    id: "pending",
    label: "Pending / Bridging",
    value: "—",
    unit: "",
    icon: AlertCircle,
    color: "text-amber-600 bg-amber-50",
  },
];

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-ink)]">Overview</h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Your ArcFlow Pay dashboard — payments received on Arc Testnet.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ id, label, value, unit, icon: Icon, color }) => (
          <div
            key={id}
            className="afp-card rounded-2xl border border-[var(--color-hairline-soft)] bg-white p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium text-[var(--color-muted)]">
                {label}
              </p>
              <div className={`flex size-8 items-center justify-center rounded-xl ${color}`}>
                <Icon className="size-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[var(--color-ink)]">
              {value}
              {unit && (
                <span className="ml-1 text-sm font-normal text-[var(--color-muted)]">
                  {unit}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Empty state placeholder */}
      <div className="rounded-3xl border border-[var(--color-hairline-soft)] bg-white p-12 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#ff385c]/10">
          <Zap className="size-7 text-[#ff385c]" />
        </div>
        <h3 className="mb-2 text-base font-semibold text-[var(--color-ink)]">
          No payments yet
        </h3>
        <p className="mx-auto max-w-sm text-sm text-[var(--color-muted)]">
          Configure your merchant wallet in{" "}
          <a
            href="/dashboard/settings"
            className="font-medium text-[#ff385c] hover:underline"
          >
            Settings
          </a>
          , then embed the ArcFlow Pay widget in your store to start receiving
          cross-chain USDC payments.
        </p>
      </div>
    </div>
  );
}
