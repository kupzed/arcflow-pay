import { z } from "zod";

// ─── Create Checkout Session ──────────────────────────────────────────────────

export const createCheckoutSessionSchema = z.object({
  orderId: z
    .string()
    .min(1, "Order ID is required")
    .max(100, "Order ID too long"),
  amountUsdc: z
    .string()
    .regex(/^\d+(\.\d{1,6})?$/, "Invalid USDC amount")
    .refine((v) => parseFloat(v) > 0, { message: "Amount must be greater than 0" }),
  merchantAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  webhookUrl: z.string().url("Invalid webhook URL").optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  /** Expiry in minutes, default 30 */
  expiryMinutes: z.number().int().min(5).max(1440).default(30),
});

export type CreateCheckoutSessionInput = z.infer<
  typeof createCheckoutSessionSchema
>;

// ─── Update Session Status ────────────────────────────────────────────────────

export const updateSessionStatusSchema = z.object({
  status: z.enum([
    "idle",
    "initiating",
    "waiting_approval",
    "bridging",
    "confirming",
    "completed",
    "failed",
    "expired",
  ]),
  sourceTxHash: z
    .string()
    .regex(/^0x[a-fA-F0-9]{64}$/)
    .optional(),
  destTxHash: z
    .string()
    .regex(/^0x[a-fA-F0-9]{64}$/)
    .optional(),
});

export type UpdateSessionStatusInput = z.infer<
  typeof updateSessionStatusSchema
>;

// ─── Webhook Payment Notification ─────────────────────────────────────────────

export const webhookPaymentSchema = z.object({
  sessionId: z.string().uuid(),
  destTxHash: z.string().regex(/^0x[a-fA-F0-9]{64}$/),
  amountUsdc: z.string(),
  merchantAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
});

export type WebhookPaymentInput = z.infer<typeof webhookPaymentSchema>;
