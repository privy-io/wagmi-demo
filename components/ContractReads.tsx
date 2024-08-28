'use client';

import Wrapper from 'components/Wrapper';
import {shorten, type AddressString} from 'lib/utils';
import {erc721Abi} from 'viem';
import {useContractReads, useAccount} from 'wagmi';

import MonoLabel from './MonoLabel';

const ContractReads = () => {
  const {chain} = useAccount();

  let contractAddress: AddressString | undefined;
  switch (chain?.id) {
    case 1:
    case 11155111:
      contractAddress = '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85'; // ENS Mainnet and Sepolia Base Registrar
      break;
  }

  const tokenIds = [
    '51642261290124123987113999051891697215550265269061454558443363901899214720732', // larry.eth
    '79233663829379634837589865448569342784712482819484549289560981379859480642508', // vitalik.eth
    '14062575871350128443718633951695181303483154763428382743088027645582664757571', // dhof.eth
  ];
  const {data, isError, isLoading} = useContractReads({
    contracts: tokenIds.map((tokenId) => {
      return {
        address: contractAddress,
        abi: erc721Abi,
        functionName: 'ownerOf',
        args: [BigInt(tokenId)],
      };
    }),
  });

  if (!chain) {
    return (
      <Wrapper title="useContractReads">
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
      <Wrapper title="useContractReads">
        <p>Error reading from contract.</p>
      </Wrapper>
    );
  } else if (isLoading || !data) {
    return (
      <Wrapper title="useContractReads">
        <p>Loading...</p>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper title="useContractReads">
        {tokenIds.map((tokenId, index) => {
          return (
            <p key={tokenId}>
              Owner of ENS Token ID {shorten(tokenId)}:{' '}
              {!data[index].result ? (
                <MonoLabel label="Error. Token may not exist on this network." />
              ) : (
                <MonoLabel label={shorten(data[index].result as string)} />
              )}
            </p>
          );
        })}
      </Wrapper>
    );
  }
};

export default ContractReads;
