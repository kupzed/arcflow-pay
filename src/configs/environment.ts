/**
 * Environment variable validation for ArcFlow Pay.
 * Client-safe variables must be prefixed with NEXT_PUBLIC_.
 * Server-only variables must never be exposed to the client.
 */

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function optionalEnv(key: string, fallback = ""): string {
  return process.env[key] ?? fallback;
}

// Client-safe configuration (browser + server)
export const environment = {
  // App
  appName: optionalEnv("NEXT_PUBLIC_APP_NAME", "ArcFlow Pay"),
  appUrl: optionalEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),

  // Supabase (public — browser-safe)
  supabaseUrl: optionalEnv("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: optionalEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),

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
