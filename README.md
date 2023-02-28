NextJS app that uses both WAGMI + Privy, connecting them with [@privy-io/wagmi-connector](https://www.npmjs.com/package/@privy-io/wagmi-connector/v/0.0.1-beta.7?activeTab=readme).

## Make sure to use relative-deps

Your package.json should have the following:
```
  "relativeDependencies": {
    "@privy-io/react-auth": "../react-auth",
    "@privy-io/wagmi-connector": "../wagmi-connector"
  }
```

You can get to this point by running:
```
$ npx relative-deps add ../path/to/wagmi-connector
$ npx relative-deps add ../path/to/react-auth
```
