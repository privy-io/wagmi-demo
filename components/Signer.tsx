'use client';

import Wrapper from 'components/Wrapper';
import {useEffect, useState} from 'react';
import {usePublicClient} from 'wagmi';
import {useWalletClient} from 'wagmi';

const Signer = () => {
  const publicClient = usePublicClient();
  const {data: walletClient, isError, isLoading} = useWalletClient();

  const [balance, setBalance] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [gasPrice, setGasPrice] = useState<string | null>(null);
  const [transactionCount, setTransactionCount] = useState<string | null>(null);

  const ready =
    balance && chainId && gasPrice && transactionCount && walletClient && !isLoading && !isError;

  useEffect(() => {
    if (!walletClient) return;

    publicClient?.getBalance({address: walletClient.account.address}).then((balance) => {
      setBalance(balance.toString());
    });
    walletClient?.getChainId().then((chainId) => {
      setChainId(chainId.toString());
    });
    publicClient?.getGasPrice().then((gasPrice) => {
      setGasPrice(gasPrice.toString());
    });
    publicClient
      ?.getTransactionCount({address: walletClient.account.address})
      .then((transactionCount) => {
        setTransactionCount(transactionCount.toString());
      });
  }, [walletClient, publicClient]);

  if (isError) {
    return (
      <Wrapper title="useSigner">
        <p>Error getting signer.</p>
      </Wrapper>
    );
  } else if (!ready) {
    return (
      <Wrapper title="useSigner">
        <p>Loading...</p>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper title="useSigner">
        <p>Balance: {balance}</p>
        <p>Chain ID: {chainId}</p>
        <p>Gas Price: {gasPrice}</p>
        <p>Transaction Count: {transactionCount}</p>
      </Wrapper>
    );
  }
};

export default Signer;
