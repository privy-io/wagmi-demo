import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PrivyProvider } from "@privy-io/react-auth";
import { configureChains, mainnet } from "@wagmi/core";
import { InjectedConnector } from "@wagmi/core/connectors/injected";
import { CoinbaseWalletConnector } from "@wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { infuraProvider } from "@wagmi/core/providers/infura";
import { WagmiConfig, createClient } from "wagmi";

const { chains, provider } = configureChains(
  [mainnet],
  [infuraProvider({ apiKey: process.env.INFURA_API_KEY || "" })]
);

const client = createClient({
  autoConnect: false,
  connectors: [
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </PrivyProvider>
  );
}
