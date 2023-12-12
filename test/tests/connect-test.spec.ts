import { connectWallet } from 'test/connect-wallet'
import { signMessage, signTypedData } from 'test/sign-message'
import { test } from '../fixture'
import { sleep } from 'test/sleep'

test('should connect a wallet', async ({
  page,
  injectProvider,
}) => {
  const wallet = await injectProvider()
  await page.goto(`/`)
  await connectWallet(page, wallet)
  await page.waitForSelector('div:has-text("Logout from Privy")')
  await sleep(1000)
})

test('should sign a message', async ({
  page,
  injectProvider,
}) => {
  const wallet = await injectProvider()
  await page.goto(`/`)
  await signMessage(page, wallet, "Sign!")
  await page.waitForSelector('div:has-text("Signature: ")')
  await sleep(1000)
})

test('should sign a typed message', async ({
  page,
  injectProvider,
}) => {
  const wallet = await injectProvider()
  await page.goto(`/`)
  await signTypedData(page, wallet, "Sign typed data!")
  await page.waitForSelector('div:has-text("Signature: ")')
  await sleep(1000)
})

