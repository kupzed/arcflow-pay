"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function WalletConnectButton() {
  return (
    <ConnectButton
      label="Connect Wallet"
      accountStatus="address"
      chainStatus="icon"
      showBalance={false}
    />
  );
}
