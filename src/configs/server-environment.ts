import "server-only";

/**
 * Server-only environment variables.
 * This file must never be imported from client components.
 *
 * Note: Supabase credentials (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
 * are read directly in src/lib/supabase/server.ts to avoid circular imports.
 */
export const serverEnvironment = {
  // Add future server-only env vars here
} as const;
