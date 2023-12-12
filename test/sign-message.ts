import { test, type Page } from '@playwright/test'
import { type Web3ProviderBackend, Web3RequestKind } from 'headless-web3-provider'

import { sleep } from './sleep'

export const authorizeRequest = async ({
  wallet,
  requestKind,
}: {
  wallet: Web3ProviderBackend
  requestKind: Web3RequestKind
}) => {
  while (wallet.getPendingRequestCount(requestKind) !== 1) {
    await sleep(100)
  }
  await wallet.authorize(requestKind)
}

export async function signMessage(page: Page, wallet: Web3ProviderBackend, buttonText: string) {
  await test.step(`Connect wallet`, async () => {
    await page.evaluate(async () => {
      window.ethereum.isMetaMask = true
    })

    // Click connect button
    await page.getByRole('button', { name: 'Login with Privy', exact: true }).first().click()
    await page.getByRole('button', { name: 'MetaMask Connect' }).click()

    // Authorize sign in requests
    await authorizeRequest({ wallet, requestKind: Web3RequestKind.RequestPermissions })
    await authorizeRequest({ wallet, requestKind: Web3RequestKind.RequestAccounts })
    await authorizeRequest({ wallet, requestKind: Web3RequestKind.SignMessage })
    // Wait for dialog to close before interacting with the page
    await page.waitForSelector('#privy-dialog:not([open])')
    await page.getByRole('button', { name: buttonText }).click()
    await authorizeRequest({ wallet, requestKind: Web3RequestKind.SignMessage })
  })

  return {
    sendTransaction: () =>
      authorizeRequest({ wallet, requestKind: Web3RequestKind.SendTransaction }),
  }
}

export async function signTypedData(page: Page, wallet: Web3ProviderBackend, buttonText: string) {
  await test.step(`Connect wallet`, async () => {
    await page.evaluate(async () => {
      window.ethereum.isMetaMask = true
    })

    // Click connect button
    await page.getByRole('button', { name: 'Login with Privy', exact: true }).first().click()
    await page.getByRole('button', { name: 'MetaMask Connect' }).click()

    // Authorize sign in requests
    await authorizeRequest({ wallet, requestKind: Web3RequestKind.RequestPermissions })
    await authorizeRequest({ wallet, requestKind: Web3RequestKind.RequestAccounts })
    await authorizeRequest({ wallet, requestKind: Web3RequestKind.SignMessage })
    // Wait for dialog to close before interacting with the page
    await page.waitForSelector('#privy-dialog:not([open])')
    await page.getByRole('button', { name: buttonText }).click()
    await authorizeRequest({ wallet, requestKind: Web3RequestKind.SignTypedDataV4 })
  })

  return {
    sendTransaction: () =>
      authorizeRequest({ wallet, requestKind: Web3RequestKind.SendTransaction }),
  }
}

