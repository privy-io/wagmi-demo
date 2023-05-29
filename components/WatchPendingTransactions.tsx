import Wrapper from 'components/Wrapper';
import type {Transaction} from 'ethers';
import {useState} from 'react';
import {useNetwork, useWatchPendingTransactions} from 'wagmi';

import SmallTextArea from './SmallTextArea';

const WatchPendingTransactions = () => {
  const {chain} = useNetwork();
  const [enabled, setEnabled] = useState(true);
  const [transaction, setTransaction] = useState<Transaction>();

  useWatchPendingTransactions({
    chainId: chain?.id,
    listener: (transaction) => {
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
