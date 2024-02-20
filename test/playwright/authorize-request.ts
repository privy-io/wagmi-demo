import {Web3ProviderBackend, Web3RequestKind} from 'headless-web3-provider';

import {sleep} from './sleep';

export const authorizeRequest = async ({
  wallet,
  requestKind,
}: {
  wallet: Web3ProviderBackend;
  requestKind: Web3RequestKind;
}) => {
  while (wallet.getPendingRequestCount(requestKind) !== 1) {
    await sleep(100);
  }
  await wallet.authorize(requestKind);
};
