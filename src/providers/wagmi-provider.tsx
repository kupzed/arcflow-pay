"use client";

import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { wagmiConfig } from "@/configs/wagmi";

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: "#FF385C",
          accentColorForeground: "white",
          borderRadius: "large",
          fontStack: "system",
        })}
        coolMode
      >
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  );
}
