"use client";

import { X, Loader2, Zap } from "lucide-react";
import { useCheckout } from "@/hooks/use-checkout";
import { CheckoutStatus } from "./checkout-status";
import { TokenSelector } from "./token-selector";
import { PaymentSummary } from "./payment-summary";
import { WalletConnectButton } from "@/components/common/wallet-connect-button";
import { formatUsdc, formatAddress } from "@/lib/utils";
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
      // TODO: Integrate @circle-fin/app-kit Unified Balance / Bridge flow here
      // Example: await AppKit.bridge({ from: selectedSourceChain, token: selectedSourceToken, amount: session.amountUsdc, to: "arc-testnet" });
      updateStatus("waiting_approval");
      // Simulate bridging (replace with real App Kit call)
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
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="fixed inset-x-4 bottom-0 z-50 mx-auto max-w-md rounded-t-3xl bg-white pb-safe shadow-2xl sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-[#FF385C]">
              <Zap className="size-4 text-white" />
            </div>
            <div>
              <h2
                id="checkout-title"
                className="text-base font-semibold text-gray-900"
              >
                ArcFlow Pay
              </h2>
              <p className="text-xs text-gray-400">
                Pay with any chain → receive USDC on Arc
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isProcessing}
            aria-label="Close checkout"
            className="flex size-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-40"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 px-6 py-5">
          {/* Order info */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Order{" "}
              <span className="font-mono text-xs text-gray-700">
                #{session.orderId}
              </span>
            </span>
            <span className="font-semibold text-gray-900">
              {formatUsdc(session.amountUsdc)} USDC
            </span>
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
        <div className="border-t border-gray-100 px-6 py-5">
          {!isConnected ? (
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-gray-500">
                Connect your wallet to pay
              </p>
              <WalletConnectButton />
            </div>
          ) : isComplete ? (
            <button
              onClick={handleClose}
              className="w-full rounded-2xl bg-gray-900 py-3.5 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Done
            </button>
          ) : (
            <button
              id="pay-now-btn"
              onClick={handlePay}
              disabled={!canPay || isProcessing}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF385C] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#E31C5F] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Processing…
                </>
              ) : (
                <>
                  <Zap className="size-4" />
                  Pay {formatUsdc(session.amountUsdc)} USDC
                </>
              )}
            </button>
          )}

          <p className="mt-3 text-center text-xs text-gray-400">
            Secured by Circle CCTP & Arc Network
          </p>
        </div>
      </div>
    </>
  );
}
