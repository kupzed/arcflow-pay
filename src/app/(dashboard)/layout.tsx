"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Settings,
  Zap,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WalletConnectButton } from "@/components/common/wallet-connect-button";

const NAV_ITEMS = [
  { href: "/dashboard/overview", label: "Overview", icon: LayoutDashboard },
  {
    href: "/dashboard/checkout-sessions",
    label: "Checkout Sessions",
    icon: CreditCard,
  },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[var(--color-surface-soft)]">
      {/* Sidebar */}
      <aside className="hidden w-60 flex-col border-r border-[var(--color-hairline-soft)] bg-white lg:flex">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-[var(--color-hairline-soft)] px-5">
          <Link href="/home" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-xl bg-[#ff385c]">
              <Zap className="size-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-[var(--color-ink)]">
              ArcFlow Pay
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "afp-nav-item",
                pathname.startsWith(href) && "active"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          ))}

          <div className="mt-auto pt-4">
            <a
              href="https://docs.arc.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="afp-nav-item text-[var(--color-muted)]"
            >
              <ExternalLink className="size-4 shrink-0" />
              Arc Docs
            </a>
          </div>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b border-[var(--color-hairline-soft)] bg-white px-6">
          <h1 className="text-sm font-semibold text-[var(--color-muted)] lg:hidden">
            ArcFlow Pay
          </h1>
          <div className="ml-auto">
            <WalletConnectButton />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 afp-page-enter p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
