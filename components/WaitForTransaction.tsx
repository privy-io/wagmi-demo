'use client';

import Wrapper from 'components/Wrapper';
import {type AddressString, stringifyTransaction} from 'lib/utils';
import {useState} from 'react';
import type {OnTransactionsParameter} from 'viem';
import {useAccount, useWaitForTransactionReceipt, useWatchPendingTransactions} from 'wagmi';

import SmallTextArea from './SmallTextArea';

const WaitForTransaction = () => {
  const {chain} = useAccount();
  const [waiting, setWaiting] = useState(true);
  const [transaction, setTransaction] = useState<OnTransactionsParameter>();

  useWatchPendingTransactions({
    chainId: chain?.id,
    onTransactions: (transaction) => {
      setTransaction(transaction);
      setWaiting(false);
    },
    enabled: waiting,
  });

  const {data, isError, isLoading} = useWaitForTransactionReceipt({
    hash: transaction?.[0] as AddressString | undefined,
  });

  if (!chain) {
    return (
      <Wrapper title="useWaitForTransactionReceipt">
        <p>Loading...</p>
      </Wrapper>
    );
  }

  if (waiting || isLoading) {
    return (
      <Wrapper title="useWaitForTransactionReceipt">
        <p>Waiting for transaction to settle...</p>
      </Wrapper>
    );
  } else if (isError) {
    return (
      <Wrapper title="useWaitForTransactionReceipt">
        <p>Error waiting for transaction to settle...</p>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper title="useWaitForTransactionReceipt">
        <p className="mb-2">First settled transaction:</p>
        <SmallTextArea content={stringifyTransaction(data)} />
      </Wrapper>
    );
  }
};

export default WaitForTransaction;
