import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { serverEnvironment } from "@/configs/server-environment";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    serverEnvironment.supabaseUrl,
    serverEnvironment.supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component — mutations are handled by middleware
          }
        },
      },
    }
  );
}

/**
 * Creates a Supabase admin client with service role key.
 * Use only in trusted server contexts (API Routes, Server Actions).
 */
export async function createAdminClient() {
  const cookieStore = await cookies();

  return createServerClient(
    serverEnvironment.supabaseUrl,
    serverEnvironment.supabaseServiceRoleKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // intentionally empty
          }
        },
      },
    }
  );
}
