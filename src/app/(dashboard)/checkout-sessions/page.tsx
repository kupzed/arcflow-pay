import type { Metadata } from "next";
import { CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Checkout Sessions",
};

const STATUS_CLASSES: Record<string, string> = {
  completed: "afp-status-completed",
  pending: "afp-status-pending",
  bridging: "afp-status-bridging",
  failed: "afp-status-failed",
  expired: "afp-status-expired",
};

const COLUMNS = ["Order ID", "Amount", "Source Chain", "Status", "Created"];

export default function CheckoutSessionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-ink)]">
          Checkout Sessions
        </h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          All cross-chain payment sessions created for your merchant account.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-[var(--color-hairline-soft)] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-hairline-soft)] bg-[var(--color-surface-soft)]">
                {COLUMNS.map((col) => (
                  <th
                    key={col}
                    className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Empty state row */}
              <tr>
                <td colSpan={COLUMNS.length} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--color-surface-soft)]">
                      <CreditCard className="size-6 text-[var(--color-muted)]" />
                    </div>
                    <p className="text-sm font-medium text-[var(--color-ink)]">
                      No checkout sessions yet
                    </p>
                    <p className="text-xs text-[var(--color-muted)]">
                      Sessions will appear here once customers start using your
                      ArcFlow Pay widget.
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Status legend */}
      <div className="flex flex-wrap items-center gap-3">
        {Object.entries(STATUS_CLASSES).map(([status, cls]) => (
          <span
            key={status}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium capitalize ${cls}`}
          >
            {status}
          </span>
        ))}
      </div>
    </div>
  );
}
