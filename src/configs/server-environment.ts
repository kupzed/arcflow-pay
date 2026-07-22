import "server-only";
import { environment } from "./environment";

/**
 * Server-only environment variables.
 * This file must never be imported from client components.
 */
export const serverEnvironment = {
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  // Re-export public vars for convenience in server contexts
  supabaseUrl: environment.supabaseUrl,
  supabaseAnonKey: environment.supabaseAnonKey,
} as const;
