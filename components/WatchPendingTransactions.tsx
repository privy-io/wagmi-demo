import Wrapper from "components/Wrapper";
import { useNetwork, useWatchPendingTransactions } from "wagmi";
import SmallTextArea from "./SmallTextArea";
import { useState } from "react";

const WatchPendingTransactions = () => {
  const { chain } = useNetwork();
  const [enabled, setEnabled] = useState(true);
  const [transaction, setTransaction] = useState<any>();

  if (!chain) {
    return (
      <Wrapper title="useWatchPendingTransactions">
        <p>Loading...</p>
      </Wrapper>
    );
  }

  useWatchPendingTransactions({
    chainId: chain.id,
    listener: (transaction) => {
      setTransaction(transaction);
      setEnabled(false);
    },
    enabled,
  });

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
