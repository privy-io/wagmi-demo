import { useState } from "react";
import Wrapper from 'components/Wrapper';
import {useSigner} from 'wagmi';

const Signer = () => {
  const {data: signer, isError, isLoading} = useSigner();

  const [balance, setBalance] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [gasPrice, setGasPrice] = useState<string | null>(null);
  const [transactionCount, setTransactionCount] = useState<string | null>(null);

  const ready =
    balance && chainId && gasPrice && transactionCount && signer && !isLoading && !isError;

  signer?.getBalance().then((balance) => {
    setBalance(balance.toString());
  });
  signer?.getChainId().then((chainId) => {
    setChainId(chainId.toString());
  });
  signer?.getGasPrice().then((gasPrice) => {
    setGasPrice(gasPrice.toString());
  });
  signer?.getTransactionCount().then((transactionCount) => {
    setTransactionCount(transactionCount.toString());
  });

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
