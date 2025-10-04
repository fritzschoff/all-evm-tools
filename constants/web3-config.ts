import { arbitrum, base, mainnet, optimism, polygon } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

export const web3Config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
})

