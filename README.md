# ArcFlow Pay

> **Arc Community Contribution** — Cross-Chain Unified Checkout Widget powered by Circle App Kit and Arc Network.

ArcFlow Pay is a checkout widget that lets your customers pay with **any token from any EVM chain** (Ethereum, Arbitrum, Optimism, Polygon). Circle CCTP and Arc App Kit bridge the funds automatically, and you receive **USDC on Arc Testnet** in seconds.

## Features

- 🌐 **Any chain, any token** — ETH, USDC, MATIC, ARB from Sepolia, Arbitrum Sepolia, Optimism Sepolia, Polygon Amoy
- ⚡ **Sub-second settlement** — Arc Network's deterministic finality (<1s)
- 💸 **Stable fees** — USDC-native gas model, no volatile gas spikes
- 🎨 **Airbnb design system** — warm coral (#FF385C), rounded cards, Inter font
- 🔐 **Supabase backend** — sessions, status tracking, merchant webhooks
- 🧪 **Testnet-first** — connect to Arc Testnet (Chain ID: 5042002) safely

---

## Getting Started

### Prerequisites

- Node.js 24.x
- pnpm 11+
- A Supabase project (new or existing)
- Arc Testnet wallet (see [Connect to Arc](https://docs.arc.xyz/arc/references/connect-to-arc))
- Testnet USDC from [faucet.circle.com](https://faucet.circle.com)
- WalletConnect Project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com)

### Installation

```bash
# Clone the repo
git clone https://github.com/kupzed/arcflow-pay.git
cd arcflow-pay

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
# Fill in your Supabase and WalletConnect credentials
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<your-wc-project-id>

# Optional: Circle Console Kit Key (for production swap rate limits)
NEXT_PUBLIC_CIRCLE_KIT_KEY=

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to the landing page.

---

## Architecture

```
arcflow-pay/
├── src/
│   ├── app/
│   │   ├── (marketing)/home/     # Landing page
│   │   ├── (auth)/               # Login & Signup
│   │   ├── (dashboard)/          # Merchant dashboard
│   │   └── api/                  # Checkout & Webhook API routes
│   ├── components/
│   │   ├── checkout/             # CheckoutModal, TokenSelector, PaymentSummary, CheckoutStatus
│   │   └── common/               # WalletConnectButton, NetworkBadge
│   ├── configs/                  # environment.ts, wagmi.ts
│   ├── hooks/                    # useCheckout, useArcBalance
│   ├── lib/                      # utils.ts, supabase/, arc-listener.ts
│   ├── providers/                # React Query, Wagmi, Theme
│   ├── stores/                   # Zustand checkout store
│   ├── types/                    # checkout.ts
│   └── validations/              # Zod schemas
├── DESIGN.md                     # Airbnb design tokens (generated)
└── .env.example
```

## Arc Testnet Details

| Parameter | Value                                              |
| :-------- | :------------------------------------------------- |
| Chain ID  | `5042002`                                          |
| RPC       | `https://rpc.testnet.arc.network`                  |
| Currency  | USDC (native gas, 18 decimals)                     |
| Explorer  | [testnet.arcscan.app](https://testnet.arcscan.app) |
| Faucet    | [faucet.circle.com](https://faucet.circle.com)     |

## Testing

```bash
pnpm test           # Unit tests (Vitest)
pnpm test:coverage  # With coverage report
pnpm test:e2e       # E2E tests (Playwright)
pnpm typecheck      # TypeScript check
pnpm lint           # ESLint
```

## Tech Stack

| Layer     | Tech                                       |
| :-------- | :----------------------------------------- |
| Framework | Next.js 16 (App Router)                    |
| Runtime   | React 19, TypeScript 5                     |
| Styling   | Tailwind CSS v4 + Airbnb design tokens     |
| UI        | shadcn/ui (radix-nova) + Lucide            |
| Web3      | Circle App Kit + viem + wagmi + RainbowKit |
| State     | TanStack Query + Zustand                   |
| Auth/DB   | Supabase (SSR)                             |
| Forms     | react-hook-form + Zod                      |
| Testing   | Vitest + Testing Library + Playwright      |
| PWA       | Serwist                                    |
| Package   | pnpm                                       |

## Contributing

This project is an Arc Community contribution. PRs welcome!

See [Arc Developer Docs](https://docs.arc.xyz) for more about building on Arc Network.

## Lisensi

[MIT License](./LICENSE) — Copyright © 2026 Kupzed
