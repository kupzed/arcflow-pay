"use client";

import { X, Loader2, Zap, Wallet } from "lucide-react";
import { useCheckout } from "@/hooks/use-checkout";
import { CheckoutStatus } from "./checkout-status";
import { TokenSelector } from "./token-selector";
import { PaymentSummary } from "./payment-summary";
import { WalletConnectButton } from "@/components/common/wallet-connect-button";
import { formatUsdc } from "@/lib/utils";
import { type SupportedSourceChain, type SupportedToken } from "@/types/checkout";
import { useAccount } from "wagmi";

export function CheckoutModal() {
  const { isConnected } = useAccount();

  const {
    isOpen,
    session,
    selectedSourceChain,
    selectedSourceToken,
    paymentStatus,
    errorMessage,
    isComplete,
    isProcessing,
    closeCheckout,
    setSelectedSourceChain,
    setSelectedSourceToken,
    updateStatus,
    reset,
  } = useCheckout();

  if (!isOpen || !session) return null;

  const isIdle = paymentStatus === "idle";
  const canPay =
    isConnected &&
    isIdle &&
    !!selectedSourceChain &&
    !!selectedSourceToken;

  async function handlePay() {
    if (!canPay || !session) return;
    updateStatus("initiating");

    try {
      updateStatus("waiting_approval");
      await new Promise((r) => setTimeout(r, 2000));
      updateStatus("bridging");
      await new Promise((r) => setTimeout(r, 3000));
      updateStatus("confirming");
      await new Promise((r) => setTimeout(r, 2000));
      updateStatus("completed");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Payment failed. Please retry.";
      updateStatus("failed", msg);
    }
  }

  function handleClose() {
    if (!isProcessing) {
      closeCheckout();
      setTimeout(reset, 300);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="relative z-10 flex w-full max-w-md max-h-[90vh] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl transition-all sm:rounded-3xl"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#ff385c] shadow-sm shadow-[#ff385c]/30">
              <Zap className="size-5 text-white" />
            </div>
            <div>
              <h2
                id="checkout-title"
                className="text-base font-bold text-gray-900"
              >
                ArcFlow Pay
              </h2>
              <p className="text-xs text-gray-500">
                Cross-chain payment to Arc Testnet
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isProcessing}
            aria-label="Close checkout"
            className="flex size-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-40 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto space-y-5 px-6 py-5">
          {/* Order info banner */}
          <div className="flex items-center justify-between rounded-2xl bg-[var(--color-surface-soft)] px-4 py-3 border border-gray-100">
            <div className="flex flex-col">
              <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Order Reference
              </span>
              <span className="font-mono text-sm font-semibold text-gray-900">
                #{session.orderId}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Total Due
              </span>
              <span className="text-base font-bold text-[#ff385c]">
                {formatUsdc(session.amountUsdc)} USDC
              </span>
            </div>
          </div>

          {isIdle && (
            <>
              {/* Chain + Token selection */}
              <TokenSelector
                selectedChain={selectedSourceChain as SupportedSourceChain | null}
                selectedToken={selectedSourceToken as SupportedToken | null}
                onChainChange={(c) => setSelectedSourceChain(c)}
                onTokenChange={(t) => setSelectedSourceToken(t)}
                disabled={!isConnected}
              />

              {/* Summary card */}
              <PaymentSummary
                session={session}
                selectedChain={selectedSourceChain as SupportedSourceChain | null}
                selectedToken={selectedSourceToken as SupportedToken | null}
              />
            </>
          )}

          {/* Status stepper (shown while processing or complete) */}
          {!isIdle && (
            <CheckoutStatus
              status={paymentStatus}
              errorMessage={errorMessage}
            />
          )}
        </div>

        {/* Footer CTA */}
        <div className="shrink-0 border-t border-gray-100 bg-white px-6 py-4">
          {!isConnected ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 p-5 text-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-red-50 text-[#ff385c]">
                <Wallet className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Wallet Connection Required
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Connect your EVM wallet to complete payment
                </p>
              </div>
              <WalletConnectButton />
            </div>
          ) : isComplete ? (
            <button
              onClick={handleClose}
              className="w-full rounded-xl bg-gray-900 py-3.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors shadow-sm"
            >
              Done
            </button>
          ) : (
            <button
              id="pay-now-btn"
              onClick={handlePay}
              disabled={!canPay || isProcessing}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff385c] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#e00b41] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 shadow-md shadow-[#ff385c]/25"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Processing Transaction…
                </>
              ) : (
                <>
                  <Zap className="size-4 fill-white" />
                  Pay {formatUsdc(session.amountUsdc)} USDC
                </>
              )}
            </button>
          )}

          <p className="mt-3 text-center text-[11px] text-gray-400">
            Secured by Circle CCTP & Arc Network
          </p>
        </div>
      </div>
    </div>
  );
}
