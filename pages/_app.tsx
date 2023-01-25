import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PrivyProvider } from "@privy-io/react-auth";
import { PrivyWagmiConnector } from "privy-wagmi-connector";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}>
      <PrivyWagmiConnector>
        <Component {...pageProps} />
      </PrivyWagmiConnector>
    </PrivyProvider>
  );
}
