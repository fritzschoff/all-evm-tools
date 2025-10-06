import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { chains } from './chains';

export const web3Config = getDefaultConfig({
  appName: 'All EVM Tools',
  projectId: '3454e9cd1ac5e55e24028f5fb1df1a42',
  chains: chains,
  ssr: true,
});
