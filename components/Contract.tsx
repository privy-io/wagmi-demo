import Wrapper from 'components/Wrapper';
import {shorten} from 'lib/utils';
import {useState} from 'react';
import {useContractEvent} from 'wagmi';

import MonoLabel from './MonoLabel';

const Contract = () => {
  const [node, setNode] = useState<string | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [owner, setOwner] = useState<string | null>(null);

  useContractEvent({
    address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e', // ENS Mainnet and Goerli Registry
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
    listener(log) {
      setNode(log.args.node);
      setLabel(log.args.label);
      setOwner(log.args.owner);
    },
  });

  return (
    <Wrapper title="useContract">
      <div>
        First event:{' '}
        {node && label && owner ? (
          <MonoLabel label={`NewOwner(${shorten(node)}, ${shorten(label)}, ${shorten(owner)})`} />
        ) : (
          <MonoLabel label="Listening..." />
        )}
      </div>
    </Wrapper>
  );
};

export default Contract;
