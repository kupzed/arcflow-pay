"use client";

import { CheckCircle, XCircle, Clock, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { type PaymentStatus } from "@/types/checkout";

interface Step {
  id: PaymentStatus;
  label: string;
  description: string;
}

const STEPS: Step[] = [
  {
    id: "initiating",
    label: "Initiating",
    description: "Preparing your cross-chain payment",
  },
  {
    id: "waiting_approval",
    label: "Wallet Approval",
    description: "Approve the transaction in your wallet",
  },
  {
    id: "bridging",
    label: "Bridging",
    description: "Moving funds across chains via Circle CCTP",
  },
  {
    id: "confirming",
    label: "Confirming",
    description: "Finalising on Arc Testnet",
  },
  {
    id: "completed",
    label: "Complete",
    description: "Payment received by merchant",
  },
];

const STATUS_ORDER: PaymentStatus[] = [
  "initiating",
  "waiting_approval",
  "bridging",
  "confirming",
  "completed",
];

interface CheckoutStatusProps {
  status: PaymentStatus;
  errorMessage?: string | null;
}

export function CheckoutStatus({ status, errorMessage }: CheckoutStatusProps) {
  const currentIndex = STATUS_ORDER.indexOf(status as never);

  if (status === "failed") {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-red-50">
          <XCircle className="size-8 text-red-500" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">Payment Failed</p>
          <p className="mt-1 text-sm text-gray-500">
            {errorMessage ?? "Something went wrong. Please try again."}
          </p>
        </div>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-amber-50">
          <Clock className="size-8 text-amber-500" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">Session Expired</p>
          <p className="mt-1 text-sm text-gray-500">
            This checkout session has expired. Please start a new payment.
          </p>
        </div>
      </div>
    );
  }

  if (status === "completed") {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-green-50">
          <CheckCircle className="size-8 text-green-500" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">Payment Complete!</p>
          <p className="mt-1 text-sm text-gray-500">
            Your USDC has been delivered to the merchant on Arc Testnet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <ol className="relative space-y-4 border-l border-gray-200 pl-6">
        {STEPS.filter((s) => s.id !== "completed").map((step, idx) => {
          const stepIndex = STATUS_ORDER.indexOf(step.id as never);
          const isDone = stepIndex < currentIndex;
          const isActive = stepIndex === currentIndex;

          return (
            <li key={step.id} className="relative">
              {/* Step dot */}
              <span
                className={cn(
                  "absolute -left-[1.65rem] flex size-5 items-center justify-center rounded-full ring-2 ring-white",
                  isDone && "bg-green-500",
                  isActive && "bg-[#FF385C]",
                  !isDone && !isActive && "bg-gray-200"
                )}
              >
                {isDone && (
                  <CheckCircle className="size-3 text-white" />
                )}
                {isActive && (
                  <Loader2 className="size-3 animate-spin text-white" />
                )}
              </span>

              <div className={cn(isActive ? "text-gray-900" : "text-gray-400")}>
                <p className="text-sm font-medium">{step.label}</p>
                {isActive && (
                  <p className="mt-0.5 text-xs text-gray-500">
                    {step.description}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
