# Privy x Wagmi Demo

This is a demo NextJS app that uses both [`wagmi`](https://wagmi.sh/) and [Privy](https://www.privy.io/), connecting them with the [`@privy-io/wagmi`](https://www.npmjs.com/package/@privy-io/wagmi) package. 

To try the demo, go to https://wagmi-app.vercel.app/ and login with Privy. As part of login, you'll either connect an external wallet (e.g. MetaMask) or create an embedded wallet associated with your login method. Once connected, click the buttons in the right sidebar to invoke various [`wagmi`](https://wagmi.sh/) hooks, like `useSignMessage`, to interface with your connected wallet. 

**Check out our [`wagmi` integration guide](https://docs.privy.io/guide/guides/wagmi) for more guidance!**

## Setup

1. Fork this repository, clone it, and open it in your terminal.
```sh
git clone https://github.com/<your-github-handle>/wagmi-demo
```

2. Install the necessary dependencies with `npm`.
```sh
npm i 
```

3. Initialize your environment variables by copying the `.env.example` file to an `.env.local` file. Then, in `.env.local`, paste your **Privy App ID** from the [Privy console](https://console.privy.io) and an [**Alchemy API Key**](https://www.alchemy.com/). 
```sh
# In your terminal, create .env.local from .env.local.example
cp .env.local.example .env.local

# Add your Privy App ID to .env.local
NEXT_PUBLIC_PRIVY_APP_ID=<your-privy-app-id>
NEXT_PUBLIC_ALCHEMY_API_KEY=<your-alchemy-api-key>
```

## Building locally

In your project directory, run `npm run dev`. You can now visit http://localhost:4000 to see your app and login with Privy!

## Check out:
- `app/page.tsx` for how to connect external wallets and create embedded wallets using Privy
- `components/providers.tsx` for how to wrap your app with the `PrivyProvider`, `WagmiProvider`, and `QueryClientProvider`
- `components/*.tsx` for examples of calling `wagmi` hooks. The components are named after hook they call; for example, `components/SignMessage.tsx` calls the `useSignMessage` hook. 
