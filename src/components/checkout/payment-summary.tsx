import { ArrowRight, Info, ShieldCheck } from "lucide-react";
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
    <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4 space-y-3.5 text-sm shadow-inner">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Payment Route Details
        </p>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <ShieldCheck className="size-3" />
          Verified
        </span>
      </div>

      {/* Amount row */}
      <div className="flex items-center justify-between border-b border-gray-200/60 pb-2.5">
        <span className="text-gray-600 font-medium">Merchant Charge</span>
        <span className="text-base font-bold text-gray-900">
          {formatUsdc(session.amountUsdc)} USDC
        </span>
      </div>

      {/* Route row */}
      {isReadyToEstimate ? (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Payment Route</span>
            <div className="flex items-center gap-1.5">
              <NetworkBadge chain={selectedChain} size="sm" />
              <ArrowRight className="size-3.5 text-gray-400" />
              <NetworkBadge chain="arc-testnet" size="sm" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Bridge Protocol</span>
            <span className="font-semibold text-gray-800">
              Circle CCTP (Unified Balance)
            </span>
          </div>

          {/* Fee estimate */}
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-gray-500">
              Estimated Bridge Fee
              <Info className="size-3 text-gray-400" />
            </span>
            <span className="font-mono text-gray-700">
              {session.estimatedFee ? `≈ ${formatUsdc(session.estimatedFee)} USDC` : "Low / Free"}
            </span>
          </div>

          <div className="border-t border-gray-200/60 pt-2.5 flex items-center justify-between">
            <span className="font-semibold text-gray-700">
              Merchant Receives
            </span>
            <span className="text-base font-extrabold text-[#ff385c]">
              {formatUsdc(session.amountUsdc)} USDC
            </span>
          </div>
        </div>
      ) : (
        <p className="text-xs text-gray-500 italic">
          Select a source network and payment token above to view details.
        </p>
      )}

      {/* Destination note */}
      <div className="pt-1 text-[11px] text-gray-400 flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-[#ff385c] animate-pulse" />
        <span>
          Settles directly on <strong className="text-gray-700 font-semibold">Arc Testnet</strong> with sub-second finality.
        </span>
      </div>
    </div>
  );
}
