import { connectWallet } from 'test/playwright/connect-wallet'
import { signMessage, signTypedData } from 'test/playwright/sign-message'
import { test } from '../fixture'
import { sleep } from 'test/playwright/sleep'
import { Web3ProviderBackend } from 'headless-web3-provider'

var wallet: Web3ProviderBackend
test.beforeEach(async ({page, injectProvider}) => {
  // Starts the initial login flow
  wallet = await injectProvider()
  await page.goto(`/`)
  await connectWallet(page, wallet)
} )

test('should connect a wallet', async ({
  page
}) => {
  await page.getByRole('button', {name: "Logout from Privy"}).isVisible()
  await sleep(1000) // used so that you can see the signature on the screen
})

test('should sign a message', async ({
  page,
}) => {
  await signMessage(page, wallet, "Sign!")
  await page.getByText('/^Signature: ').isVisible()
  await sleep(1000) // used so that you can see the signature on the screen
})

test('should sign a typed message', async ({
  page,
}) => {
  await signTypedData(page, wallet, "Sign typed data!")
  await page.getByText('/^Signature: ').isVisible()
  await sleep(1000) // used so that you can see the signature on the screen
})

