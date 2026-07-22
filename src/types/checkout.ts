import { type Address } from "viem";

// ─── Supported Chains ───────────────────────────────────────────────────────

export type SupportedSourceChain =
  | "sepolia"
  | "arbitrum-sepolia"
  | "optimism-sepolia"
  | "polygon-amoy"
  | "mainnet";

export type SupportedChain = SupportedSourceChain | "arc-testnet";

export interface ChainInfo {
  id: number;
  name: string;
  slug: SupportedChain;
  logoUrl?: string;
  testnet: boolean;
}

// ─── Supported Tokens ───────────────────────────────────────────────────────

export type SupportedToken = "USDC" | "ETH" | "MATIC" | "ARB" | "OP";

export interface TokenInfo {
  symbol: SupportedToken;
  name: string;
  decimals: number;
  logoUrl?: string;
  contractAddress?: Address;
}

// ─── Payment Status ──────────────────────────────────────────────────────────

export type PaymentStatus =
  | "idle"
  | "initiating"
  | "waiting_approval"
  | "bridging"
  | "confirming"
  | "completed"
  | "failed"
  | "expired";

// ─── Checkout Session ─────────────────────────────────────────────────────────

export interface CheckoutSession {
  id: string;
  merchantId: string;
  orderId: string;
  /** Amount in USDC (6 decimals, stored as string to avoid precision loss) */
  amountUsdc: string;
  /** Merchant's Arc wallet address to receive USDC */
  merchantAddress: Address;
  status: PaymentStatus;
  /** Source chain chosen by buyer */
  sourceChain?: SupportedSourceChain;
  /** Source token chosen by buyer */
  sourceToken?: SupportedToken;
  /** Amount of source token to be swapped/bridged */
  sourceAmount?: string;
  /** Estimated fee in USDC */
  estimatedFee?: string;
  /** Transaction hash on the source chain */
  sourceTxHash?: `0x${string}`;
  /** Transaction hash on Arc Testnet (destination) */
  destTxHash?: `0x${string}`;
  /** Webhook URL to notify when payment completes */
  webhookUrl?: string;
  /** Metadata passed through from merchant (e.g. order details) */
  metadata?: Record<string, unknown>;
  expiresAt: string; // ISO 8601
  createdAt: string;
  updatedAt: string;
}

// ─── Merchant ─────────────────────────────────────────────────────────────────

export interface Merchant {
  id: string;
  userId: string;
  name: string;
  /** Arc Testnet wallet address to receive USDC payments */
  walletAddress: Address;
  webhookUrl?: string;
  createdAt: string;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export interface DashboardStats {
  totalVolumeUsdc: string;
  totalTransactions: number;
  completedTransactions: number;
  pendingTransactions: number;
  failedTransactions: number;
}
