'use client';

import Wrapper from 'components/Wrapper';
import {useState} from 'react';
import type {OnTransactionsParameter} from 'viem';
import {useAccount, useWatchPendingTransactions} from 'wagmi';

import SmallTextArea from './SmallTextArea';

const WatchPendingTransactions = () => {
  const {chain} = useAccount();
  const [enabled, setEnabled] = useState(true);
  const [transaction, setTransaction] = useState<OnTransactionsParameter>();

  useWatchPendingTransactions({
    chainId: chain?.id,
    onTransactions: (transaction) => {
      setTransaction(transaction);
      setEnabled(false);
    },
    enabled: enabled && !!chain?.id,
  });

  if (!chain) {
    return (
      <Wrapper title="useWatchPendingTransactions">
        <p>Loading...</p>
      </Wrapper>
    );
  }

  if (enabled) {
    return (
      <Wrapper title="useWatchPendingTransactions">
        <p>Watching for pending transaction...</p>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper title="useWatchPendingTransactions">
        <p className="mb-2">First pending transaction:</p>
        <SmallTextArea content={JSON.stringify(transaction, null, 2)} />
      </Wrapper>
    );
  }
};

export default WatchPendingTransactions;
