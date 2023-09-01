import Button from 'components/Button';
import Debug from 'components/Debug';
import {shorten} from 'lib/utils';
import Head from 'next/head';
import Image from 'next/image';
import {useAccount} from 'wagmi';

import {type WalletWithMetadata, usePrivy, useWallets} from '@privy-io/react-auth';
import {usePrivyWagmi} from '@privy-io/wagmi-connector';

import wagmiPrivyLogo from '../public/wagmi_privy_logo.png';

const MonoLabel = ({label}: {label: string}) => {
  return <span className="rounded-xl bg-slate-200 px-2 py-1 font-mono">{label}</span>;
};

export default function Home() {
  // Privy hooks
  const {ready, user, authenticated, login, connectWallet, logout, linkWallet, unlinkWallet} =
    usePrivy();
  const {wallets: connectedWallets} = useWallets();

  const {wallet: activeWallet, setActiveWallet} = usePrivyWagmi();

  // WAGMI hooks
  const {address, isConnected, isConnecting, isDisconnected} = useAccount();

  const wallets = user?.linkedAccounts.filter((a) => a.type === 'wallet') as WalletWithMetadata[];

  if (!ready) {
    return;
  }

  return (
    <>
      <Head>
        <title>Privy 🤝 WAGMI</title>
        <meta name="description" content="A demo app showing how to use Privy with WAGMI.sh" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-slate-200 p-4 text-slate-800">
        <Image
          className="mx-auto rounded-lg"
          src={wagmiPrivyLogo}
          alt="wagmi x privy logo"
          width={400}
          height={100}
        />
        <p className="my-4 text-center">
          This demo showcases how you can integrate{' '}
          <a href="https://wagmi.sh/" className="font-medium underline">
            wagmi
          </a>{' '}
          alongside{' '}
          <a href="https://www.privy.io/" className="font-medium underline">
            Privy
          </a>{' '}
          in your React app. Login below to try it out!
          <br />
          For more information, check out{' '}
          <a href="https://docs.privy.io/guide/guides/wagmi" className="font-medium underline">
            our integration guide
          </a>{' '}
          or the{' '}
          <a href="https://github.com/privy-io/wagmi-demo" className="font-medium underline">
            source code
          </a>{' '}
          for this app.
        </p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="border-1 flex flex-col items-start gap-2 rounded border border-black bg-slate-100 p-3">
            <h1 className="text-4xl font-bold">Privy</h1>
            {ready && !authenticated && (
              <>
                <p>You are not authenticated with Privy</p>
                <div className="flex items-center gap-4">
                  <Button onClick_={login} cta="Login with Privy" />
                  <span>or</span>
                  <Button onClick_={connectWallet} cta="Connect only" />
                </div>
              </>
            )}

            {ready && authenticated && (
              <>
                <p>
                  You are logged in with privy.
                  <br />
                  Active wallet is <MonoLabel label={activeWallet?.address || ''} />
                </p>
                {wallets.map((wallet) => {
                  return (
                    <div
                      key={wallet.address}
                      className="flex min-w-full flex-row flex-wrap items-center justify-between gap-2 bg-slate-50 p-4"
                    >
                      <div>
                        <MonoLabel label={shorten(wallet.address)} />
                      </div>
                      <Button
                        cta="Make active"
                        onClick_={() => {
                          const connectedWallet = connectedWallets.find(
                            (w) => w.address === wallet.address,
                          );
                          if (!connectedWallet) connectWallet();
                          else setActiveWallet(connectedWallet);
                        }}
                        disabled={wallet.address === activeWallet?.address}
                      />
                      <Button cta="Unlink" onClick_={() => unlinkWallet(wallet.address)} />
                    </div>
                  );
                })}
                <Button onClick_={linkWallet} cta="Link another wallet" />

                <br />
                <Button onClick_={logout} cta="Logout from Privy" />
              </>
            )}
          </div>
          <div className="border-1 flex flex-col items-start gap-2 rounded border border-black bg-slate-100 p-3">
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

                <Debug />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
