import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { http, useAccount } from 'wagmi';
import { createPublicClient, PublicClient } from 'viem';
import { defaultRpcs } from '@/constants/rpcs';

type RpcContextType = {
  customRpc: string | null;
  customRpcClient: PublicClient | null;
  setCustomRpc: (rpc: string) => void;
  clearCustomRpc: () => void;
  error: string | null;
};

const RpcContext = createContext<RpcContextType | undefined>(undefined);

const createRpcClient = (rpc: string | null) => {
  if (!rpc) {
    return null;
  }
  return createPublicClient({
    batch: { multicall: true },
    transport: http(rpc, {
      batch: { batchSize: 100, wait: 500 },
    }),
  });
};

export const RpcProvider = ({ children }: { children: ReactNode }) => {
  const [customRpc, setCustomRpcState] = useState<string | null>(null);
  const [customRpcClient, setCustomRpcClient] = useState<PublicClient | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const { chain, isConnected } = useAccount();
  const localStoageKey = `customRpc-${chain?.id}`;

  useEffect(() => {
    if (isConnected) {
      const storedRpc =
        typeof window !== 'undefined'
          ? localStorage.getItem(localStoageKey)
          : null;
      if (storedRpc) {
        setCustomRpcState(storedRpc);
        setCustomRpcClient(createRpcClient(storedRpc));
      } else {
        const defaultRpc =
          defaultRpcs.find((rpc) => rpc.chainId === chain?.id)?.rpcUrl || null;
        setCustomRpcState(defaultRpc);
        setCustomRpcClient(createRpcClient(defaultRpc));
      }
    }
  }, [isConnected]);

  useEffect(() => {
    setError(null);
  }, [chain?.id]);

  const setCustomRpc = async (rpc: string) => {
    if (!rpc) {
      setCustomRpcState(null);
      return;
    }
    setError(null);
    const rpcFromString = createRpcClient(rpc);
    const rpcChainId = await rpcFromString.getChainId();
    if (rpcChainId !== chain?.id) {
      setError(
        `RPC chain id ${rpcChainId} does not match chain id ${chain?.id}`
      );
      return;
    }
    setCustomRpcState(rpc);
    setCustomRpcClient(rpcFromString);
    if (typeof window !== 'undefined') {
      localStorage.setItem(localStoageKey, rpc);
    }
  };

  const clearCustomRpc = () => {
    setCustomRpcState(null);
    setCustomRpcClient(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(localStoageKey);
    }
  };

  return (
    <RpcContext.Provider
      value={{
        customRpc,
        customRpcClient,
        setCustomRpc,
        clearCustomRpc,
        error,
      }}
    >
      {children}
    </RpcContext.Provider>
  );
};

export const useRpc = () => {
  const context = useContext(RpcContext);
  if (context === undefined) {
    throw new Error('useRpc must be used within a RpcProvider');
  }
  return context;
};
