import Image from "next/image";
import Head from "next/head";
import { usePrivy } from "@privy-io/react-auth";
import type { WalletWithMetadata } from "@privy-io/react-auth";
import { shorten } from "lib/utils";
import Button from "components/Button";
import SignTypedData from "components/SignTypedData";
import EnsName from "components/EnsName";
import EnsAddress from "components/EnsAddress";
import EnsResolver from "components/EnsResolver";
import EnsAvatar from "components/EnsAvatar";
import SignMessage from "components/SignMessage";
import SwitchNetwork from "components/SwitchNetwork";
import Balance from "components/Balance";
import BlockNumber from "components/BlockNumber";
import SendTransaction from "components/SendTransaction";
import { useAccount, useDisconnect, useSwitchNetwork } from "wagmi";
import ContractRead from "components/ContractRead";
import ContractEvent from "components/ContractEvent";
import ContractReads from "components/ContractReads";
import ContractInfiniteReads from "components/ContractInfiniteReads";
import ContractWrite from "components/ContractWrite";
import Contract from "components/Contract";
import Token from "components/Token";
import Transaction from "components/Transaction";
import WatchPendingTransactions from "components/WatchPendingTransactions";
import WaitForTransaction from "components/WaitForTransaction";
import Signer from "components/Signer";
import FeeData from "components/FeeData";
import Provider from "components/Provider";

const MonoLabel = ({ label }: { label: string }) => {
  return (
    <span className="px-2 py-1 font-mono bg-slate-200 rounded-xl">{label}</span>
  );
};

export default function Home() {
  // Privy hooks
  const { login, logout, linkWallet, unlinkWallet, setActiveWallet, connectWallet, wallets } =
    usePrivy();
  const { ready, authenticated, user } = usePrivy();

  // WAGMI hooks
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  // Importing this fixes useSigner.
  const { switchNetwork } = useSwitchNetwork();

  const { disconnect } = useDisconnect();

  if (!ready) {
    return;
  }

  return (
    <>
      <Head>
        <title>Privy 🤝 WAGMI</title>
        <meta
          name="description"
          content="A demo app showing how to use Privy with WAGMI.sh"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen p-4 bg-slate-200 text-slate-800">
        <Image
          className="mx-auto rounded-lg"
          src="/4_1 logo.png"
          alt="logo"
          width={400}
          height={100}
        />
        <p className="my-4 text-center">
          This demo showcases how you can integrate <a href="https://wagmi.sh/" className="underline font-medium">wagmi</a> alongside <a href="https://www.privy.io/" className="underline font-medium">Privy</a> in your React app. Login below to try it out!
          <br />
          For more information, check out{" "}
          <a
            href="https://docs.privy.io/guide/guides/wagmi"
            className="underline font-medium"
          >
            our integration guide
          </a>
          {" "}or the{" "}
          <a
            href="https://github.com/privy-io/wagmi-demo"
            className="underline font-medium"
          >
            source code
          </a>
          {" "} for this app.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col items-start p-3 border border-black rounded gap-2 border-1 bg-slate-100">
            <h1 className="text-4xl font-bold">Privy</h1>
            {wallets.filter((wallet) => wallet.connected).map((wallet) => {
                  return (
                    <div
                      key={wallet.address}
                      className={"flex flex-row flex-wrap items-center justify-between min-w-full p-4 gap-2 bg-slate-50 " + (wallet.address === wallets[0].address ? "border border-black" : "")}
                    >
                      <div className="grid rows-3 gap-y-2">
                        <MonoLabel label={shorten(wallet.address)} />
                        <MonoLabel label={wallet.connectorType} />
                        <MonoLabel label={wallet.walletClientType} />
                      </div>
                      <Button
                        cta="Make active"
                        onClick_={() => setActiveWallet(wallet.address)}
                        disabled={wallet.address === wallets[0].address}
                      />
                      <Button
                        cta={wallet.linked ? "Unlink" : "Link"}
                        onClick_={() => wallet.linked ? wallet.unlink() : wallet.link()}
                        disabled={!authenticated}
                      />
                    </div>
                  );
                })}
            {ready && !authenticated && (
              <>
                <p>You are not authenticated with Privy</p>
                <div className="grid grid-cols-2 gap-x-4 justify-between">
                  <Button onClick_={login} cta="Login with Privy" />
                  <Button onClick_={connectWallet} cta="Connect a Wallet" />
                </div>
              </>
            )}
            {ready && authenticated && (
              <>
                <p>
                  You are logged in with privy.
                </p>
                <div className="grid grid-cols-3 gap-x-4 justify-between">
                  <Button onClick_={linkWallet} cta="Link another wallet" />
                  <Button onClick_={logout} cta="Logout from Privy" />
                  <Button onClick_={connectWallet} cta="Connect a Wallet" />
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col items-start p-3 border border-black rounded gap-2 border-1 bg-slate-100">
            <h1 className="text-4xl font-bold">WAGMI</h1>
            <p>
              Connection status: {isConnecting && <span>🟡 connecting...</span>}
              {isConnected && <span>🟢 connected.</span>}
              {isDisconnected && <span> 🔴 disconnected.</span>}
            </p>
            {isConnected && address && (
              <>
                <h2 className="mt-6 text-2xl">useAccount</h2>
                <p>
                  address: <MonoLabel label={address} />
                </p>

                <Balance />
                <Signer />
                <SignMessage />
                {/* <SignTypedData />
                <Provider />
                <EnsName />
                <EnsAddress />
                <EnsAvatar />
                <EnsResolver />
                <SwitchNetwork />
                <BlockNumber />
                <SendTransaction />
                <ContractRead />
                <ContractReads />
                <ContractInfiniteReads />
                <ContractWrite />
                <ContractEvent />
                <Contract />
                <FeeData />
                <Token />
                <Transaction />
                <WatchPendingTransactions />
                <WaitForTransaction /> */}

                <h2 className="mt-6 text-2xl">useDisconnect</h2>
                <Button onClick_={disconnect} cta="Disconnect from WAGMI" />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
