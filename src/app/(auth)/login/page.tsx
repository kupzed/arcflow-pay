import type { Metadata } from "next";
import Link from "next/link";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-surface-soft)] p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-[#ff385c]">
            <Zap className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--color-ink)]">
              Welcome back
            </h1>
            <p className="text-sm text-[var(--color-muted)]">
              Sign in to your ArcFlow Pay account
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-3xl border border-[var(--color-hairline-soft)] bg-white p-8 shadow-sm">
          <form className="space-y-4" action="/api/auth/login" method="POST">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[var(--color-hairline)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-muted-soft)] focus:border-[#ff385c] focus:ring-2 focus:ring-[#ff385c]/20 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-[var(--color-hairline)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-muted-soft)] focus:border-[#ff385c] focus:ring-2 focus:ring-[#ff385c]/20 transition-colors"
              />
            </div>

            <button
              type="submit"
              id="login-submit-btn"
              className="afp-btn-primary w-full rounded-xl py-3.5 text-sm font-semibold text-white"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[var(--color-muted)]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#ff385c] hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-[var(--color-muted)]">
          <Link href="/home" className="hover:underline">
            ← Back to ArcFlow Pay
          </Link>
        </p>
      </div>
    </div>
  );
}
