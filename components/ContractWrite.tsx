'use client';

import Wrapper from 'components/Wrapper';
import {shorten, type AddressString} from 'lib/utils';
import {useAccount, useSimulateContract, useWriteContract} from 'wagmi';

import Button from './Button';
import MonoLabel from './MonoLabel';

const ABI = [
  {inputs: [], stateMutability: 'nonpayable', type: 'constructor'},
  {
    inputs: [
      {internalType: 'address', name: 'sender', type: 'address'},
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
      {internalType: 'address', name: 'owner', type: 'address'},
    ],
    name: 'ERC721IncorrectOwner',
    type: 'error',
  },
  {
    inputs: [
      {internalType: 'address', name: 'operator', type: 'address'},
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
    ],
    name: 'ERC721InsufficientApproval',
    type: 'error',
  },
  {
    inputs: [{internalType: 'address', name: 'approver', type: 'address'}],
    name: 'ERC721InvalidApprover',
    type: 'error',
  },
  {
    inputs: [{internalType: 'address', name: 'operator', type: 'address'}],
    name: 'ERC721InvalidOperator',
    type: 'error',
  },
  {
    inputs: [{internalType: 'address', name: 'owner', type: 'address'}],
    name: 'ERC721InvalidOwner',
    type: 'error',
  },
  {
    inputs: [{internalType: 'address', name: 'receiver', type: 'address'}],
    name: 'ERC721InvalidReceiver',
    type: 'error',
  },
  {
    inputs: [{internalType: 'address', name: 'sender', type: 'address'}],
    name: 'ERC721InvalidSender',
    type: 'error',
  },
  {
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'ERC721NonexistentToken',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'owner', type: 'address'},
      {indexed: true, internalType: 'address', name: 'approved', type: 'address'},
      {indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256'},
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'owner', type: 'address'},
      {indexed: true, internalType: 'address', name: 'operator', type: 'address'},
      {indexed: false, internalType: 'bool', name: 'approved', type: 'bool'},
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {indexed: true, internalType: 'address', name: 'from', type: 'address'},
      {indexed: true, internalType: 'address', name: 'to', type: 'address'},
      {indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256'},
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'owner', type: 'address'}],
    name: 'balanceOf',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'getApproved',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'owner', type: 'address'},
      {internalType: 'address', name: 'operator', type: 'address'},
    ],
    name: 'isApprovedForAll',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'to', type: 'address'}],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'ownerOf',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'to', type: 'address'}],
    name: 'safeMint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'amount', type: 'uint256'},
    ],
    name: 'safeMint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'from', type: 'address'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'from', type: 'address'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
      {internalType: 'bytes', name: 'data', type: 'bytes'},
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'operator', type: 'address'},
      {internalType: 'bool', name: 'approved', type: 'bool'},
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'bytes4', name: 'interfaceId', type: 'bytes4'}],
    name: 'supportsInterface',
    outputs: [{internalType: 'bool', name: '', type: 'bool'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'tokenId', type: 'uint256'}],
    name: 'tokenURI',
    outputs: [{internalType: 'string', name: '', type: 'string'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'address', name: 'from', type: 'address'},
      {internalType: 'address', name: 'to', type: 'address'},
      {internalType: 'uint256', name: 'tokenId', type: 'uint256'},
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

const ContractWrite = () => {
  const {chain, address} = useAccount();

  const contractAddress: AddressString | undefined = '0x74f1AFF6c19F8e1443Ad75087C81BFe6685fd8e0'; // WagmiConnectorDemo on Sepolia

  const {data: simulatedContract} = useSimulateContract({
    address: contractAddress,
    abi: ABI,
    functionName: 'mint',
    args: [address as `0x${string}`, BigInt(1)],
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
        <p>Unsupported network. Please switch to Sepolia.</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper title="useContractWrite">
      <div className="rounded bg-red-400 px-2 py-1 text-sm text-white">
        We recommend doing this on sepolia.
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
          cta="Mint"
        />
      )}
    </Wrapper>
  );
};

export default ContractWrite;
