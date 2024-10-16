<script src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.7.4-rc.1/web3.min.js"></script>
<script>
/* To connect using MetaMask */
async function connect() {
 if (window.ethereum) {
import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { arbitrum, mainnet } from '@reown/appkit/networks'

// 1. Get projectId
const projectId = 'fd4d93557f7fb9680d03266b1f45a117';

// 2. Set the networks
const networks = [arbitrum, mainnet];

// 3. Create a metadata object - optional
const metadata = {
  name: 'web3 givpn',
  description: 'AppKit Example',
  url: 'https://gpxairdrop.github.io/web3', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// 4. Create a AppKit instance
createAppKit({
  adapters: [new ethersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
