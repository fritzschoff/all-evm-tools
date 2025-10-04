"use client";

import { useAccount } from "wagmi";
import Button from "../Button/button";
import AccountModal from "../Modals/Account/account-modal";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function HeaderClient() {
  const { isConnected } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {isConnected ? (
        <Button onClick={() => setIsOpen(true)}>Account</Button>
      ) : (
        <ConnectButton />
      )}
      <AccountModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
