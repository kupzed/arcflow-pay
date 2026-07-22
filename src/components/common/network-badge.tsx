import { cn } from "@/lib/utils";

const CHAIN_COLORS: Record<string, string> = {
  "arc-testnet": "bg-[#FF385C]/10 text-[#FF385C] border-[#FF385C]/20",
  sepolia: "bg-blue-50 text-blue-700 border-blue-200",
  "arbitrum-sepolia": "bg-sky-50 text-sky-700 border-sky-200",
  "optimism-sepolia": "bg-red-50 text-red-700 border-red-200",
  "polygon-amoy": "bg-purple-50 text-purple-700 border-purple-200",
  mainnet: "bg-slate-50 text-slate-700 border-slate-200",
};

const CHAIN_LABELS: Record<string, string> = {
  "arc-testnet": "Arc Testnet",
  sepolia: "Ethereum Sepolia",
  "arbitrum-sepolia": "Arbitrum Sepolia",
  "optimism-sepolia": "Optimism Sepolia",
  "polygon-amoy": "Polygon Amoy",
  mainnet: "Ethereum",
};

interface NetworkBadgeProps {
  chain: string;
  className?: string;
  size?: "sm" | "md";
}

export function NetworkBadge({
  chain,
  className,
  size = "sm",
}: NetworkBadgeProps) {
  const colorClass =
    CHAIN_COLORS[chain] ?? "bg-gray-50 text-gray-700 border-gray-200";
  const label = CHAIN_LABELS[chain] ?? chain;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        colorClass,
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}
