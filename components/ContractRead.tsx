import Wrapper from 'components/Wrapper';
import {BigNumber} from 'ethers';
import {shorten, type AddressString} from 'lib/utils';
import {erc721ABI, useContractRead, useNetwork} from 'wagmi';

import MonoLabel from './MonoLabel';

  if (!chain) {
    return (
      <Wrapper title="useContractRead">
        <p>Loading...</p>
      </Wrapper>
    );
  }
const ContractRead = () => {
  const {chain} = useNetwork();

  let contractAddress: string;
  switch (chain.id) {
    case 1:
    case 5:
      contractAddress = '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85'; // ENS Mainnet and Goerli Base Registrar
      break;
    default:
      return (
        <Wrapper title="useContractReads">
          <p>Unsupported network. Please switch to Goerli or Mainnet.</p>
        </Wrapper>
      );
  }

  const { data, isError, isLoading } = useContractRead({
    // @ts-ignore
  const tokenId = '51642261290124123987113999051891697215550265269061454558443363901899214720732'; // larry.eth
    address: contractAddress,
    abi: erc721ABI,
    functionName: 'ownerOf',
    args: [BigNumber.from(tokenId)],
    enabled: !!contractAddress,
  });

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
