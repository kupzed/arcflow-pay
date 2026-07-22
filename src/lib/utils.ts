import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with conflict resolution.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format USDC amount (6 decimals) to a human-readable string.
 * @example formatUsdc("1000000") → "1.00"
 */
export function formatUsdc(
  rawAmount: string | bigint,
  decimals = 6,
  displayDecimals = 2
): string {
  const raw =
    typeof rawAmount === "bigint" ? rawAmount : BigInt(rawAmount.split(".")[0]);
  const divisor = BigInt(10 ** decimals);
  const whole = raw / divisor;
  const fraction = raw % divisor;
  const fractionStr = fraction.toString().padStart(decimals, "0");
  return `${whole}.${fractionStr.slice(0, displayDecimals)}`;
}

/**
 * Format a wallet address to a shortened display string.
 * @example formatAddress("0xABCDEF...1234") → "0xABCD...1234"
 */
export function formatAddress(address: string, chars = 4): string {
  if (!address) return "";
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Convert a USDC display string to its raw bigint representation (6 decimals).
 * @example parseUsdc("1.50") → 1500000n
 */
export function parseUsdc(displayAmount: string): bigint {
  const [whole, fraction = ""] = displayAmount.split(".");
  const paddedFraction = fraction.padEnd(6, "0").slice(0, 6);
  return BigInt(whole) * BigInt(1_000_000) + BigInt(paddedFraction);
}

/**
 * Sleep for a given number of milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Determine if a payment status is terminal (no further transitions possible).
 */
export function isTerminalStatus(
  status: string
): status is "completed" | "failed" | "expired" {
  return ["completed", "failed", "expired"].includes(status);
}
