import Wrapper from "components/Wrapper";
import { useNetwork, useTransaction } from "wagmi";
import { shorten } from "lib/utils";
import SmallTextArea from "./SmallTextArea";

const Transaction = () => {
  const { chain } = useNetwork();

  if (!chain) {
    return (
      <Wrapper title="useTransaction">
        <p>Loading...</p>
      </Wrapper>
    );
  }

  let txnHash: string;
  switch (chain.id) {
    case 1:
      txnHash =
        "0x6ff0860e202c61189cb2a3a38286bffd694acbc50577df6cb5a7ff40e21ea074"; // vitalik.eth First Txn on Mainnet
      break;
    case 5:
      txnHash =
        "0x2a7cfe34807c88c2f50c3fcc18d6eec8b7c999a51e0e591e359de59fe68408d8"; // vitalik.eth First Txn on Goerli
      break;
    default:
      return (
        <Wrapper title="useTransaction">
          <p>Unsupported network. Please switch to Goerli or Mainnet.</p>
        </Wrapper>
      );
  }

  const { data, isError, isLoading } = useTransaction({
    // @ts-ignore
    hash: txnHash,
  });

  if (isError) {
    return (
      <Wrapper title="useTransaction">
        <p>Error reading transaction.</p>
      </Wrapper>
    );
  } else if (isLoading) {
    return (
      <Wrapper title="useTransaction">
        <p>Loading...</p>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper title="useTransaction">
        <p>
          {!data ? (
            <p>Error reading transaction.</p>
          ) : (
            <div>
              Transaction response for {shorten(data.hash)}:
              <SmallTextArea content={JSON.stringify(data, null, 2)} />
            </div>
          )}
        </p>
      </Wrapper>
    );
  }
};

export default Transaction;
