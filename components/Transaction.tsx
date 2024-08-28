'use client';

import Wrapper from 'components/Wrapper';
import {shorten, type AddressString, stringifyTransaction} from 'lib/utils';
import {useAccount, useTransaction} from 'wagmi';

import SmallTextArea from './SmallTextArea';

const Transaction = () => {
  const {chain} = useAccount();

  let txnHash: AddressString | undefined;
  switch (chain?.id) {
    case 1:
      txnHash = '0x6ff0860e202c61189cb2a3a38286bffd694acbc50577df6cb5a7ff40e21ea074'; // vitalik.eth First Txn on Mainnet
      break;
    case 11155111:
      txnHash = '0x486c6e80719147ade6574db437d6623507ac7f2ca533088b044514c5cada7358'; // vitalik.eth First Txn on Sepolia
      break;
  }

  const {data, isError, isLoading} = useTransaction({
    hash: txnHash,
  });

  if (!chain) {
    return (
      <Wrapper title="useTransaction">
        <p>Loading...</p>
      </Wrapper>
    );
  }

  if (!txnHash) {
    return (
      <Wrapper title="useTransaction">
        <p>Unsupported network. Please switch to Sepolia or Mainnet.</p>
      </Wrapper>
    );
  }

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
        <div>
          {!data ? (
            <p>Error reading transaction.</p>
          ) : (
            <div>
              <p className="mb-2">Transaction response for {shorten(data.hash)}:</p>
              <SmallTextArea content={stringifyTransaction(data)} />
            </div>
          )}
        </div>
      </Wrapper>
    );
  }
};

export default Transaction;
