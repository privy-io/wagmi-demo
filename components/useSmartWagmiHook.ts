import EventEmitter from 'events';
import {useEffect} from 'react';
import type {EIP1193Parameters, EIP1193RequestFn} from 'viem';
import {getAddress, hexToBigInt} from 'viem';
import {useConfig, useConnectors, useReconnect} from 'wagmi';
import {injected} from 'wagmi/connectors';

import {useSmartWallets} from '@privy-io/react-auth/smart-wallets';

/**
 * Registers a smart account connector in wagmi for the Privy embedded smart wallet.
 *
 * @experimental
 * Currently, this hook only supports:
 * - using only the smart account connector if the smart wallets client has loaded. All other connectors
 *   (e.g. external wallets) will be removed while the user is using the embedded wallet.
 *
 */
export const useEmbeddedSmartAccountConnectorV2 = () => {
  const connectors = useConnectors();
  const config = useConfig();
  const {client} = useSmartWallets();
  const {reconnect} = useReconnect();

  useEffect(() => {
    const setupSmartAccountConnector = async () => {
      const existingSmartAccountConnector = connectors.find(
        (connector) => connector.id === 'io.privy.smart_wallet',
      );
      if (existingSmartAccountConnector) return;

      // If no client exists, do not run this logic
      if (!client) return;

      const smartAccountProvider = new SmartWalletEIP1193Provider(client);

      const smartAccountConnectorConstructor = injected({
        target: {
          provider: smartAccountProvider,
          id: 'io.privy.smart_wallet',
          name: 'io.privy.smart_wallet',
          icon: '',
        },
      });

      // If a user uses an embedded wallet with a smart account, we will currently set it up as the only connector
      // for wagmi for the smoothest integration experience.
      const smartAccountConnector = config._internal.connectors.setup(
        smartAccountConnectorConstructor,
      );
      config._internal.connectors.setState([smartAccountConnector]);
      await config.storage?.setItem('recentConnectorId', smartAccountConnector.id);
      reconnect();
    };

    void setupSmartAccountConnector();
  }, [connectors, config, client, reconnect]);
};

class SmartWalletEIP1193Provider extends EventEmitter {
  private smartWalletClient: ReturnType<typeof useSmartWallets>['client'];

  constructor(client?: ReturnType<typeof useSmartWallets>['client']) {
    super();
    this.smartWalletClient = client;
  }

  async request({method, params = []}: EIP1193Parameters): ReturnType<EIP1193RequestFn> {
    switch (method) {
      case 'eth_requestAccounts':
      case 'eth_accounts':
        return this.handleEthRequestAccounts();
      case 'eth_sendTransaction':
        console.log(params);
        return this.handleEthSendTransaction(params);
      case 'personal_sign':
        return this.handlePersonalSign(params as any);
      case 'eth_signTypedData':
      case 'eth_signTypedData_v4':
        return this.handleEthSignTypedDataV4(params as any);
      case 'eth_signTransaction':
        throw new Error('eth_signTransaction is not supported. Use eth_sendTransaction instead.');
      case 'wallet_switchEthereumChain':
        console.log(params);
        return await this.smartWalletClient?.switchChain({
          // @ts-expect-error ignore params
          id: Number(params[0].chainId),
        });
      default:
        return this.smartWalletClient?.transport.request({method, params});
    }
  }

  private async handleEthRequestAccounts(): Promise<string[]> {
    if (!this.smartWalletClient?.account) {
      return [];
    }
    return [this.smartWalletClient.account.address];
  }

  private async handleEthSendTransaction(params: any): Promise<string> {
    const [tx] = params;
    if (!this.smartWalletClient?.account) {
      throw new Error('account not connected!');
    }
    return this.smartWalletClient.sendTransaction({
      ...tx,
      value: tx.value ? hexToBigInt(tx.value) : undefined,
    });
  }

  private async handlePersonalSign(params: [string, string]): Promise<string> {
    if (!this.smartWalletClient?.account) {
      throw new Error('account not connected!');
    }

    const [message, address] = params;
    if (getAddress(address) !== getAddress(this.smartWalletClient.account.address)) {
      throw new Error('cannot sign for address that is not the current account');
    }

    return this.smartWalletClient.signMessage({
      message,
    });
  }

  private async handleEthSignTypedDataV4(params: [string, any]): Promise<string> {
    if (!this.smartWalletClient?.account) {
      throw new Error('account not connected!');
    }

    const address = params[0];
    if (getAddress(address) !== getAddress(this.smartWalletClient.account.address)) {
      throw new Error('cannot sign for address that is not the current account');
    }

    const typedData = typeof params[1] === 'string' ? JSON.parse(params[1]) : params[1];

    return this.smartWalletClient.signTypedData(typedData as any);
  }
}
