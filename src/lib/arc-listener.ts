import { createPublicClient, http, parseAbiItem, type Address } from "viem";
import { arcTestnet } from "viem/chains";
import { environment } from "@/configs/environment";

// USDC contract address on Arc Testnet
// Update this to the real deployed USDC address from Arc docs
const USDC_ADDRESS: Address = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

const TRANSFER_EVENT = parseAbiItem(
  "event Transfer(address indexed from, address indexed to, uint256 value)"
);

/**
 * Creates a viem public client connected to Arc Testnet.
 */
export function createArcClient() {
  return createPublicClient({
    chain: arcTestnet,
    transport: http(environment.arcTestnetRpc),
  });
}

/**
 * Watch for incoming USDC transfers to a merchant's wallet on Arc Testnet.
 * @param merchantAddress - The merchant's Arc Testnet wallet address to monitor
 * @param expectedAmountUsdc - Expected amount in raw USDC (6 decimals) as bigint
 * @param onPaymentReceived - Callback invoked when a matching transfer is detected
 * @returns Unwatch function to stop listening
 */
export function watchUsdcTransfer(
  merchantAddress: Address,
  expectedAmountUsdc: bigint,
  onPaymentReceived: (txHash: `0x${string}`, amount: bigint) => void
): () => void {
  const client = createArcClient();

  const unwatch = client.watchEvent({
    address: USDC_ADDRESS,
    event: TRANSFER_EVENT,
    args: {
      to: merchantAddress,
    },
    onLogs(logs) {
      for (const log of logs) {
        const amount = log.args.value as bigint;
        if (amount >= expectedAmountUsdc) {
          onPaymentReceived(log.transactionHash!, amount);
        }
      }
    },
  });

  return unwatch;
}

/**
 * Get the current USDC balance for an address on Arc Testnet.
 */
export async function getUsdcBalance(address: Address): Promise<bigint> {
  const client = createArcClient();

  return client.readContract({
    address: USDC_ADDRESS,
    abi: [
      parseAbiItem("function balanceOf(address account) view returns (uint256)"),
    ],
    functionName: "balanceOf",
    args: [address],
  }) as Promise<bigint>;
}
