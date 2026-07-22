import { useQuery } from "@tanstack/react-query";
import { type Address } from "viem";
import { getUsdcBalance } from "@/lib/arc-listener";
import { formatUsdc } from "@/lib/utils";

/**
 * Fetches and formats the USDC balance of a given address on Arc Testnet.
 * Polls every 15 seconds to keep dashboard totals fresh.
 */
export function useArcBalance(address: Address | undefined) {
  return useQuery({
    queryKey: ["arc-usdc-balance", address],
    queryFn: async () => {
      if (!address) return { raw: BigInt(0), formatted: "0.00" };
      const raw = await getUsdcBalance(address);
      return {
        raw,
        formatted: formatUsdc(raw),
      };
    },
    enabled: !!address,
    refetchInterval: 15_000,
    staleTime: 10_000,
  });
}
