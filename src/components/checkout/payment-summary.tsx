import { ArrowRight, Info } from "lucide-react";
import { NetworkBadge } from "@/components/common/network-badge";
import { type CheckoutSession, type SupportedSourceChain, type SupportedToken } from "@/types/checkout";
import { formatUsdc } from "@/lib/utils";

interface PaymentSummaryProps {
  session: CheckoutSession;
  selectedChain: SupportedSourceChain | null;
  selectedToken: SupportedToken | null;
}

export function PaymentSummary({
  session,
  selectedChain,
  selectedToken,
}: PaymentSummaryProps) {
  const isReadyToEstimate = !!selectedChain && !!selectedToken;

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 space-y-3">
      {/* Header */}
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        Payment Summary
      </p>

      {/* Amount row */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Amount</span>
        <span className="text-base font-semibold text-gray-900">
          {formatUsdc(session.amountUsdc)} USDC
        </span>
      </div>

      {/* Route row */}
      {isReadyToEstimate && (
        <>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Route</span>
            <div className="flex items-center gap-1.5">
              <NetworkBadge chain={selectedChain} size="sm" />
              <ArrowRight className="size-3 text-gray-400" />
              <NetworkBadge chain="arc-testnet" size="sm" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Via</span>
            <span className="text-sm font-medium text-gray-900">
              Circle CCTP + Unified Balance
            </span>
          </div>

          {/* Fee estimate */}
          {session.estimatedFee && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-sm text-gray-600">
                Est. fee
                <Info className="size-3 text-gray-400" />
              </span>
              <span className="text-sm text-gray-900">
                ≈ {formatUsdc(session.estimatedFee)} USDC
              </span>
            </div>
          )}

          <div className="border-t border-gray-200 pt-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              Merchant receives
            </span>
            <span className="text-base font-bold text-gray-900">
              {formatUsdc(session.amountUsdc)} USDC
            </span>
          </div>
        </>
      )}

      {/* Destination note */}
      <p className="text-xs text-gray-400">
        Delivered to merchant on{" "}
        <span className="font-medium text-[#FF385C]">Arc Testnet</span> in
        seconds.
      </p>
    </div>
  );
}
