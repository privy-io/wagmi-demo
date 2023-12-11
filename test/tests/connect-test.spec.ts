import { connectWallet } from 'test/connect-wallet'
import { test } from '../fixture'

test('should connect a wallet', async ({
  page,
  injectProvider,
}) => {
  const wallet = await injectProvider()
  await page.goto(`/`)
  await connectWallet(page, wallet)
  await page.waitForSelector('div:has-text("Logout from Privy")')
})

