import { createAppKit } from '@reown/appkit'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { defineChain } from '@reown/appkit/networks';
// Define the custom network
const customNetwork = defineChain({
  id: 11155111,
  caipNetworkId: 'eip155:11155111',
  chainNamespace: 'eip155',
  name: 'Ethereum Testnet Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Sepolia',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia.org'],
      webSocket: ['wss://sepolia.drpc.org'],
    },
  },
  blockExplorers: {
    default: { name: 'etherscan-sepolia', url: 'https://sepolia.etherscan.io' },
  }

// 1. Get projectId from https://cloud.reown.com
const projectId = 'YOUR_PROJECT_ID'

// 2. Create your application's metadata object
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 3. Create a AppKit instance
const modal = createAppKit({
  adapters: [new EthersAdapter()],
  networks: [mainnet, arbitrum],
  metadata,
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})
