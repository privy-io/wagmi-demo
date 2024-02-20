'use client';

import Wrapper from 'components/Wrapper';
import {shorten, type AddressString} from 'lib/utils';
import {useAccount, useSimulateContract, useWriteContract} from 'wagmi';

import Button from './Button';
import MonoLabel from './MonoLabel';

const wagmigotchiABI = [
  {inputs: [], stateMutability: 'nonpayable', type: 'constructor'},
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caretaker',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'CaretakerLoved',
    type: 'event',
  },
  {
    inputs: [],
    name: 'clean',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feed',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAlive',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBoredom',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getHunger',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getSleepiness',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getStatus',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getUncleanliness',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'love',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'play',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'sleep',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const ContractWrite = () => {
  const {chain} = useAccount();

  const contractAddress: AddressString | undefined = '0xeCB504D39723b0be0e3a9Aa33D646642D1051EE1'; // WAGMIGOTCHI on Mainnet and Goerli

  const {data: simulatedContract} = useSimulateContract({
    address: contractAddress,
    abi: wagmigotchiABI,
    functionName: 'feed',
  });

  const {data, isPending, isError, writeContract} = useWriteContract();

  if (!chain) {
    return (
      <Wrapper title="useContractWrite">
        <p>Loading...</p>
      </Wrapper>
    );
  }

  if (!contractAddress) {
    return (
      <Wrapper title="useContractWrite">
        <p>Unsupported network. Please switch to Goerli or Mainnet.</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper title="useContractWrite">
      <div className="rounded bg-red-400 px-2 py-1 text-sm text-white">
        We recommend doing this on goerli.
      </div>
      {data && !isError && (
        <p>
          Transaction hash: <MonoLabel label={shorten(data)} />
        </p>
      )}
      {isError && <p>Error sending transaction.</p>}
      {simulatedContract && (
        <Button
          disabled={isPending}
          onClick_={() => writeContract?.(simulatedContract.request)}
          cta="Feed Wagmigotchi"
        />
      )}
    </Wrapper>
  );
};

export default ContractWrite;
