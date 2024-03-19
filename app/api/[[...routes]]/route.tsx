/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { handle } from 'frog/vercel'
import contractAbi from './contract.json'

const app = new Frog({
  basePath: '/api',
  // Supply a Hub API URL to enable frame verification.
  // hubApiUrl: 'https://api.hub.wevm.dev',
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  return c.res({
    action: '/finish',
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Mint an NFT
      </div>
    ),
    intents: [
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
    ]
  })
})
 
app.frame('/finish', (c) => {
  const { transactionId } = c
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Transaction ID: {transactionId}
      </div>
    )
  })
})
 
app.transaction('/mint', (c) => {
  return c.contract({
    abi: contractAbi.output.abi,
    chainId: 'eip155:84532',
    functionName: 'mint',
    args:['0x2Fd0BD0d1c846682F3730cB3F6c22052B43495A9', 0, 1, `0x`],
    to: '0x62958ef2000d25E1c9BF52659777cBacaBB67920',
  })
})

export const GET = handle(app)
export const POST = handle(app)
