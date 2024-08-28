'use client';

import Button from 'components/Button';
import Wrapper from 'components/Wrapper';
import {parseEther} from 'viem';
import type {Config} from 'wagmi';
import {useSendTransaction} from 'wagmi';
import type {SendTransactionVariables} from 'wagmi/query';

const SendTransaction = () => {
  const transactionRequest: SendTransactionVariables<Config, number> = {
    to: '0xF2A919977c6dE88dd8ed90feAADFcC5d65D66038' as `0x${string}`,
    value: parseEther('0.001'),
    type: 'eip1559',
  };

  const {data, isPending, isSuccess, sendTransaction} = useSendTransaction();

  return (
    <Wrapper title="useSendTransaction">
      <div className="rounded bg-red-400 px-2 py-1 text-sm text-white">
        We recommend doing this on sepolia.
      </div>
      <Button
        cta="Send to privy.io.eth"
        onClick_={() => sendTransaction(transactionRequest)}
        disabled={!sendTransaction}
      />
      {isPending && <div>Check wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </Wrapper>
  );
};

export default SendTransaction;
