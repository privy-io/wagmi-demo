import Button from 'components/Button';
import Wrapper from 'components/Wrapper';
import {BigNumber} from 'ethers';
import {usePrepareSendTransaction, useSendTransaction} from 'wagmi';

const SendTransaction = () => {
  const {config} = usePrepareSendTransaction({
    request: {
      to: 'privyio.eth',
      value: BigNumber.from('10000000000000000'),
    },
  });
  const {data, isLoading, isSuccess, sendTransaction} = useSendTransaction(config);

  return (
    <Wrapper title="useSendTransaction">
      <div className="rounded bg-red-400 px-2 py-1 text-sm text-white">
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
