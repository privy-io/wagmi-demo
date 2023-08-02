import type {
  TransactionReceipt,
  TransactionLegacy,
  TransactionEIP1559,
  TransactionEIP2930,
  OnTransactionsParameter
} from 'viem';

export const shorten = (address: string | undefined) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
};

export type AddressString = `0x${string}`;

export const stringifyTransaction = (
  tx?: TransactionReceipt | TransactionLegacy | TransactionEIP1559 | TransactionEIP2930,
) => {
  if (!tx) return '{}';

  return JSON.stringify(
    Object.fromEntries(
      Object.entries(tx).map(([key, val]) => [key, typeof val === 'bigint' ? val.toString() : val]),
    ),
    null,
    2,
  );
};
