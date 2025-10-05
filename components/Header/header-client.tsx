"use client";

import { useAccount } from "wagmi";
import Button from "../Button/button";
import AccountModal from "../Modals/Account/account-modal";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import useTheme from "@/hooks/useTheme";

export default function HeaderClient() {
  const { isConnected } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center gap-4">
      {isConnected ? (
        <Button onClick={() => setIsOpen(true)}>Account</Button>
      ) : (
        <ConnectButton />
      )}
      <AccountModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? "Dark" : "Light"}
      </button>
    </div>
  );
}
