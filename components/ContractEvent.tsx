import Wrapper from 'components/Wrapper';
import {shorten} from 'lib/utils';
import {useState} from 'react';
import {useContractEvent, useNetwork} from 'wagmi';

import MonoLabel from './MonoLabel';

const ContractEvent = () => {
  const {chain} = useNetwork();
  const [node, setNode] = useState<string | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [owner, setOwner] = useState<string | null>(null);

  if (!chain) {
    return (
      <Wrapper title="useContractEvent">
        <p>Loading...</p>
      </Wrapper>
    );
  }

  let contractAddress: string;
  switch (chain.id) {
    case 1:
    case 5:
      contractAddress = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"; // ENS Mainnet and Goerli Registry
      break;
    default:
      return (
        <Wrapper title="useContractEvent">
          <p>Unsupported network. Please switch to Goerli or Mainnet.</p>
        </Wrapper>
      );
  }

  useContractEvent({
    // @ts-ignore
    address: contractAddress,
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'node',
            type: 'bytes32',
          },
          {
            indexed: true,
            internalType: 'bytes32',
            name: 'label',
            type: 'bytes32',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'NewOwner',
        type: 'event',
      },
    ],
    eventName: 'NewOwner',
    listener(node, label, owner) {
      setNode(node);
      setLabel(label);
      setOwner(owner);
    },
    once: true,
  });

  return (
    <Wrapper title="useContractEvent">
      <p>
        First event:{' '}
        {node && label && owner ? (
          <MonoLabel label={`NewOwner(${shorten(node)}, ${shorten(label)}, ${shorten(owner)})`} />
        ) : (
          <MonoLabel label="Listening..." />
        )}
      </p>
    </Wrapper>
  );
};

export default ContractEvent;
