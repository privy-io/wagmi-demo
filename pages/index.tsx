import Head from "next/head";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";

type buttonProps = {
  cta: string;
  onClick_: () => void;
};
const Button = ({ cta, onClick_ }: buttonProps) => {
  return (
    <button
      className="px-10 py-2 rounded bg-slate-800 text-white hover:cursor-pointer active:scale-75 transition-all"
      onClick={onClick_}
    >
      {cta}
    </button>
  );
};

export default function Home() {
  // Privy hooks
  const { login, logout } = usePrivy();
  const { ready, authenticated, user } = usePrivy();

  // WAGMI hooks
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { isLoading: signLoading, signMessage } = useSignMessage({
    onSuccess() {
      console.log("Sign Message Success");
    },
  });

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
                <p>Address from Privy: {user?.wallet?.address}</p>
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
                  cta={`Connect with WAGMI connector (${connectors[0]?.name})`}
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
                    cta="Sign a message with useSignMessage (WAGMI hook)"
                  />
                ) : (
                  <p>Message is being signed...</p>
                )}
                <>
                  <p>Address from WAGMI: {address}</p>
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
