
function optionalEnv(key: string, fallback = ""): string {
  return process.env[key] ?? fallback;
}

// Client-safe configuration (browser + server)
export const environment = {
  // App
  appName: optionalEnv("NEXT_PUBLIC_APP_NAME", "ArcFlow Pay"),
  appUrl: optionalEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),

  // Circle App Kit (optional for testnet)
  circleKitKey: optionalEnv("NEXT_PUBLIC_CIRCLE_KIT_KEY"),

  // WalletConnect
  walletConnectProjectId: optionalEnv("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID"),

  // Arc Testnet (Chain ID: 5042002)
  arcTestnetRpc: optionalEnv(
    "NEXT_PUBLIC_ARC_TESTNET_RPC",
    "https://rpc.testnet.arc.network"
  ),
  arcTestnetExplorer: "https://testnet.arcscan.app",

  // Dev origins (comma-separated list)
  allowedDevOrigins: optionalEnv("ALLOWED_DEV_ORIGINS", "")
    .split(",")
    .filter(Boolean),
} as const;

export type Environment = typeof environment;
