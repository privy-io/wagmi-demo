import '../styles/globals.css';

import {goerli, polygonMumbai} from '@wagmi/chains';
import type {AppProps} from 'next/app';
import {configureChains} from 'wagmi';
import {alchemyProvider} from 'wagmi/providers/alchemy';

import {PrivyProvider} from '@privy-io/react-auth';
import {PrivyWagmiConnector} from '@privy-io/wagmi-connector';

const configureChainsConfig = configureChains(
  [polygonMumbai, goerli],
  [alchemyProvider({apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string})],
);

export default function App({Component, pageProps}: AppProps) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      config={{embeddedWallets: {createOnLogin: 'all-users', requireUserPasswordOnCreate: false}}}
    >
      <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
        <Component {...pageProps} />
      </PrivyWagmiConnector>
    </PrivyProvider>
  );
}
