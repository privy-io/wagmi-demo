import { connectWallet } from 'test/connect-wallet'
import { signMessage, signTypedData } from 'test/sign-message'
import { test } from '../fixture'
import { sleep } from 'test/sleep'
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
  await page.waitForSelector('div:has-text("Logout from Privy")')
  await sleep(1000)
})

test('should sign a message', async ({
  page,
}) => {
  await signMessage(page, wallet, "Sign!")
  await page.waitForSelector('div:has-text("Signature: ")')
  await sleep(1000)
})

test('should sign a typed message', async ({
  page,
}) => {
  await signTypedData(page, wallet, "Sign typed data!")
  await page.waitForSelector('div:has-text("Signature: ")')
  await sleep(1000)
})

