import { test, type Page } from '@playwright/test'
import { type Web3ProviderBackend } from 'headless-web3-provider'

export async function signMessage(page: Page, wallet: Web3ProviderBackend, buttonText: string) {
  await test.step(`Sign message`, async () => {
    await page.evaluate(async () => {
      window.ethereum.isMetaMask = true
    })
    await page.getByRole('button', { name: buttonText }).click()
    await page.getByRole('button', { name: 'Sign and continue' }).click()
  })
}

export async function signTypedData(page: Page, wallet: Web3ProviderBackend, buttonText: string) {
  await test.step(`Sign typed message`, async () => {
    await page.evaluate(async () => {
      window.ethereum.isMetaMask = true
    })
    await page.getByRole('button', { name: buttonText }).click()
  })
}

