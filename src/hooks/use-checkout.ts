"use client";

import { useCallback } from "react";
import { useCheckoutStore } from "@/stores/checkout-store";
import { type CheckoutSession, type PaymentStatus } from "@/types/checkout";
import { isTerminalStatus } from "@/lib/utils";

/**
 * High-level hook for managing checkout flow state.
 * Wraps the Zustand store and exposes only the surface needed by UI components.
 */
export function useCheckout() {
  const {
    isOpen,
    session,
    selectedSourceChain,
    selectedSourceToken,
    paymentStatus,
    errorMessage,
    openCheckout,
    closeCheckout,
    setSession,
    setSelectedSourceChain,
    setSelectedSourceToken,
    setPaymentStatus,
    setErrorMessage,
    reset,
  } = useCheckoutStore();

  const startCheckout = useCallback(
    (session: CheckoutSession) => {
      openCheckout(session);
    },
    [openCheckout]
  );

  const updateStatus = useCallback(
    (status: PaymentStatus, error?: string) => {
      setPaymentStatus(status);
      if (error) setErrorMessage(error);
    },
    [setPaymentStatus, setErrorMessage]
  );

  const isComplete = isTerminalStatus(paymentStatus);
  const isProcessing =
    paymentStatus === "initiating" ||
    paymentStatus === "waiting_approval" ||
    paymentStatus === "bridging" ||
    paymentStatus === "confirming";

  return {
    // State
    isOpen,
    session,
    selectedSourceChain,
    selectedSourceToken,
    paymentStatus,
    errorMessage,
    isComplete,
    isProcessing,

    // Actions
    startCheckout,
    closeCheckout,
    setSession,
    setSelectedSourceChain,
    setSelectedSourceToken,
    updateStatus,
    reset,
  };
}
