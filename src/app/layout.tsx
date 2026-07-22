import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { Web3Provider } from "@/providers/wagmi-provider";
import { Toaster } from "sonner";
import { environment } from "@/configs/environment";

export const metadata: Metadata = {
  title: {
    default: environment.appName,
    template: `%s | ${environment.appName}`,
  },
  description:
    "Accept payments from any EVM chain. Receive USDC instantly on Arc Network.",
  metadataBase: new URL(environment.appUrl),
  openGraph: {
    type: "website",
    title: environment.appName,
    description:
      "Cross-chain USDC checkout widget powered by Circle App Kit and Arc Network.",
    siteName: environment.appName,
  },
  twitter: {
    card: "summary_large_image",
    title: environment.appName,
    description:
      "Accept payments from any EVM chain. Receive USDC instantly on Arc Network.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeProvider>
          <ReactQueryProvider>
            <Web3Provider>
              {children}
              <Toaster
                richColors
                position="top-right"
                toastOptions={{
                  style: {
                    borderRadius: "14px",
                    fontFamily: "var(--font-sans)",
                  },
                }}
              />
            </Web3Provider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
