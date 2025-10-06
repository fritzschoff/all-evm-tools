'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import useGetWalletTransactions from '@/hooks/useGetWalletTransactions';
import Balance from '@/components/Balance/balance';

export default function Dashboard() {
  const { isConnected, address } = useAccount();
  const { data: balance } = useBalance({ address: address! });
  const { data, isLoading, error } = useGetWalletTransactions(address);

  const pageIsLoading = isLoading;
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {isConnected ? <div>Connected</div> : <ConnectButton />}
      {pageIsLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <Balance
          amount={balance?.value}
          symbol={balance?.symbol}
          decimals={balance?.decimals}
        />
      )}
      {data && <div>Transaction Count: {data.transactionCount}</div>}
    </div>
  );
}
