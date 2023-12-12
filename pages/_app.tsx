import '../styles/globals.css';

import {goerli, zoraTestnet } from '@wagmi/chains';
import type {AppProps} from 'next/app';
import {configureChains} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';

import {type PrivyClientConfig, PrivyProvider} from '@privy-io/react-auth';
import {PrivyWagmiConnector} from '@privy-io/wagmi-connector';

const configureChainsConfig = configureChains([zoraTestnet, goerli], [publicProvider()]);

const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: true,
    noPromptOnSignature: false,
  },
  loginMethods: ['wallet', 'email'],
  appearance: {
    showWalletLoginFirst: true,
  },
}


export default function App({Component, pageProps}: AppProps) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      //@ts-ignore
      apiUrl={process.env.NEXT_PUBLIC_PRIVY_AUTH_URL}
      config={privyConfig}
    >
      <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
        <Component {...pageProps} />
      </PrivyWagmiConnector>
    </PrivyProvider>
  );
}
