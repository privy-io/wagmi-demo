import Wrapper from 'components/Wrapper';
import type {Transaction} from 'ethers';
import type {AddressString} from 'lib/utils';
import {useState} from 'react';
import {useNetwork, useWaitForTransaction, useWatchPendingTransactions} from 'wagmi';

import SmallTextArea from './SmallTextArea';

const WaitForTransaction = () => {
  const {chain} = useNetwork();
  const [waiting, setWaiting] = useState(true);
  const [transaction, setTransaction] = useState<Transaction>();

  useWatchPendingTransactions({
    chainId: chain?.id,
    listener: (transaction) => {
      setTransaction(transaction);
      setWaiting(false);
    },
    enabled: waiting,
  });

  const {data, isError, isLoading} = useWaitForTransaction({
    hash: transaction?.hash as AddressString | undefined,
    enabled: !waiting && !!transaction?.hash,
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
        <SmallTextArea content={JSON.stringify(data, null, 2)} />
      </Wrapper>
    );
  }
};

export default WaitForTransaction;
