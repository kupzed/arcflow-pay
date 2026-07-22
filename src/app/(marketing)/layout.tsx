import Link from "next/link";
import { WalletConnectButton } from "@/components/common/wallet-connect-button";
import { Zap } from "lucide-react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-canvas)]">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 border-b border-[var(--color-hairline-soft)] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-xl bg-[#ff385c]">
              <Zap className="size-4 text-white" />
            </div>
            <span className="text-base font-semibold text-[var(--color-ink)]">
              ArcFlow Pay
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/home"
              className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/dashboard/overview"
              className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              Dashboard
            </Link>
            <a
              href="https://docs.arc.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              Arc Docs
            </a>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-[var(--color-body)] hover:text-[var(--color-ink)] sm:block"
            >
              Sign in
            </Link>
            <WalletConnectButton />
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="afp-page-enter">{children}</main>

      {/* Footer */}
      <footer className="mt-24 border-t border-[var(--color-hairline-soft)] bg-[var(--color-surface-soft)]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#ff385c]">
                <Zap className="size-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold text-[var(--color-ink)]">
                ArcFlow Pay
              </span>
            </div>
            <p className="text-xs text-[var(--color-muted)]">
              Built on{" "}
              <a
                href="https://arc.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#ff385c] hover:underline"
              >
                Arc Network
              </a>{" "}
              · Powered by Circle App Kit · Community Contribution
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
