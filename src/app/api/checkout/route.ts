import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { createCheckoutSessionSchema } from "@/validations/checkout";
import { randomUUID } from "crypto";

/**
 * POST /api/checkout
 * Creates a new checkout session for a merchant order.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body
    const parse = createCheckoutSessionSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parse.error.flatten() },
        { status: 400 }
      );
    }

    const { orderId, amountUsdc, merchantAddress, webhookUrl, metadata, expiryMinutes } =
      parse.data;

    const expiresAt = new Date(
      Date.now() + expiryMinutes * 60 * 1000
    ).toISOString();

    const supabase = await createAdminClient();

    const { data, error } = await supabase
      .from("checkout_sessions")
      .insert({
        id: randomUUID(),
        order_id: orderId,
        amount_usdc: amountUsdc,
        merchant_address: merchantAddress,
        status: "idle",
        webhook_url: webhookUrl ?? null,
        metadata: metadata ?? null,
        expires_at: expiresAt,
      })
      .select()
      .single();

    if (error) {
      console.error("[checkout/route] Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to create session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ session: data }, { status: 201 });
  } catch (err) {
    console.error("[checkout/route] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
