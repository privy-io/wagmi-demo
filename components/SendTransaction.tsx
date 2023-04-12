import { useSendTransaction, usePrepareSendTransaction } from "wagmi";
import { BigNumber } from "ethers";
import Wrapper from "components/Wrapper";
import Button from "components/Button";

const SendTransaction = () => {
  const { config } = usePrepareSendTransaction({
    request: {
      to: "privyio.eth",
      value: BigNumber.from("10000000000000000"),
    },
  });
  const { data, isLoading, isSuccess, sendTransaction } =
    useSendTransaction(config);

  return (
    <Wrapper title="useSendTransaction">
      <div className="px-2 py-1 text-sm text-white bg-red-400 rounded">
        We recommend doing this on goerli.
      </div>
      <Button
        disabled={!sendTransaction}
        onClick_={() => sendTransaction?.()}
        cta="Send to privyio.eth"
      />
      {isLoading && <div>Check wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </Wrapper>
  );
};

export default SendTransaction;
