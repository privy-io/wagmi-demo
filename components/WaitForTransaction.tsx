import Wrapper from "components/Wrapper";
import {
  useNetwork,
  useWaitForTransaction,
  useWatchPendingTransactions,
} from "wagmi";
import SmallTextArea from "./SmallTextArea";
import { useState } from "react";

const WaitForTransaction = () => {
  const { chain } = useNetwork();
  const [waiting, setWaiting] = useState(true);
  const [transaction, setTransaction] = useState<any>(null);

  if (!chain) {
    return (
      <Wrapper title="useWaitForTransaction">
        <p>Loading...</p>
      </Wrapper>
    );
  }

  useWatchPendingTransactions({
    chainId: chain.id,
    listener: (transaction) => {
      setTransaction(transaction);
      setWaiting(false);
    },
    enabled: waiting,
  });

  const { data, isError, isLoading } = useWaitForTransaction({
    hash: transaction?.hash,
    enabled: !waiting,
  });

  if (waiting || isLoading) {
    return (
      <Wrapper title="useWaitForTransaction">
        <p>Waiting for a pending transaction...</p>
      </Wrapper>
    );
  } else if (isError) {
    return (
      <Wrapper title="useWaitForTransaction">
        <p>Error waiting for pending transaction...</p>
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
