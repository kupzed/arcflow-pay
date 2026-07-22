import { create } from "zustand";
import { type CheckoutSession, type PaymentStatus } from "@/types/checkout";

interface CheckoutState {
  // Modal state
  isOpen: boolean;
  openCheckout: (session: CheckoutSession) => void;
  closeCheckout: () => void;

  // Current session
  session: CheckoutSession | null;
  setSession: (session: CheckoutSession | null) => void;

  // UI selections
  selectedSourceChain: string | null;
  setSelectedSourceChain: (chain: string | null) => void;
  selectedSourceToken: string | null;
  setSelectedSourceToken: (token: string | null) => void;

  // Payment flow state
  paymentStatus: PaymentStatus;
  setPaymentStatus: (status: PaymentStatus) => void;
  errorMessage: string | null;
  setErrorMessage: (msg: string | null) => void;

  // Reset entire checkout state
  reset: () => void;
}

const initialState = {
  isOpen: false,
  session: null,
  selectedSourceChain: null,
  selectedSourceToken: null,
  paymentStatus: "idle" as PaymentStatus,
  errorMessage: null,
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  ...initialState,

  openCheckout: (session) =>
    set({ isOpen: true, session, paymentStatus: "idle", errorMessage: null }),

  closeCheckout: () => set({ isOpen: false }),

  setSession: (session) => set({ session }),

  setSelectedSourceChain: (chain) =>
    set({ selectedSourceChain: chain, selectedSourceToken: null }),

  setSelectedSourceToken: (token) => set({ selectedSourceToken: token }),

  setPaymentStatus: (status) => set({ paymentStatus: status }),

  setErrorMessage: (msg) => set({ errorMessage: msg }),

  reset: () => set(initialState),
}));
