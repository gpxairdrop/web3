walletKit.on('session_authenticate', async payload => {
  // Process the authentication request here.
  // Steps include:
  // 1. Populate the authentication payload with the supported chains and methods
  // 2. Format the authentication message using the payload and the user's account
  // 3. Present the authentication message to the user
  // 4. Sign the authentication message(s) to create a verifiable authentication object(s)
  // 5. Approve the authentication request with the authentication object(s)
})
import { populateAuthPayload } from "@walletconnect/utils";

// EVM chains that your wallet supports
const supportedChains = ["eip155:11155111", "eip155:17000"];
// EVM methods that your wallet supports
const supportedMethods = ["personal_sign", "eth_sendTransaction", "eth_signTypedData"];
// Populate the authentication payload with the supported chains and methods
const authPayload = populateAuthPayload({
  authPayload: payload.params.authPayload,
  chains: supportedChains,
  methods: supportedMethods,
});
// Prepare the user's address in CAIP10(https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-10.md) format
const iss = `eip155:11155111:0x0Df6d2a56F90e8592B4FfEd587dB3D5F5ED9d6ef`;
// Now you can use the authPayload to format the authentication message
const message = walletKit.formatAuthMessage({
  request: authPayload,
  iss
});

// Present the authentication message to the user
...
// Approach 1
// Sign the authentication message(s) to create a verifiable authentication object(s)
const signature = await cryptoWallet.signMessage(message, privateKey)
// Build the authentication object(s)
const auth = buildAuthObject(
  authPayload,
  {
    t: 'eip191',
    s: signature
  },
  iss
)

// Approve
await walletKit.approveSessionAuthenticate({
  id: payload.id,
  auths: [auth]
})

// Approach 2
// Note that you can also sign multiple messages for every requested chain/address pair
const auths = []
authPayload.chains.forEach(async chain => {
  const message = walletKit.formatAuthMessage({
    request: authPayload,
    iss: `${chain}:${cryptoWallet.address}`
  })
  const signature = await cryptoWallet.signMessage(message)
  const auth = buildAuthObject(
    authPayload,
    {
      t: 'eip191', // signature type
      s: signature
    },
    `${chain}:${cryptoWallet.address}`
  )
  auths.push(auth)
})

// Approve
await walletKit.approveSessionAuthenticate({
  id: payload.id,
  auths
})
import { getSdkError } from '@walletconnect/utils'

await walletKit.rejectSessionAuthenticate({
  id: payload.id,
  reason: getSdkError('USER_REJECTED') // or choose a different reason if applicable
})
