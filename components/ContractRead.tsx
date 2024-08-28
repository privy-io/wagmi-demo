'use client';

import Wrapper from 'components/Wrapper';
import {shorten, type AddressString} from 'lib/utils';
import {erc721Abi} from 'viem';
import {useReadContract, useAccount} from 'wagmi';

import MonoLabel from './MonoLabel';

const ContractRead = () => {
  const {chain} = useAccount();

  let contractAddress: AddressString | undefined;
  switch (chain?.id) {
    case 1:
    case 11155111:
      contractAddress = '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85'; // ENS Mainnet and Sepolia Base Registrar
      break;
  }

  const tokenId = '51642261290124123987113999051891697215550265269061454558443363901899214720732'; // larry.eth
  const {data, isError, isLoading} = useReadContract({
    address: contractAddress,
    abi: erc721Abi,
    functionName: 'ownerOf',
    args: [BigInt(tokenId)],
  });

  if (!chain) {
    return (
      <Wrapper title="useContractRead">
        <p>Loading...</p>
      </Wrapper>
    );
  }

  if (!contractAddress) {
    return (
      <Wrapper title="useContractReads">
        <p>Unsupported network. Please switch to Sepolia or Mainnet.</p>
      </Wrapper>
    );
  }

  if (isError) {
    return (
      <Wrapper title="useContractRead">
        <p>Error reading from contract.</p>
      </Wrapper>
    );
  } else if (isLoading) {
    return (
      <Wrapper title="useContractRead">
        <p>Loading...</p>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper title="useContractRead">
        <p>
          Owner of ENS Token ID {shorten(tokenId)}:{' '}
          {!data ? (
            <MonoLabel label="Error. Token may not exist on this network." />
          ) : (
            <MonoLabel label={shorten(data)} />
          )}
        </p>
      </Wrapper>
    );
  }
};

export default ContractRead;
