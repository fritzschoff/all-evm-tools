import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { http, useAccount } from 'wagmi';
import { createPublicClient } from 'viem';

type RpcContextType = {
  customRpc: string | null;
  setCustomRpc: (rpc: string) => void;
  clearCustomRpc: () => void;
  error: string | null;
};

const RpcContext = createContext<RpcContextType | undefined>(undefined);

export const RpcProvider = ({ children }: { children: ReactNode }) => {
  const [customRpc, setCustomRpcState] = useState<string | null>(null);
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
      }
    }
  }, [isConnected]);

  useEffect(() => {
    setError(null);
  }, [chain?.id]);

  const setCustomRpc = async (rpc: string) => {
    setError(null);
    const rpcFromString = createPublicClient({
      transport: http(rpc),
    });
    const rpcChainId = await rpcFromString.getChainId();
    if (rpcChainId !== chain?.id) {
      setError(
        `RPC chain id ${rpcChainId} does not match chain id ${chain?.id}`
      );
      return;
    }
    setCustomRpcState(rpc);
    if (typeof window !== 'undefined') {
      localStorage.setItem(localStoageKey, rpc);
    }
  };

  const clearCustomRpc = () => {
    setCustomRpcState(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(localStoageKey);
    }
  };

  return (
    <RpcContext.Provider
      value={{ customRpc, setCustomRpc, clearCustomRpc, error }}
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
