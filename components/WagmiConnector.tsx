// import { WagmiConfig, WindowProvider } from "wagmi"
import {goerli, mainnet} from '@wagmi/chains';
import {configureChains, createConfig} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected'
// import { ConnectedWallet, useWallets } from "@privy-io/react-auth";
import { useMemo } from "react";
// import { EIP1193Provider } from "viem";

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [goerli, mainnet],
    [publicProvider()],
  )

// const config = createConfig({
//     publicClient,
//     webSocketPublicClient,
//     connectors: [
//         new InjectedConnector({ chains }),
//     ]
// });

export const WagmiConnector = ({children}: {children: React.ReactNode}) => {
    const {wallets} = useWallets();

    const connectors = useMemo(async () => {
        const injectedWallets = wallets.filter((wallet) => (wallet.connectorType === 'injected'));
        const injectedProviders = await Promise.all(injectedWallets?.map((wallet: ConnectedWallet) => wallet.getEthereumProvider()));
        const connectors = [new InjectedConnector({chains, options: {
            getProvider: () => {
                return {providers: injectedProviders} as WindowProvider;
            }
        }})];
        return connectors;
    }, [wallets])

    const config = useMemo(() => {
        return createConfig({
            publicClient,
            webSocketPublicClient,
            connectors: connectors
        })
    }, [connectors]);


    return(
        <WagmiConfig config={config}>
            {children}
        </WagmiConfig>
    )
}