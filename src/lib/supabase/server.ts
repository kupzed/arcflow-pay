import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase admin client with service role key.
 * Use only in trusted server contexts (API Routes, Server Actions).
 *
 * This project does NOT use Supabase Auth — authentication is handled
 * exclusively via wallet connect (RainbowKit / wagmi).
 */
export function createAdminClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables"
    );
  }

  return createSupabaseClient(url, serviceRoleKey, {
    auth: {
      // No browser auth — we're server-only with service role
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
