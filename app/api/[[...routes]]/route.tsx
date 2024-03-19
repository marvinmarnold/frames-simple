/** @jsxImportSource frog/jsx */

import { Button, Frog } from 'frog'
import { handle } from 'frog/vercel'
import contractAbi from './contract.json'

const app = new Frog({
  basePath: '/api',
})

app.frame('/', (c) => {
  return c.res({
    action: '/finish',
    image: "https://dweb.mypinata.cloud/ipfs/QmSYN7KT847Nado3fxFafYZgG6NXTMZwbaMvU9jhu5nPmJ",
    intents: [
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
    ]
  })
})
 
app.frame('/finish', (c) => {
  return c.res({
    image: "https://dweb.mypinata.cloud/ipfs/QmUx3kQH4vR2t7mTmW3jHJgJgJGxjoBsMxt6z1fkZEHyHJ"
  })
})
 
app.transaction('/mint', (c) => {
  return c.contract({
    abi: contractAbi.output.abi,
    chainId: 'eip155:84532',
    functionName: 'mint',
    to: '0xF6953859Cd0D50be9495681815515750061CA834',
  })
})

export const GET = handle(app)
export const POST = handle(app)
