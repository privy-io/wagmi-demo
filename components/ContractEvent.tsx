'use client';

import Wrapper from 'components/Wrapper';
import {useState} from 'react';
import type {Log} from 'viem';
import {useWatchContractEvent, useAccount} from 'wagmi';

import MonoLabel from './MonoLabel';

const ContractEvent = () => {
  const {chain} = useAccount();
  const [logs, setLogs] = useState<Log[] | null>(null);

  useWatchContractEvent({
    address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e', // ENS Mainnet and Sepolia Registry
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
    onLogs: (logs: Log[]) => {
      setLogs(logs);
    },
  });

  if (!chain) {
    return (
      <Wrapper title="useWatchContractEvent">
        <p>Loading...</p>
      </Wrapper>
    );
  }

  if (chain.id !== 1 && chain.id !== 5) {
    return (
      <Wrapper title="useWatchContractEvent">
        <p>Unsupported network. Please switch to Sepolia or Mainnet.</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper title="useWatchContractEvent">
      <p>
        First event:{' '}
        {logs && logs.length ? (
          logs.map((log, i) => <MonoLabel key={i} label={log.logIndex?.toString() ?? ''} />)
        ) : (
          <MonoLabel label="Listening..." />
        )}
      </p>
    </Wrapper>
  );
};

export default ContractEvent;
