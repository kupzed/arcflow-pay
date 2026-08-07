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

  const handleSelectChain = (chainSlug: SupportedSourceChain) => {
    onChainChange(chainSlug);
    setChainOpen(false);
    // Auto reset or default token if current selected token is invalid for new chain
    const validTokens = TOKENS_BY_CHAIN[chainSlug] ?? [];
    if (!selectedToken || !validTokens.includes(selectedToken)) {
      onTokenChange(validTokens[0] ?? "USDC");
    }
  };

  return (
    <div className="space-y-3.5">
      {/* Chain Selector */}
      <div className="relative">
        <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">
          1. Select Source Network
        </label>
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            setChainOpen((v) => !v);
            setTokenOpen(false);
          }}
          className={cn(
            "flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all shadow-sm",
            "hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff385c]/20",
            disabled && "cursor-not-allowed opacity-60 bg-gray-50"
          )}
        >
          {selectedChain ? (
            <NetworkBadge chain={selectedChain} size="sm" />
          ) : (
            <span className="text-gray-400">Select source chain…</span>
          )}
          <ChevronDown
            className={cn(
              "size-4 text-gray-400 transition-transform duration-200",
              chainOpen && "rotate-180 text-gray-600"
            )}
          />
        </button>

        {chainOpen && (
          <div className="absolute left-0 right-0 z-30 mt-1.5 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl ring-1 ring-black/5 animate-in fade-in-50 zoom-in-95">
            {CHAINS.map((chain) => (
              <button
                key={chain.slug}
                type="button"
                onClick={() => handleSelectChain(chain.slug)}
                className="flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
              >
                <NetworkBadge chain={chain.slug} size="sm" />
                {selectedChain === chain.slug && (
                  <Check className="size-4 text-[#ff385c]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Token Selector */}
      <div className="relative">
        <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase tracking-wider">
          2. Select Payment Token
        </label>
        <button
          type="button"
          disabled={disabled || !selectedChain}
          onClick={() => {
            setTokenOpen((v) => !v);
            setChainOpen(false);
          }}
          className={cn(
            "flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm transition-all shadow-sm",
            "hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff385c]/20",
            (disabled || !selectedChain) && "cursor-not-allowed opacity-60 bg-gray-50"
          )}
        >
          <span className={selectedToken ? "font-semibold text-gray-900" : "text-gray-400"}>
            {selectedToken ? `Pay with ${selectedToken}` : "Select a token…"}
          </span>
          <ChevronDown
            className={cn(
              "size-4 text-gray-400 transition-transform duration-200",
              tokenOpen && "rotate-180 text-gray-600"
            )}
          />
        </button>

        {tokenOpen && availableTokens.length > 0 && (
          <div className="absolute left-0 right-0 z-30 mt-1.5 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl ring-1 ring-black/5 animate-in fade-in-50 zoom-in-95">
            {availableTokens.map((token) => (
              <button
                key={token}
                type="button"
                onClick={() => {
                  onTokenChange(token);
                  setTokenOpen(false);
                }}
                className="flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
              >
                <span className="font-semibold text-gray-900">{token}</span>
                {selectedToken === token && (
                  <Check className="size-4 text-[#ff385c]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
