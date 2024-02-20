import {test, type Page} from '@playwright/test';
import {type Web3ProviderBackend, Web3RequestKind} from 'headless-web3-provider';

import {authorizeRequest} from './authorize-request';

export async function connectWallet(page: Page, wallet: Web3ProviderBackend) {
  await test.step(`Connect wallet`, async () => {
    await page.evaluate(async () => {
      window.ethereum.isMetaMask = true;
    });

    // Click connect button
    await page.getByRole('button', {name: 'Login with Privy', exact: true}).first().click();
    await page.getByRole('button', {name: 'MetaMask Connect'}).click();

    // Authorize sign in requests
    await authorizeRequest({wallet, requestKind: Web3RequestKind.RequestPermissions});
    await authorizeRequest({wallet, requestKind: Web3RequestKind.RequestAccounts});
    await authorizeRequest({wallet, requestKind: Web3RequestKind.SignMessage});
    // Wait for dialog to close before interacting with the page
    await page.waitForSelector('#privy-dialog:not([open])');
  });
}
