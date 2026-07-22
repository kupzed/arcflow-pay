import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { webhookPaymentSchema } from "@/validations/checkout";

/**
 * POST /api/webhook/payment
 * Called when a USDC transfer is confirmed on Arc Testnet.
 * Updates the checkout session status to "completed" and notifies the merchant's webhook.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parse = webhookPaymentSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parse.error.flatten() },
        { status: 400 }
      );
    }

    const { sessionId, destTxHash, amountUsdc } = parse.data;

    const supabase = await createAdminClient();

    // Fetch session
    const { data: session, error: fetchError } = await supabase
      .from("checkout_sessions")
      .select("*")
      .eq("id", sessionId)
      .single();

    if (fetchError || !session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Update status
    const { error: updateError } = await supabase
      .from("checkout_sessions")
      .update({
        status: "completed",
        dest_tx_hash: destTxHash,
        updated_at: new Date().toISOString(),
      })
      .eq("id", sessionId);

    if (updateError) {
      console.error("[webhook/payment] Update error:", updateError);
      return NextResponse.json({ error: "Failed to update session" }, { status: 500 });
    }

    // Notify merchant webhook
    if (session.webhook_url) {
      try {
        await fetch(session.webhook_url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "payment.completed",
            sessionId,
            orderId: session.order_id,
            amountUsdc,
            destTxHash,
            merchantAddress: session.merchant_address,
            completedAt: new Date().toISOString(),
          }),
          signal: AbortSignal.timeout(5000),
        });
      } catch (webhookErr) {
        // Non-fatal: log but don't fail the response
        console.warn("[webhook/payment] Merchant webhook delivery failed:", webhookErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[webhook/payment] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
