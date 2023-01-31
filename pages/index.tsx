import Head from "next/head";
import { usePrivy } from "@privy-io/react-auth";
import type { WalletWithMetadata } from "@privy-io/react-auth";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSignMessage,
  useEnsName,
} from "wagmi";

type buttonProps = {
  cta: string;
  onClick_: () => void;
  disabled?: boolean;
};
const Button = ({ cta, onClick_, disabled }: buttonProps) => {
  if (disabled) {
  }
  return (
    <button
      className="px-10 py-2 rounded bg-slate-800 text-white enabled:hover:cursor-pointer enabled:active:scale-75 transition-all disabled:opacity-80"
      onClick={onClick_}
      disabled={disabled}
    >
      {cta}
    </button>
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
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: ensName, isError, isLoading, status } = useEnsName({ address });
  const { isLoading: signLoading, signMessage } = useSignMessage({
    onSuccess() {
      console.log("Sign Message Success");
    },
  });

  if (!ready) {
    return;
  }

  console.log("ensname:", ensName);
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
      <main className="bg-slate-200 text-slate-800 p-4 min-h-screen">
        <h1 className="text-4xl text-center">WAGMI & Privy demo</h1>
        <p className="text-center">
          This demo showcases how you can setup WAGMI and Privy to work
          together.
          <br />
          Login below to observe the behavior.
        </p>
        <div className="grid grid-cols-2 mt-4 gap-4">
          <div className="p-3 flex flex-col items-start gap-2 border border-1 border-black rounded bg-slate-100">
            <h2 className="text-2xl">Privy</h2>
            {ready && !authenticated && (
              <>
                <p>You are not authenticated with Privy</p>
                <Button onClick_={login} cta="Login with Privy" />
              </>
            )}

            {ready && authenticated && (
              <>
                <p>
                  You are logged in with privy. Active wallet is{" "}
                  <span className="font-mono">{user?.wallet?.address}</span>
                </p>
                {wallets.map((wallet) => {
                  return (
                    <div
                      key={wallet.address}
                      className="flex flex-row gap-2 min-w-full items-center justify-between p-4 bg-slate-50"
                    >
                      <p className="font-mono">{wallet.address}</p>
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
          <div className="p-3 flex flex-col items-start gap-2 border border-1 border-black rounded bg-slate-100">
            <h2 className="text-2xl">WAGMI</h2>
            {!isConnected && (
              <>
                <p>You are not connected with WAGMI</p>
                <Button
                  onClick_={() => {
                    connect({ connector: connectors[0] });
                  }}
                  cta={`Connect with WAGMI`}
                />
              </>
            )}

            {address && isConnected && (
              <>
                {!signLoading ? (
                  <Button
                    onClick_={() => {
                      signMessage({
                        message: "This is a message being signed with WAGMI",
                      });
                    }}
                    cta="Sign a message with useSignMessage"
                  />
                ) : (
                  <p>Message is being signed...</p>
                )}
                <>
                  <p>
                    Address from WAGMI:{" "}
                    <span className="font-mono">{address} </span>
                    <br />
                    Ens loading: {isLoading}
                    <br />
                    Ens status: {status}
                    <br />
                    Ens error: {isError}
                    <br />
                    Ens name: {ensName}
                    {ensName && <span className="font-mono">{ensName}</span>}
                  </p>
                  <br />
                  <Button onClick_={disconnect} cta="Disconnect from WAGMI" />
                </>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
