import Image from "next/image";
import Head from "next/head";
import { usePrivy } from "@privy-io/react-auth";
import type { WalletWithMetadata } from "@privy-io/react-auth";
import { shorten } from "lib/utils";
import Button from "components/Button";
import SignTypedData from "components/SignTypedData";
import EnsName from "components/EnsName";
import EnsAddress from "components/EnsAddress";
import EnsAvatar from "components/EnsAvatar";
import SignMessage from "components/SignMessage";
import SwitchNetwork from "components/SwitchNetwork";
import Balance from "components/Balance";
import BlockNumber from "components/BlockNumber";
import { useAccount, useDisconnect } from "wagmi";

const MonoLabel = ({ label }: { label: string }) => {
  return (
    <span className="px-2 py-1 font-mono bg-slate-200 rounded-xl">{label}</span>
  );
};

export default function Home() {
  // Privy hooks
  const { login, logout, linkWallet, unlinkWallet, setActiveWallet } =
    usePrivy();
  const { ready, authenticated, user } = usePrivy();

  const linkedAccounts = user?.linkedAccounts || [];
  const wallets = linkedAccounts.filter(
    (a) => a.type === "wallet"
  ) as WalletWithMetadata[];

  // WAGMI hooks
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
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
          This demo showcases how you can setup WAGMI and Privy to work
          together. Login below with Privy to try it out!
          <br />
          For more information, see{" "}
          <a
            href="https://docs.privy.io/guide/guides/wagmi"
            className="font-bold underline"
          >
            our integration guide
          </a>
          .
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col items-start p-3 border border-black rounded gap-2 border-1 bg-slate-100">
            <h1 className="text-4xl font-bold">Privy</h1>
            {ready && !authenticated && (
              <>
                <p>You are not authenticated with Privy</p>
                <Button onClick_={login} cta="Login with Privy" />
              </>
            )}

            {ready && authenticated && (
              <>
                <p>
                  You are logged in with privy.
                  <br />
                  Active wallet is{" "}
                  <MonoLabel label={user?.wallet?.address || ""} />
                </p>
                {wallets.map((wallet) => {
                  return (
                    <div
                      key={wallet.address}
                      className="flex flex-row flex-wrap items-center justify-between min-w-full p-4 gap-2 bg-slate-50"
                    >
                      <div>
                        <MonoLabel label={shorten(wallet.address)} />
                      </div>
                      <Button
                        cta="Make active"
                        onClick_={() => setActiveWallet(wallet.address)}
                        disabled={wallet.address === user?.wallet?.address}
                      />
                      <Button
                        cta="Unlink"
                        onClick_={() => unlinkWallet(wallet.address)}
                      />
                    </div>
                  );
                })}
                <Button onClick_={linkWallet} cta="Link another wallet" />

                <br />
                <Button onClick_={logout} cta="Logout from Privy" />
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
                <SignMessage />
                <SignTypedData />
                <EnsName />
                <EnsAddress />
                <EnsAvatar />
                <SwitchNetwork />
                <BlockNumber />

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
