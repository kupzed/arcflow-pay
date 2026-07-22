"use client";

import { ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NetworkBadge } from "@/components/common/network-badge";
import { type SupportedSourceChain, type SupportedToken } from "@/types/checkout";

const CHAINS: { slug: SupportedSourceChain; label: string }[] = [
  { slug: "sepolia", label: "Ethereum Sepolia" },
  { slug: "arbitrum-sepolia", label: "Arbitrum Sepolia" },
  { slug: "optimism-sepolia", label: "Optimism Sepolia" },
  { slug: "polygon-amoy", label: "Polygon Amoy" },
];

const TOKENS_BY_CHAIN: Record<SupportedSourceChain, SupportedToken[]> = {
  sepolia: ["ETH", "USDC"],
  "arbitrum-sepolia": ["ETH", "USDC", "ARB"],
  "optimism-sepolia": ["ETH", "USDC", "OP"],
  "polygon-amoy": ["MATIC", "USDC"],
  mainnet: ["ETH", "USDC"],
};

interface TokenSelectorProps {
  selectedChain: SupportedSourceChain | null;
  selectedToken: SupportedToken | null;
  onChainChange: (chain: SupportedSourceChain) => void;
  onTokenChange: (token: SupportedToken) => void;
  disabled?: boolean;
}

export function TokenSelector({
  selectedChain,
  selectedToken,
  onChainChange,
  onTokenChange,
  disabled,
}: TokenSelectorProps) {
  const [chainOpen, setChainOpen] = useState(false);
  const [tokenOpen, setTokenOpen] = useState(false);

  const availableTokens = selectedChain
    ? TOKENS_BY_CHAIN[selectedChain] ?? []
    : [];

  return (
    <div className="space-y-3">
      {/* Chain Selector */}
      <div className="relative">
        <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase tracking-wide">
          Source Chain
        </label>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setChainOpen((v) => !v)}
          className={cn(
            "flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-colors",
            "hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF385C]/20",
            disabled && "cursor-not-allowed opacity-60"
          )}
        >
          {selectedChain ? (
            <NetworkBadge chain={selectedChain} size="sm" />
          ) : (
            <span className="text-gray-400">Select a chain…</span>
          )}
          <ChevronDown
            className={cn(
              "size-4 text-gray-400 transition-transform",
              chainOpen && "rotate-180"
            )}
          />
        </button>

        {chainOpen && (
          <div className="absolute z-20 mt-1 w-full rounded-xl border border-gray-100 bg-white shadow-lg">
            {CHAINS.map((chain) => (
              <button
                key={chain.slug}
                type="button"
                onClick={() => {
                  onChainChange(chain.slug);
                  setChainOpen(false);
                }}
                className="flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
              >
                <NetworkBadge chain={chain.slug} size="sm" />
                {selectedChain === chain.slug && (
                  <Check className="size-4 text-[#FF385C]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Token Selector */}
      <div className="relative">
        <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase tracking-wide">
          Pay With
        </label>
        <button
          type="button"
          disabled={disabled || !selectedChain}
          onClick={() => setTokenOpen((v) => !v)}
          className={cn(
            "flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-colors",
            "hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF385C]/20",
            (disabled || !selectedChain) && "cursor-not-allowed opacity-60"
          )}
        >
          <span className={selectedToken ? "text-gray-900" : "text-gray-400"}>
            {selectedToken ?? "Select a token…"}
          </span>
          <ChevronDown
            className={cn(
              "size-4 text-gray-400 transition-transform",
              tokenOpen && "rotate-180"
            )}
          />
        </button>

        {tokenOpen && availableTokens.length > 0 && (
          <div className="absolute z-20 mt-1 w-full rounded-xl border border-gray-100 bg-white shadow-lg">
            {availableTokens.map((token) => (
              <button
                key={token}
                type="button"
                onClick={() => {
                  onTokenChange(token);
                  setTokenOpen(false);
                }}
                className="flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
              >
                <span className="font-medium">{token}</span>
                {selectedToken === token && (
                  <Check className="size-4 text-[#FF385C]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
