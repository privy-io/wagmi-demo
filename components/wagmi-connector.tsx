import type React from "react";
import { configureChains, mainnet } from "@wagmi/core";
import { InjectedConnector } from "@wagmi/core/connectors/injected";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "@wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { infuraProvider } from "@wagmi/core/providers/infura";
import { createClient, WagmiConfig } from "wagmi";

export interface PrivyWagmiConnectorProps {
  children: React.ReactNode;
}

const { chains, provider } = configureChains(
  [mainnet],
  [
    infuraProvider({ apiKey: process.env.INFURA_API_KEY || "" }),
    publicProvider(),
  ]
);

export const PrivyWagmiConnector = ({
  children,
}: PrivyWagmiConnectorProps): JSX.Element => {
  const client = createClient({
    autoConnect: false,
    connectors: [
      new InjectedConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: "wagmi",
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
    ],
    provider,
  });
  console.log("created a client");
  console.log(client);
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};
