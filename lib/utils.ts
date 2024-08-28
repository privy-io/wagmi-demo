import type {
  TransactionReceipt,
  TransactionLegacy,
  TransactionEIP1559,
  TransactionEIP2930,
} from 'viem';
import type {GetTransactionData} from 'wagmi/query';

export const shorten = (address: string | undefined) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
};

export type AddressString = `0x${string}`;

export const stringifyTransaction = (
  tx?:
    | GetTransactionData<any, any>
    | TransactionReceipt
    | TransactionLegacy
    | TransactionEIP1559
    | TransactionEIP2930,
) => {
  if (!tx) return '{}';

  return JSON.stringify(
    Object.fromEntries(
      Object.entries(tx).map(([key, val]) => [
        key,
        typeof val === 'bigint' ? val.toString() : key === 'logs' ? `[${val.length} logs]` : val,
      ]),
    ),
    null,
    2,
  );
};
