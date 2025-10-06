import { arbitrum, base, mainnet, optimism, polygon } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

export const web3Config = getDefaultConfig({
  appName: 'All EVM Tools',
  projectId: '3454e9cd1ac5e55e24028f5fb1df1a42',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});
