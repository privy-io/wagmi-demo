import Head from "next/head";
import { usePrivy } from "@privy-io/react-auth";

export default function Home() {
  const { login, logout } = usePrivy();
  const { ready, authenticated, user } = usePrivy();

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
      <main className="bg-slate-300 p-4 min-h-screen">
        <h1 className="text-4xl">WAGMI & Privy demo</h1>
        {ready && !authenticated && (
          <div className="py-3 flex flex-col items-start gap-2">
            <p>
              This demo showcases how you can setup WAGMI and Privy to work
              together.
              <br />
              Please login with Privy below to get started.
            </p>
            <button
              className="px-10 py-4 rounded bg-slate-800 text-white hover:cursor-pointer active:scale-75 transition-all"
              onClick={login}
            >
              Login with Privy
            </button>
          </div>
        )}

        {ready && authenticated && (
          <div className="py-3 flex flex-col items-start gap-2">
            {user && user.wallet ? (
              <p>Address from Privy: {user?.wallet?.address}</p>
            ) : (
              <p>Please link a wallet with Privy</p>
            )}
            <p>Address from WAGMI: </p>
            <button
              className="px-10 py-4 rounded bg-slate-800 text-white hover:cursor-pointer active:scale-75 transition-all"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </main>
    </>
  );
}
