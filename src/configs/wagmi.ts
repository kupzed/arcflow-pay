import { http } from "wagmi";
import {
  arcTestnet,
  arbitrumSepolia,
  mainnet,
  optimismSepolia,
  polygonAmoy,
  sepolia,
} from "viem/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { environment } from "./environment";

// Re-export for use across the app
export { arcTestnet };

/**
 * Wagmi + RainbowKit configuration.
 *
 * Arc Testnet chain details (from docs):
 *   Chain ID: 5042002
 *   RPC:      https://rpc.testnet.arc.network
 *   Explorer: https://testnet.arcscan.app
 *   Currency: USDC (native gas token, 18 decimals)
 *
 * Note: arcTestnet is built into viem/chains — no manual definition needed.
 *
 * Supported chains:
 *   - Arc Testnet (destination — where USDC is received by merchant)
 *   - Ethereum Sepolia, Arbitrum Sepolia, Optimism Sepolia, Polygon Amoy (sources)
 *   - Ethereum Mainnet (for ENS lookups via RainbowKit)
 */
export const wagmiConfig = getDefaultConfig({
  appName: environment.appName,
  projectId: environment.walletConnectProjectId || "ARCFLOW_DEV_PLACEHOLDER",
  chains: [
    arcTestnet,
    sepolia,
    arbitrumSepolia,
    optimismSepolia,
    polygonAmoy,
    mainnet,
  ],
  transports: {
    [arcTestnet.id]: http("https://rpc.testnet.arc.network"),
    [sepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
    [optimismSepolia.id]: http(),
    [polygonAmoy.id]: http(),
    [mainnet.id]: http("https://cloudflare-eth.com"),
  },
  ssr: true,
});
