import { useState } from "react";
import Head from "next/head";
import { usePrivy } from "@privy-io/react-auth";
import type { WalletWithMetadata } from "@privy-io/react-auth";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSignMessage,
  useEnsName,
  useNetwork,
  useSwitchNetwork,
  useSignTypedData,
} from "wagmi";

const shorten = (address: string | undefined) => {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4,
    address.length
  )}`;
};

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
      className="px-10 py-2 text-white rounded bg-slate-800 enabled:hover:cursor-pointer enabled:active:scale-75 transition-all disabled:opacity-80"
      onClick={onClick_}
      disabled={disabled}
    >
      {cta}
    </button>
  );
};

const UseSignTypedMessage = () => {
  // All properties on a domain are optional
  const domain = {
    name: "Ether Mail",
    version: "1",
    chainId: 1,
    verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
  } as const;

  // The named list of all type definitions
  const types = {
    Person: [
      { name: "name", type: "string" },
      { name: "wallet", type: "address" },
    ],
    Mail: [
      { name: "from", type: "Person" },
      { name: "to", type: "Person" },
      { name: "contents", type: "string" },
    ],
  } as const;

  const value = {
    from: {
      name: "Cow",
      wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
    },
    to: {
      name: "Bob",
      wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
    },
    contents: "Hello, Bob!",
  } as const;
  const { data, isError, isLoading, isSuccess, signTypedData } =
    useSignTypedData({
      domain,
      types,
      value,
    });

  return (
    <div>
      <Button
        disabled={isLoading}
        onClick_={() => {
          signTypedData();
        }}
        cta="Sign typed data!"
      />
      {isSuccess && <div>Signature: {shorten(data)}</div>}
      {isError && <div>Error signing message</div>}
    </div>
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
  const { chain, chains: netChains } = useNetwork();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: ensName, isError, isLoading, status } = useEnsName({ address });
  const { isLoading: signLoading, signMessage } = useSignMessage({
    onSuccess() {
      console.log("Sign Message Success");
    },
  });
  const {
    chains,
    error: switchNetworkError,
    isLoading: networkLoading,
    pendingChainId,
    switchNetwork,
  } = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
    onError(error) {
      console.log("Switch network error", error);
    },
    onMutate(args) {
      console.log("Switch network mutated:", args);
    },
    onSettled(data, error) {
      console.log("Switch network settled", { data, error });
    },
  });

  const [showChains, setShowChains] = useState(false);

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
        <h1 className="text-4xl text-center">WAGMI & Privy demo</h1>
        <p className="text-center">
          This demo showcases how you can setup WAGMI and Privy to work
          together.
          <br />
          Login below to observe the behavior.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col items-start p-3 border border-black rounded gap-2 border-1 bg-slate-100">
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
                  You are logged in with privy.
                  <br />
                  Active wallet is{" "}
                  <span className="px-2 py-1 font-mono bg-slate-200 rounded-xl">
                    {user?.wallet?.address}
                  </span>
                </p>
                {wallets.map((wallet) => {
                  return (
                    <div
                      key={wallet.address}
                      className="flex flex-row items-center justify-between min-w-full p-4 gap-2 bg-slate-50"
                    >
                      <p className="px-2 py-1 font-mono bg-slate-200 rounded-xl">
                        {shorten(wallet.address)}
                      </p>
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
            <h2 className="text-2xl">WAGMI</h2>
            <p>
              Connection status: {isConnecting && <span>🟡 connecting...</span>}
              {isConnected && <span>🟢 connected.</span>}
              {isDisconnected && <span> 🔴 disconnected.</span>}
            </p>
            {isConnected ? (
              <>
                <h2 className="text-2xl">useAccount</h2>
                <p>
                  address:{" "}
                  <span className="px-2 py-1 font-mono bg-slate-200 rounded-xl">
                    {address}
                  </span>
                </p>
                <h2 className="text-2xl">useSignMessage</h2>
                {!signLoading ? (
                  <Button
                    onClick_={() => {
                      signMessage({
                        message: `Signing with WAGMI\nWAGMI address: ${shorten(
                          address
                        )}\nPrivy address: ${shorten(user?.wallet?.address)}`,
                      });
                    }}
                    cta="Sign!"
                  />
                ) : (
                  <p>Message is being signed...</p>
                )}

                <h2 className="text-2xl">useSignTypedMessage</h2>
                <UseSignTypedMessage />

                <h2 className="text-2xl">useEnsName</h2>
                <p>
                  {isLoading && (
                    <>
                      Ens loading: {isLoading}
                      <br />
                    </>
                  )}
                  Ens status:{" "}
                  <span className="px-2 py-2 font-mono bg-slate-200 rounded-xl">
                    {status}
                  </span>
                  <br />
                  {isError && (
                    <>
                      Ens error: {isError}
                      <br />
                    </>
                  )}
                  {ensName ? (
                    <>
                      Ens name:{" "}
                      <span className="px-2 py-1 font-mono bg-slate-200 rounded-xl">
                        {ensName}
                      </span>
                    </>
                  ) : (
                    <p>No ens name for this address.</p>
                  )}
                </p>

                <h2 className="text-2xl">useNetwork (chain switching)</h2>
                {chain && (
                  <p>
                    Connected to{" "}
                    <span className="px-2 py-1 font-mono bg-slate-200 rounded-xl">
                      {chain.name}
                    </span>
                  </p>
                )}
                <div className="flex flex-row items-center gap-2">
                  <p>View chains object from useNetwork: </p>
                  <Button
                    onClick_={() => setShowChains(!showChains)}
                    cta={showChains ? "Hide" : "Show"}
                  />
                </div>
                {showChains && (
                  <div className="w-full mt-2">
                    <textarea
                      rows={5}
                      name="Chains"
                      id="chains"
                      className="w-full text-sm rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-1.5"
                      defaultValue={JSON.stringify(netChains, null, 2)}
                    />
                  </div>
                )}
                <div className="flex flex-row items-center gap-2">
                  <p>Switch chains: </p>
                  {chains.map((x) => (
                    <button
                      disabled={!switchNetwork || x.id === chain?.id}
                      key={x.id}
                      onClick={() => switchNetwork?.(x.id)}
                      className="px-10 py-2 text-white rounded min-w-[150px] bg-slate-800 enabled:hover:cursor-pointer enabled:active:scale-75 transition-all disabled:opacity-80"
                    >
                      {x.name}
                      {networkLoading &&
                        pendingChainId === x.id &&
                        " (switching)"}
                      {switchNetworkError && (
                        <div>
                          Network switch error:{" "}
                          {JSON.stringify(switchNetworkError, null, 2)}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <h2 className="text-2xl">useDisconnect</h2>
                <Button onClick_={disconnect} cta="Disconnect from WAGMI" />
              </>
            ) : (
              <>
                <Button
                  onClick_={() => {
                    connect({ connector: connectors[0] });
                  }}
                  cta={`Connect with WAGMI`}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
