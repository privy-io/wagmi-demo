import '../styles/globals.css';

import {goerli, mainnet} from '@wagmi/core/chains';
import type {AppProps} from 'next/app';
import {configureChains} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';

import {PrivyProvider} from '@privy-io/react-auth';
import {PrivyWagmiConnector} from '@privy-io/wagmi-connector';

const configureChainsConfig = configureChains([mainnet, goerli], [publicProvider()]);

export default function App({Component, pageProps}: AppProps) {
  return (
    <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}>
      <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
        <Component {...pageProps} />
      </PrivyWagmiConnector>
    </PrivyProvider>
  );
}
