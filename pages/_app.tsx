import '../styles/globals.css';

import type {AppProps} from 'next/app';
import {configureChains, goerli, mainnet} from 'wagmi';
import {jsonRpcProvider} from 'wagmi/providers/jsonRpc';

import {PrivyProvider} from '@privy-io/react-auth';
import {PrivyWagmiConnector} from '@privy-io/wagmi-connector';

const configureChainsConfig = configureChains(
  [mainnet, goerli],
  [
    jsonRpcProvider({
      rpc: (chain: {id: number}) => {
        switch (chain.id) {
          case 1:
            return {
              http: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
              webSocket: `wss://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
            };
          case 5:
            return {
              http: `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
              webSocket: `wss://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
            };
          default:
            throw new Error('Unsupported network. Please switch to Goerli or Mainnet.');
        }
      },
    }),
  ],
);

export default function App({Component, pageProps}: AppProps) {
  return (
    <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}>
      <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
        <Component {...pageProps} />
      </PrivyWagmiConnector>
    </PrivyProvider>
  );
}
