import { chains } from './chains';

export const defaultRpcs = chains.map((chain) => ({
  chainName: chain.name,
  chainId: chain.id,
  rpcUrl: chain.rpcUrls.default.http[0],
}));
