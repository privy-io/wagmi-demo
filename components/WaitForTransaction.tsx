import Wrapper from 'components/Wrapper';
import {type AddressString, stringifyTransaction} from 'lib/utils';
import {useState} from 'react';
import type { OnTransactionsParameter } from 'viem';
import {useNetwork, useWaitForTransaction, useWatchPendingTransactions} from 'wagmi';

import SmallTextArea from './SmallTextArea';

const WaitForTransaction = () => {
  const {chain} = useNetwork();
  const [waiting, setWaiting] = useState(true);
  const [transaction, setTransaction] = useState<OnTransactionsParameter>();

  useWatchPendingTransactions({
    chainId: chain?.id,
    listener: (transaction) => {
      setTransaction(transaction);
      setWaiting(false);
    },
    enabled: waiting,
  });

  const {data, isError, isLoading} = useWaitForTransaction({
    hash: transaction?.[0] as AddressString | undefined,
    enabled: !waiting && !!transaction?.[0],
  });

  if (!chain) {
    return (
      <Wrapper title="useWaitForTransaction">
        <p>Loading...</p>
      </Wrapper>
    );
  }

  if (waiting || isLoading) {
    return (
      <Wrapper title="useWaitForTransaction">
        <p>Waiting for transaction to settle...</p>
      </Wrapper>
    );
  } else if (isError) {
    return (
      <Wrapper title="useWaitForTransaction">
        <p>Error waiting for transaction to settle...</p>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper title="useWaitForTransaction">
        <p className="mb-2">First settled transaction:</p>
        <SmallTextArea content={stringifyTransaction(data)} />
      </Wrapper>
    );
  }
};

export default WaitForTransaction;
