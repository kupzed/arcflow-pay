import type { Metadata } from "next";
import Link from "next/link";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function SignUpPage() {
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
              Create your account
            </h1>
            <p className="text-sm text-[var(--color-muted)]">
              Start accepting cross-chain payments in minutes
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-3xl border border-[var(--color-hairline-soft)] bg-white p-8 shadow-sm">
          <form className="space-y-4" action="/api/auth/signup" method="POST">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                autoComplete="name"
                placeholder="Satoshi Nakamoto"
                className="w-full rounded-xl border border-[var(--color-hairline)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-muted-soft)] focus:border-[#ff385c] focus:ring-2 focus:ring-[#ff385c]/20 transition-colors"
              />
            </div>

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
                autoComplete="new-password"
                placeholder="Min. 8 characters"
                className="w-full rounded-xl border border-[var(--color-hairline)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-muted-soft)] focus:border-[#ff385c] focus:ring-2 focus:ring-[#ff385c]/20 transition-colors"
              />
            </div>

            <button
              type="submit"
              id="signup-submit-btn"
              className="afp-btn-primary w-full rounded-xl py-3.5 text-sm font-semibold text-white"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[var(--color-muted)]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#ff385c] hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-[var(--color-muted)]">
          By creating an account you agree to our{" "}
          <a href="#" className="text-[var(--color-legal-link)] hover:underline">
            Terms of Service
          </a>
          .
        </p>
      </div>
    </div>
  );
}
