import { useQuery } from '@tanstack/react-query';
import { getTransactionCount } from 'viem/actions';
import { useRpc } from '@/providers/rpcs';
import { walletTransactionsQueryKey } from '@/constants/query-keys';
import { Address } from 'viem';

export default function useGetWalletTransactions(address?: Address) {
  const { customRpcClient } = useRpc();
  const { data, isLoading, error } = useQuery({
    queryKey: walletTransactionsQueryKey(address || ''),
    queryFn: async () => {
      if (!address) {
        return null;
      }
      const transactionCount = await getTransactionCount(customRpcClient!, {
        address,
      });
      return { transactionCount };
    },
    enabled: !!customRpcClient && !!address,
  });

  return { data, isLoading, error };
}
