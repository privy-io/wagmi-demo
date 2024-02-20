import * as Playwright from '@playwright/test';
import {injectHeadlessWeb3Provider, type Web3ProviderBackend} from 'headless-web3-provider';

const ALICE = {
  privateKey: '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
};

const chainIdPortNumber = {
  5: 8545,
} as const;

const getChainAnvilRpcUrl = (chainId: keyof typeof chainIdPortNumber) =>
  `http://127.0.0.1:${chainIdPortNumber[chainId]}`;

type InjectWeb3Provider = (privateKeys?: string[]) => Promise<Web3ProviderBackend>;

export type TestOptions = {
  signers: string[];
  injectProvider: InjectWeb3Provider;
};

// A place for all setup / teardown that needs to happen before every test.
// We should only be importing this `test`, instead of `import {test} from "@playwright/test"`
export const test = Playwright.test.extend<TestOptions>({
  signers: [ALICE.privateKey],
  injectProvider: async ({page, signers}, use) => {
    await page.addInitScript(() => {
      function announceProvider() {
        const info = {
          uuid: '350670db-19fa-4704-a166-e52e178b59d2',
          name: 'MetaMask',
          icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>",
          rdns: 'io.metamask',
        };
        window.dispatchEvent(
          new CustomEvent('eip6963:announceProvider', {
            detail: {info, provider: window.ethereum},
          }),
        );
      }
      window.addEventListener('eip6963:requestProvider', () => announceProvider());
    });
    await use((privateKeys = signers) =>
      injectHeadlessWeb3Provider(page, privateKeys, 5, getChainAnvilRpcUrl(5)),
    );
  },
});
export {expect} from '@playwright/test';
